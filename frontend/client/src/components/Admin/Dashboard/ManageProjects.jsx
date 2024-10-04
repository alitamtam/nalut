import { useState } from "react";
import { useCreateProject } from "./hooks/projectsHooks/useCreateProject";
import { useDeleteProject } from "./hooks/projectsHooks/useDeleteProject";
import { useGetProjects } from "./hooks/projectsHooks/useGetProjects";
import { useUpdateProject } from "./hooks/projectsHooks/useUpdateProject";
import { useSettingsStore } from "../../../store/useSettingsStore";

const ManageProjects = () => {
    const { data: projects, isPending, error } = useGetProjects();
    const createProject = useCreateProject();
    const updateProject = useUpdateProject();
    const deleteProject = useDeleteProject();

    const { user } = useSettingsStore();
    const userId = user.id;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content1: "",
        content2: "",
        content3: "",
        projectImage: "",
        link: "",
        arabicTitle: "", // Arabic Title
        arabicContent1: "", // Arabic Content 1
        arabicContent2: "", // Arabic Content 2
        arabicContent3: "", // Arabic Content 3
    });
    const [currentEditId, setCurrentEditId] = useState(null);

    // Handle image upload and conversion to base64
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    projectImage: reader.result, // Base64 encoded string
                }));
            };
            reader.onerror = (error) => {
                console.error("Error converting file to base64:", error);
            };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            title: formData.title,
            content1: formData.content1,
            content2: formData.content2,
            content3: formData.content3,
            projectImage: formData.projectImage,
            link: formData.link,
            creatorId: userId,
            translations: [
                {
                    language: "en",
                    title: formData.title,
                    content1: formData.content1,
                    content2: formData.content2 || null,
                    content3: formData.content3 || null,
                },
                {
                    language: "ar",
                    title: formData.arabicTitle,
                    content1: formData.arabicContent1,
                    content2: formData.arabicContent2 || null,
                    content3: formData.arabicContent3 || null,
                },
            ],
        };
        console.log('Form Data: ', updatedFormData); // Debugging to see if title is set correctly

        if (isEditing) {
            updateProject.mutate({ id: currentEditId, formData: updatedFormData });
        } else {
            createProject.mutate(updatedFormData);
        }

        setFormData({
            title: "",
            content1: "",
            content2: "",
            content3: "",
            projectImage: "",
            link: "",
            arabicTitle: "", // Reset Arabic Title
            arabicContent1: "", // Reset Arabic Content 1
            arabicContent2: "", // Reset Arabic Content 2
            arabicContent3: "", // Reset Arabic Content 3
        });
        setIsEditing(false);
    };

    const handleEdit = (project) => {
        setIsEditing(true);
        setCurrentEditId(project.id);
        setFormData({
            title: project.title,
            content1: project.content1,
            content2: project.content2,
            content3: project.content3,
            projectImage: project.projectImage, // Prepopulate base64 image
            link: project.link,
            arabicTitle: project.translations.find(t => t.language === "ar")?.title || "", // Prepopulate Arabic Title
            arabicContent1: project.translations.find(t => t.language === "ar")?.content1 || "", // Prepopulate Arabic Content 1
            arabicContent2: project.translations.find(t => t.language === "ar")?.content2 || "", // Prepopulate Arabic Content 2
            arabicContent3: project.translations.find(t => t.language === "ar")?.content3 || "", // Prepopulate Arabic Content 3
        });
    };

    const handleDelete = (id) => {
        deleteProject.mutate(id);
    };

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>

            {/* Form for Add/Edit */}
            <form onSubmit={handleSubmit} className="mb-6">
                <label className="block mb-1">Title</label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Content 1</label>
                <div className="mb-4">
                    <textarea
                        name="content1"
                        value={formData.content1}
                        onChange={handleChange}
                        placeholder="Content 1"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Content 2</label>
                <div className="mb-4">
                    <textarea
                        name="content2"
                        value={formData.content2}
                        onChange={handleChange}
                        placeholder="Content 2 (Optional)"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Content 3</label>
                <div className="mb-4">
                    <textarea
                        name="content3"
                        value={formData.content3}
                        onChange={handleChange}
                        placeholder="Content 3 (Optional)"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Link (Optional)</label>
                <div className="mb-4">
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="Project Link"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Upload Project Image</label>
                <div className="mb-4">
                    <input type="file" onChange={handleImageUpload} />
                    {formData.projectImage && <p className="mt-2 text-sm">Image ready for upload.</p>}
                </div>

                {/* Arabic Translation Inputs */}
                <h3 className="text-xl font-bold mt-4 mb-2">Arabic Translation</h3>
                <label className="block mb-1">Arabic Title</label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="arabicTitle"
                        value={formData.arabicTitle}
                        onChange={handleChange}
                        placeholder="Arabic Title"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Arabic Content 1</label>
                <div className="mb-4">
                    <textarea
                        name="arabicContent1"
                        value={formData.arabicContent1}
                        onChange={handleChange}
                        placeholder="Arabic Content 1"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Arabic Content 2</label>
                <div className="mb-4">
                    <textarea
                        name="arabicContent2"
                        value={formData.arabicContent2}
                        onChange={handleChange}
                        placeholder="Arabic Content 2 (Optional)"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Arabic Content 3</label>
                <div className="mb-4">
                    <textarea
                        name="arabicContent3"
                        value={formData.arabicContent3}
                        onChange={handleChange}
                        placeholder="Arabic Content 3 (Optional)"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
                    {isEditing ? "Update Project" : "Create Project"}
                </button>
            </form>

            {/* Projects List */}
            <h3 className="text-xl font-bold mb-2">Existing Projects</h3>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className="mb-4 border p-4 rounded">
                        <h4 className="font-bold">{project.title}</h4>
                        <p>{project.content1}</p>
                        <p>{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>}</p>
                        <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
                        <button onClick={() => handleDelete(project.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProjects;
