import { useState } from "react";
import { useSettingsStore } from "../../../store/useSettingsStore"; // Import your Zustand store
import { useAddPublications } from "./hooks/useAddPublications";
import { useDeletePublications } from "./hooks/useDeletePublications";
import { useEditPublications } from "./hooks/useEditPublications";
import { useGetPublications } from "./hooks/useGetPublications";
import { useGetTopics } from "./hooks/useGetTopics";
import ManageTopics from "./ManageTopics";
const PublicationsList = () => {
    const { data: publications, isPending, error } = useGetPublications();
    const addPublication = useAddPublications();
    const editPublication = useEditPublications();
    const deletePublication = useDeletePublications();
    const { data: topics } = useGetTopics(); // Fetching topics

    const { user } = useSettingsStore(); // Get the user data (including user ID)
    const userId = user.id; // Access the user ID from Zustand store

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        topicId: "", // For selected topic
        topic: "", // For new topic
        content: "",
        image: "",
        iconClass: "",
    });
    const [currentEditId, setCurrentEditId] = useState(null);
    const [isNewTopic, setIsNewTopic] = useState(false); // State to check if user wants to create a new topic

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    image: reader.result,
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
            ownerId: userId, // Use the dynamic user ID from Zustand store
            iconClass: formData.iconClass, // Ensure this field is included
        };

        // Convert topicId to a number if it exists
        if (formData.topicId) {
            updatedFormData.topicId = parseInt(formData.topicId, 10);
        }

        // If the user is creating a new topic, send the `topic` field, otherwise send `topicId`
        if (isNewTopic) {
            updatedFormData.topic = formData.topic;
        } else {
            // eslint-disable-next-line no-self-assign
            updatedFormData.topicId = updatedFormData.topicId; // Ensure this is correctly formatted
        }

        if (isEditing) {
            editPublication.mutate({ id: currentEditId, formData: updatedFormData });
        } else {
            addPublication.mutate(updatedFormData);
        }

        setFormData({ title: "", topicId: "", topic: "", content: "", image: "", iconClass: "" });
        setIsEditing(false);
        setIsNewTopic(false); // Reset to default behavior after submission
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
        });
    };

    const handleDelete = (id) => {
        deletePublication.mutate(id);
    };

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
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

                {/* Toggle between creating a new topic or selecting an existing one */}
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

                {/* If creating a new topic, show text input, otherwise show dropdown */}
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
                    <div className="mb-4">
                        <select
                            name="topicId"
                            value={formData.topicId}
                            onChange={handleChange}
                            className="w-full border p-2"
                            required
                        >
                            <option value="">Select Topic</option>
                            {topics?.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <label className="block mb-1">Topic Icon </label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="iconClass"
                        value={formData.iconClass}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
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
                    <label className="block mb-1">Upload Image</label>
                    <input type="file" onChange={handleImageUpload} />
                    {formData.image && <p className="mt-2 text-sm">Image ready for upload.</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
                    {isEditing ? "Update Publication" : "Add Publication"}
                </button>
            </form>
            {/* Publications Table */}
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="text-left py-2">Topic</th>
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Published Date</th>
                        <th className="text-left py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {publications?.map((publication) => (
                        <tr key={publication.id}>
                            <td className="border px-4 py-2">{publication.topic.name}</td>
                            <td className="border px-4 py-2">{publication.title}</td>
                            <td className="border px-4 py-2">{publication.created_at}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(publication)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(publication.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <ManageTopics />


        </div>
    );
};

export default PublicationsList;
