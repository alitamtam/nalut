import { useState } from "react";
import { useSettingsStore } from "../../../store/useSettingsStore";
import { useAddEvent } from "./hooks/useAddEvent";
import { useDeleteEvent } from "./hooks/useDeleteEvent";
import { useEditEvent } from "./hooks/useEditEvent";
import { useGetEvents } from "./hooks/useGetEvent";

const EventsList = () => {
    const { data: events, isPending, error } = useGetEvents();
    const addEvent = useAddEvent();
    const editEvent = useEditEvent();
    const deleteEvent = useDeleteEvent();

    const { user } = useSettingsStore();
    const userId = user.id;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        startTime: '',
        endTime: '',
        location: "",
        link: "",
        arabicTitle: "", // Arabic title
        arabicDescription: "", // Arabic description
        arabicLocation: "", // Arabic location
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
            description: formData.description,
            image: formData.image,  // Include base64 image in the request body
            ownerId: userId,
            startTime: new Date(formData.startTime).toISOString(),
            endTime: new Date(formData.endTime).toISOString(),
            location: formData.location,
            link: formData.link,
            translations: [
                {
                    language: "ar",
                    title: formData.arabicTitle,
                    description: formData.arabicDescription,
                    location: formData.arabicLocation,
                },
            ], // Include translations as an array of objects
        };

        if (isEditing) {
            editEvent.mutate({ id: currentEditId, formData: updatedFormData });
        } else {
            addEvent.mutate(updatedFormData);
        }

        // Reset form fields
        setFormData({
            title: "",
            description: "",
            image: "",
            location: "",
            startTime: '',
            endTime: '',
            link: "",
            arabicTitle: "", // Reset Arabic title
            arabicDescription: "", // Reset Arabic description
            arabicLocation: "", // Reset Arabic location
        });
        setIsEditing(false);
    };

    const handleEdit = (event) => {
        setIsEditing(true);
        setCurrentEditId(event.id);
        // Prepopulate form data including translations
        const arabicTranslation = event.translations.find(t => t.language === 'ar') || {};
        setFormData({
            title: event.title || '',
            description: event.description || '',
            image: event.image,  // Prepopulate base64 image
            startTime: new Date(event.startTime).toISOString().slice(0, 16),
            endTime: new Date(event.endTime).toISOString().slice(0, 16),
            location: event.location || '',
            link: event.link,
            arabicTitle: arabicTranslation.title || "", // Prepopulate Arabic title
            arabicDescription: arabicTranslation.description || "", // Prepopulate Arabic description
            arabicLocation: arabicTranslation.location || "", // Prepopulate Arabic location
        });
    };

    const handleDelete = (id) => {
        deleteEvent.mutate(id);
    };

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Events List</h2>

            {/* Form for Add/Edit */}
            <form onSubmit={handleSubmit} className="mb-6">
                <label className="block mb-1">Title (English)</label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title in English"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <label className="block mb-1">Title (Arabic)</label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="arabicTitle" // Changed name to arabicTitle
                        value={formData.arabicTitle}
                        onChange={handleChange}
                        placeholder="Title in Arabic"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <label className="block mb-1">Location (English)</label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location in English"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <label className="block mb-1">Location (Arabic)</label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="arabicLocation" // Changed name to arabicLocation
                        value={formData.arabicLocation}
                        onChange={handleChange}
                        placeholder="Location in Arabic"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full mb-2"
                />

                <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full mb-4"
                />

                <label className="block mb-1">Description (English)</label>
                <div className="mb-4">
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description in English"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <label className="block mb-1">Description (Arabic)</label>
                <div className="mb-4">
                    <textarea
                        name="arabicDescription" // Changed name to arabicDescription
                        value={formData.arabicDescription}
                        onChange={handleChange}
                        placeholder="Description in Arabic"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <label className="block mb-1">Event Link (optional)</label>
                <input
                    type="url"
                    placeholder="Event Link (optional)"
                    value={formData.link}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    name="link"
                />

                <div className="mb-4">
                    <label className="block mb-1">Upload Image</label>
                    <input type="file" onChange={handleImageUpload} />
                    {formData.image && <p className="mt-2 text-sm">Image ready for upload.</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
                    {isEditing ? "Update Event" : "Add Event"}
                </button>
            </form>

            {/* Events Table */}
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="text-left py-2 px-4">Title (English)</th>
                        <th className="text-left py-2 px-4">Location (English)</th>
                        <th className="text-left py-2 px-4">Start Time</th>
                        <th className="text-left py-2 px-4">End Time</th>
                        <th className="text-left py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events?.map(event => (
                        <tr key={event.id} className="border-t">
                            <td className="py-2 px-4">{event.title}</td>
                            <td className="py-2 px-4">{event.location}</td>
                            <td className="py-2 px-4">{new Date(event.startTime).toLocaleString()}</td>
                            <td className="py-2 px-4">{new Date(event.endTime).toLocaleString()}</td>
                            <td className="py-2 px-4">
                                <button onClick={() => handleEdit(event)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(event.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventsList;
