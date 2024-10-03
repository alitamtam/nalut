import { useState } from "react";
import { useSettingsStore } from "../../../store/useSettingsStore";
import { useAddPublications } from "./hooks/useAddPublications";
import { useDeletePublications } from "./hooks/useDeletePublications";
import { useEditPublications } from "./hooks/useEditPublications";
import { useGetPublications } from "./hooks/useGetPublications";
import { useGetTopics } from "./hooks/useGetTopics";
import ManageTopics from "./ManageTopics";
const PublicationsList = () => {
    const { data, isPending, error } = useGetPublications();
    const publications = data || []; // Default to an empty array if data is undefined

    const addPublication = useAddPublications();
    const editPublication = useEditPublications();
    const deletePublication = useDeletePublications();
    const { data: topics } = useGetTopics();
    const { user } = useSettingsStore();
    const userId = user.id;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        topicId: "",
        topic: "",
        content: "",
        content2: "",
        content3: "",
        image: "",
        iconClass: "",
        arabicTitle: "", // Arabic title
        arabicContent: "", // Arabic content
        arabicContent2: "", // Arabic content 2
        arabicContent3: "", // Arabic content 3
    });
    const [currentEditId, setCurrentEditId] = useState(null);
    const [isNewTopic, setIsNewTopic] = useState(false);

    // Handle image upload and conversion to base64
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    image: reader.result, // Base64 encoded string
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFormData = {
            title: formData.title,
            content: formData.content,
            image: formData.image,
            ownerId: userId,
            iconClass: formData.iconClass || "default-icon-class",
            translations: [
                {
                    language: "ar",
                    title: formData.arabicTitle,
                    content: formData.arabicContent,
                },
            ],
        };

        if (formData.topicId) {
            updatedFormData.topicId = parseInt(formData.topicId, 10);
        }

        if (isNewTopic) {
            updatedFormData.topic = formData.topic;
        }

        if (isEditing) {
            editPublication.mutate({ id: currentEditId, formData: updatedFormData });
        } else {
            addPublication.mutate(updatedFormData);
        }

        setFormData({ title: "", topicId: "", topic: "", content: "", content2: "", content3: "", image: "", iconClass: "", arabicTitle: "", arabicContent: "", arabicContent2: "", arabicContent3: "" });
        setIsEditing(false);
        setIsNewTopic(false);
    };

    const handleEdit = (publication) => {
        setIsEditing(true);
        setCurrentEditId(publication.id);
        setFormData({
            title: publication.title,
            topicId: publication.topic.id,
            topic: publication.topic.name,
            content: publication.content,
            image: publication.image,
            iconClass: publication.iconClass,
            arabicTitle: publication.translations.find(t => t.language === 'ar')?.title || "", // Prepopulate Arabic title
            arabicContent: publication.translations.find(t => t.language === 'ar')?.content || "", // Prepopulate Arabic content
        });
    };

    const handleDelete = (id) => {
        deletePublication.mutate(id);
    };

    if (isPending) return <div>Loading...</div>;


    if (error) {
        if (error) return <div>Error loading publications.</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Publications List</h2>

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

                {/* Arabic Title */}
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

                {/* Topic Handling */}
                <div className="mb-4">
                    <label className="block mb-1">Topic</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isNewTopic}
                            onChange={() => setIsNewTopic((prev) => !prev)}
                            className="mr-2"
                        />
                        <span>Create new topic</span>
                    </div>
                </div>

                {isNewTopic ? (
                    <div className="mb-4">
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            placeholder="New Topic Name"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                ) : (
                    <select
                        name="topicId"
                        value={formData.topicId}
                        onChange={handleChange}
                        className="mb-4 w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Topic</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                )}

                <label className="block mb-1">Content</label>
                <div className="mb-4">
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Content"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="content2"
                        value={formData.content2}
                        onChange={handleChange}
                        placeholder="Content"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="content3"
                        value={formData.content3}
                        onChange={handleChange}
                        placeholder="Content"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Arabic Content */}
                <label className="block mb-1">Arabic Content</label>
                <div className="mb-4">
                    <textarea
                        name="arabicContent"
                        value={formData.arabicContent}
                        onChange={handleChange}
                        placeholder="Arabic Content"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="arabicContent2"
                        value={formData.arabicContent2}
                        onChange={handleChange}
                        placeholder="Arabic Content"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="arabicContent3"
                        value={formData.arabicContent3}
                        onChange={handleChange}
                        placeholder="Arabic Content"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <label className="block mb-1">Image</label>
                <input type="file" onChange={handleImageUpload} className="mb-4" />

                <label className="block mb-1">Icon Class</label>
                <input
                    type="text"
                    name="iconClass"
                    value={formData.iconClass}
                    onChange={handleChange}
                    placeholder="Icon Class"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {isEditing ? "Edit Publication" : "Add Publication"}
                </button>
            </form>

            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Arabic Title</th>
                        <th className="text-left py-2">Content</th>
                        <th className="text-left py-2">Arabic Content</th>
                        <th className="text-left py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {publications?.length > 0 ? (
                        publications.map((publication) => (
                            <tr key={publication.id} className="border-b">
                                <td className="p-2">{publication.id}</td>
                                <td className="p-2">{publication.title}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleEdit(publication)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(publication.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-2 text-center">No publications found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                ManageTopics: <ManageTopics />

            </div>
        </div>
    );
};

export default PublicationsList;
