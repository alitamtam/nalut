import { useState } from "react";
import { useCreateProject } from "../../Admin/Dashboard/hooks/projectsHooks/useCreateProject";
import { useDeleteProject } from "../../Admin/Dashboard/hooks/projectsHooks/useDeleteProject";
import { useGetProjects } from "../../Admin/Dashboard/hooks/projectsHooks/useGetProjects";
import { useUpdateProject } from "../../Admin/Dashboard/hooks/projectsHooks/useUpdateProject";
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
        project_image: "",
        link: "",
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
                    project_image: reader.result, // Base64 encoded string
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
            project_image: formData.project_image,
            link: formData.link,
            actorId: userId,
        };
        console.log('Form Data: ', updatedFormData); // Debugging to see if title is set correctly

        if (isEditing) {
            updateProject.mutate({ id: currentEditId, formData: updatedFormData });
        } else {
            createProject.mutate(updatedFormData);
        }

        setFormData({ title: "", content1: "", content2: "", content3: "", project_image: "", link: "" });
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
            project_image: project.project_image, // Prepopulate base64 image
            link: project.link,
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
                    {formData.project_image && <p className="mt-2 text-sm">Image ready for upload.</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
                    {isEditing ? "Update Project" : "Add Project"}
                </button>
            </form>

            {/* Projects Table */}
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Link</th>
                        <th className="text-left py-2">Actor</th>
                        <th className="text-left py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.map((project) => (
                        <tr key={project.id}>
                            <td className="border px-4 py-2">{project.title}</td>
                            <td className="border px-4 py-2">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                    {project.link ? "View Project" : "No Link"}
                                </a>
                            </td>
                            <td className="border px-4 py-2">{project.actors.first_name} {project.actors.last_name}</td>
                            <td className="border px-4 py-2">
                                {project.project_image ? (
                                    <img
                                        alt="project"
                                        src={project.project_image} // Include the base64 prefix here
                                        className="h-16 w-16 object-cover rounded-full"
                                    />
                                ) : (
                                    <p>No Image</p> // Fallback if no image is provided
                                )}
                            </td>

                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProjects;
