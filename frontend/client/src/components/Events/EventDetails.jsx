
import { useGetEventById } from '../Admin/Dashboard/hooks/useGetEventById';

const EventDetails = () => {
    // Destructure the query result from useGetEvents
    const { data: event, isLoading, isError, error } = useGetEventById();

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while events are being fetched
    }


    if (!event || event.length === 0) {
        return <p>No Event found.</p>; // Handle case where no events are returned
    }

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while fetching event
    }

    if (isError) {
        return <p>Error: {error.message}</p>; // Display error if there's an issue
    }



    return (
        <div className="flex flex-col items-center p-12 bg-white text-gray-800 h-4/5">
            <h2 className="text-6xl text-center mb-6 font-robinson">{event.title}</h2>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <p className="text-2xl mb-4">{event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(event.endTime).toLocaleString()}</p>
                <p><strong>Organized by User ID:</strong> {event.ownerId}</p>
            </div>
        </div>
    );
};

export default EventDetails;
