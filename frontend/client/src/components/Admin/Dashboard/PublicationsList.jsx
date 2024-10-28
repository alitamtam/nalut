import { useState } from "react";
import { useSettingsStore } from "../../../store/useSettingsStore";
import { useAddPublications } from "./hooks/useAddPublications";
import { useDeletePublications } from "./hooks/useDeletePublications";
import { useEditPublications } from "./hooks/useEditPublications";
import { useGetPublications } from "./hooks/useGetPublications";
import { useGetTopics } from "./hooks/useGetTopics";
import ManageTopics from "./ManageTopics";
import { toast, Toaster } from 'react-hot-toast'; // Imported toast and Toaster

const PublicationsList = () => {
    const { data, isPending, error } = useGetPublications();
    const publications = data || []; // Default to an empty array if data is undefined
    console.log(publications);

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
        content3: "", // Add this line to include content3
        image: "",
        iconClass: "",
        arabicTitle: "", // Arabic title
        arabicContent: "", // Arabic content

    });
    const [currentEditId, setCurrentEditId] = useState(null);
    const [isNewTopic, setIsNewTopic] = useState(false);

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
            content3: formData.content3, // Add this line to include content3
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
            editPublication.mutate(
                { id: currentEditId, formData: updatedFormData },
                {
                    onSuccess: () => toast.success('Publication edited successfully!'),
                    onError: () => toast.error('Failed to edit publication.')
                }
            );
        } else {
            addPublication.mutate(
                updatedFormData,
                {
                    onSuccess: () => toast.success('Publication added successfully!'),
                    onError: () => toast.error('Failed to add publication.')
                }
            );
        }

        // Reset form data
        setFormData({
            title: "",
            topicId: "",
            topic: "",
            content: "",
            content3: "",
            image: "",
            iconClass: "",
            arabicTitle: "",
            arabicContent: "",

        });
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
            content3: publication.content3, // Add this line to include content3
            image: publication.image,
            iconClass: publication.iconClass,
            arabicTitle: publication.translations.find(t => t.language === 'ar')?.title || "",
            arabicContent: publication.translations.find(t => t.language === 'ar')?.content || "",
        });
    };


    const handleDelete = (id) => {
        deletePublication.mutate(id,

            {
                onSuccess: () => toast.success('Publication deleted successfully!'),
                onError: () => toast.error('Failed to delete publication.')
            }

        );
    };

    if (isPending) return <div>Loading...</div>;

    if (error) {
        return <div>Error loading publications: {error.message}</div>;
    }
    console.log(formData);

    return (
        <div className="p-6">
            <Toaster /> {/* Place the Toaster component somewhere globally */}

            <h2 className="text-3xl font-bold mb-6">Publications List</h2>

            {/* Form for Add/Edit */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* English Title */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">
                            English Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            placeholder="Enter English Title"
                        />
                    </div>

                    {/* Arabic Title */}
                    <div>
                        <label htmlFor="arabicTitle" className="block mb-1 text-sm font-medium text-gray-700">
                            Arabic Title
                        </label>
                        <input
                            id="arabicTitle"
                            type="text"
                            name="arabicTitle"
                            value={formData.arabicTitle}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            placeholder="أدخل العنوان باللغة العربية"
                        />
                    </div>
                </div>

                {/* Topic Handling */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={isNewTopic}
                            onChange={() => setIsNewTopic((prev) => !prev)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <label className="text-sm font-medium text-gray-700">Create new topic</label>
                    </div>

                    {isNewTopic ? (
                        <div>
                            <label htmlFor="newTopic" className="block mb-1 text-sm font-medium text-gray-700">
                                New Topic Name
                            </label>
                            <input
                                id="newTopic"
                                type="text"
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                                placeholder="Enter new topic name"
                            />
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="topicId" className="block mb-1 text-sm font-medium text-gray-700">
                                Select Topic
                            </label>
                            <select
                                id="topicId"
                                name="topicId"
                                value={formData.topicId}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
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
                </div>

                {/* English Content */}
                <div>
                    <label htmlFor="content" className="block mb-1 text-sm font-medium text-gray-700">
                        Publication Content (English)
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                        placeholder="Enter English content"
                    />
                </div>

                <div>
                    <label htmlFor="arabicContent" className="block mb-1 text-sm font-medium text-gray-700">
                        المنشور باللغة العربية
                    </label>
                    <textarea
                        id="arabicContent"
                        name="arabicContent"
                        value={formData.arabicContent}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                        placeholder="أدخل المحتوى باللغة العربية"
                    />
                </div>

                {/* File Upload */}
                <div>
                    <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full p-3 text-gray-600 border border-gray-300 rounded cursor-pointer focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="content3" className="block mb-1 text-sm font-medium text-gray-700">
                        Link (content3)
                    </label>
                    <input
                        id="content3"
                        type="url"
                        name="content3"
                        value={formData.content3} // Bind this to your form data
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                        placeholder="Enter a URL"
                    />
                </div>

                {/* Icon Class */}
                <div>
                    <label htmlFor="iconClass" className="block mb-1 text-sm font-medium text-gray-700">
                        Icon Class
                    </label>
                    <input
                        id="iconClass"
                        type="text"
                        name="iconClass"
                        value={formData.iconClass}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                        placeholder="Enter Icon Class"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300"
                >
                    {isEditing ? "Update Publication" : "Add Publication"}
                </button>
            </form>

            {/* Publications List */}
            <div className="mt-6">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2 border-b">ID</th>
                            <th className="p-2 border-b">Name</th>
                            <th className="p-2 border-b">Topic Name</th>
                            <th className="p-2 border-b">Created At</th>
                            <th className="p-2 border-b">Author</th>
                            <th className="p-2 border-b">    Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publications.length > 0 ? (

                            publications.map((publication) => (

                                <tr key={publication.id} className="border-b hover:bg-gray-100 transition-colors">
                                    <td className="p-2">{publication.id}</td>
                                    <td className="p-2 text-base font-base">{publication.title}</td>
                                    <td className="p-2 text-center">
                                        {/* Replace with the actual icon or a default if none exists */}
                                        {publication.topic.name ? (
                                            <div className="flex justify-center">{publication.topic.name}</div>
                                        ) : (
                                            <div className="text-gray-300">No Icon</div>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {new Date(publication.createdAt).toLocaleDateString('en-UK', {
                                            year: 'numeric',
                                            month: 'long', // You can use 'short' if preferred
                                            day: 'numeric'
                                        }).replace(/[\u200E\u200F]/g, '')} {/* Remove any LTR/RTL marks if any */}
                                    </td>
                                    <td className="p-2">{publication.owner.firstName} {publication.owner.lastName}</td>
                                    <td className="p-2">
                                        <div className="flex space-x-2 justify-center">
                                            <button
                                                onClick={() => handleEdit(publication)}
                                                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(publication.id)}
                                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-600">
                                    No publications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {/* Manage Topics */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Manage Topics</h3>
                <ManageTopics />
            </div>
        </div>
    );

};

export default PublicationsList;
