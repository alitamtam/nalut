import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvent';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { Link } from 'react-router-dom';

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
                    <div key={event.id} className="  border rounded-none shadow-lg p-none bg-slate-200">
                        {/* Display event image */}
                        {event.image && (
                            <img
                                src={event.image} // Image source
                                alt={event.title} // Accessible alt text with event title
                                className="w-[480] h-[300] object-cover mb-4" // Tailwind classes for styling
                            />
                        )}

                        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                        <p className="mb-2">{event.description}</p>

                        <p className="flex items-center mb-2">
                            <IoLocationOutline className="mr-2" />
                            <strong>Location:</strong> {event.location}
                        </p>

                        <div className="flex flex-col mb-2">
                            <div className="flex items-center">
                                <CiCalendar className="mr-2" /> {/* Calendar icon */}
                                <p>
                                    <strong>Date:</strong> {new Date(event.startTime).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                            </div>

                            <div className="flex items-center">
                                <IoMdTime className="mr-2" /> {/* Time icon */}
                                <p>
                                    <strong>Time:</strong> {new Date(event.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>

                        <div className="py-8">
                            <Link
                                to={`/events/${event.id}`}
                                className="bg-teal-500  text-white font-body border-teal-500 rounded-full hover:bg-blue-950 hover:text-white py-4 px-8 mb-4 lg:mb-0"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllEvents;
