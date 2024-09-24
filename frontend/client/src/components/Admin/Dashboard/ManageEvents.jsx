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
        };

        if (isEditing) {
            editEvent.mutate({ id: currentEditId, formData: updatedFormData });
        } else {
            addEvent.mutate(updatedFormData);
        }

        setFormData({
            title: "", description: "", image: "", date: "", location: "", startTime: '',
            endTime: '', link: "",
        });
        setIsEditing(false);
    };

    const handleEdit = (event) => {
        setIsEditing(true);
        setCurrentEditId(event.id);
        setFormData({
            title: event.title,
            description: event.description,
            image: event.image,  // Prepopulate base64 image
            startTime: new Date(event.startTime).toISOString().slice(0, 16),
            endTime: new Date(event.endTime).toISOString().slice(0, 16),
            location: event.location,
            link: event.link,
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



                <label className="block mb-1">Location</label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="w-full p-2 border border-gray-300 rounded"
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

                <div className="mb-4">
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="description"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {/* New input for event link */}
                    <label className="block mb-1">Event Link </label>
                    <input
                        type="url"
                        placeholder="Event Link (optional)"
                        value={formData.link}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        name="link"
                    />
                </div>

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
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Owner</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Location</th>
                        <th className="text-left py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events?.map((event) => (
                        <tr key={event.id}>
                            <td className="border px-4 py-2">{event.title}</td>
                            <td className="border px-4 py-2">{event.ownerId}</td>
                            <td className="border px-4 py-2">{event.date}</td>
                            <td className="border px-4 py-2">{event.location}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(event.id)}
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

export default EventsList;
