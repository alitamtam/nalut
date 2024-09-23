import { useParams } from 'react-router-dom'; // Import useParams to get the event ID
import { useGetEventById } from '../Admin/Dashboard/hooks/useGetEventById';

const EventDetails = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const { data: event, isLoading, error } = useGetEventById(id); // Fetch event by ID

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while fetching event
    }

    if (error) {
        return <p>Error: {error.message}</p>; // Display error if there's an issue
    }

    return (
        <div className="flex flex-col items-center p-12 bg-white text-gray-800 h-4/5">
            <h2 className="text-6xl text-center mb-6 font-robinson">{event.title}</h2>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <p className="text-2xl mb-4">{event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <p><strong>End Time:</strong> {new Date(event.endTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <p><strong>Organized by User ID:</strong> {event.ownerId}</p>
            </div>
        </div>
    );
};

export default EventDetails;
