// path: client/src/components/Admin/Dashboard/ManageEvents.jsx
import { useState, useEffect } from 'react';
import { useGetEvents } from './hooks/useGetEvents';
import { useAddEvent } from './hooks/useAddEvent';
import { useEditEvent } from './hooks/useEditEvent';
import { useDeleteEvent } from './hooks/useDeleteEvent';

const AddEditDeleteEvents = () => {
    const { data: events, isLoading, error } = useGetEvents();
    const addMutation = useAddEvent();
    const editMutation = useEditEvent();
    const deleteMutation = useDeleteEvent();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        startTime: '',
        endTime: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);

    useEffect(() => {
        if (editMode && currentEventId) {
            const currentEvent = events.find(event => event.id === currentEventId);
            if (currentEvent) {
                setFormData({
                    title: currentEvent.title,
                    description: currentEvent.description,
                    location: currentEvent.location,
                    startTime: new Date(currentEvent.startTime).toISOString().slice(0, 16),
                    endTime: new Date(currentEvent.endTime).toISOString().slice(0, 16),
                });
            }
        }
    }, [editMode, currentEventId, events]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            editMutation.mutate([currentEventId, formData]);
        } else {
            addMutation.mutate(formData);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            location: '',
            startTime: '',
            endTime: '',
        });
        setEditMode(false);
        setCurrentEventId(null);
    };

    const handleEdit = (eventId) => {
        setCurrentEventId(eventId);
        setEditMode(true);
    };

    const handleDelete = (eventId) => {
        deleteMutation.mutate(eventId);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading events: {error.message}</p>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl mb-4">{editMode ? 'Edit Event' : 'Add Event'}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Event Title"
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Event Description"
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Event Location"
                    required
                    className="border p-2 rounded w-full mb-2"
                />
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
                <button type="submit" className="bg-teal-500 text-white rounded py-2 px-4">
                    {editMode ? 'Update Event' : 'Add Event'}
                </button>
                <button type="button" onClick={resetForm} className="ml-2 border rounded py-2 px-4">
                    Cancel
                </button>
            </form>

            <h3 className="text-xl mb-2">Event List</h3>
            <ul>
                {events.map((event) => (
                    <li key={event.id} className="flex justify-between items-center border-b py-2">
                        <span>{event.title}</span>
                        <div>
                            <button
                                onClick={() => handleEdit(event.id)}
                                className="text-teal-500 hover:underline mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(event.id)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddEditDeleteEvents;
