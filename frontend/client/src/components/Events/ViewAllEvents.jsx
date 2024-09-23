import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvents';

const AllEvents = () => {
    // Fetch all events using the useGetEvents hook
    const { data: events, isLoading, isError, error } = useGetEvents();

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while fetching events
    }

    if (isError) {
        return <p>Error: {error.message}</p>; // Display error if there's an issue
    }

    if (!events || events.length === 0) {
        return <p>No events found.</p>; // Handle case where no events are returned
    }

    return (
        <div className="flex flex-col items-center p-12 bg-white text-gray-800 h-4/5">
            <h2 className="text-6xl text-center mb-6 font-robinson">
                All Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-60 gap-4 justify-center mx-auto">
                {events.map((event) => (
                    <div key={event.id} className="border rounded-lg shadow-lg p-6 bg-white">
                        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                        <p className="mb-2">{event.description}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Start:</strong> {new Date(event.startTime).toLocaleString()}</p>
                        <p><strong>End:</strong> {new Date(event.endTime).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllEvents;
