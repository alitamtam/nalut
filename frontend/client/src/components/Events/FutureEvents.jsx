import { Link } from 'react-router-dom';
import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvents';

const FutureEvents = () => {
    // Destructure the query result from useGetEvents
    const { data: events, isLoading, isError, error } = useGetEvents();

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while events are being fetched
    }

    if (isError) {
        return <p>Error: {error.message}</p>; // Display error if there's an issue
    }

    if (!events || events.length === 0) {
        return <p>No future events found.</p>; // Handle case where no events are returned
    }

    return (
        <div>
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:mx-80">
                <h2 className="text-3xl font-bold mb-4 text-center capitalcase  font-sans text-gray-800">
                    Event Areas
                </h2>
                <Link to='events/view-all' className="border-2 text-teal-500 font-body border-teal-500 rounded-full hover:bg-teal-500 hover:text-white py-2 px-8  mb-4 lg:mb-0">
                    View All
                </Link>
            </div>
            <div className="flex flex-col items-center p-12 bg-white text-gray-800 h-4/5">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-60 gap-4 justify-center mx-auto">
                    {events.map((event) => (
                        <div key={event.id} className="border rounded-lg shadow-lg p-6 bg-white">
                            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                            <p className="mb-2">{event.description}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Start:</strong> {new Date(event.startTime).toLocaleString()}</p>
                            <p><strong>End:</strong> {new Date(event.endTime).toLocaleString()}</p>

                            <Link
                                to={`/events/${event.id}`} // Link to event details page
                                className="border-2 text-teal-500 font-body border-teal-500 rounded-full hover:bg-teal-500 hover:text-white py-2 px-8 mb-4 lg:mb-0"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>


            </div>
        </div >
    );
};

export default FutureEvents;
