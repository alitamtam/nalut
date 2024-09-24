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


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-80 gap-3 justify-center mx-auto">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="rounded-none overflow-hidden shadow-md bg-gray-100 hover:shadow-lg transition-shadow duration-300 w-96" // Tailwind classes for styling
                    >
                        <div className="w-full h-56">
                            {/* Event image with consistent sizing */}
                            {event.image && (
                                <img
                                    src={event.image} // Image source
                                    alt={event.title} // Accessible alt text with event title
                                    className="w-full h-full object-fit" // Full width, height, and object-cover to maintain aspect ratio
                                />
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">{event.title}</h3>
                            <p className="text-gray-700 text-sm mb-3 line-clamp-2">{event.description}</p> {/* Clamp description to 2 lines */}

                            <div className="flex items-center text-gray-600 text-sm mb-2">
                                <IoLocationOutline className="mr-2" />
                                <span>{event.location}</span>
                            </div>

                            <div className="flex flex-col text-gray-600 text-sm mb-2">
                                <div className="flex items-center mb-1">
                                    <CiCalendar className="mr-2" />
                                    <span>
                                        {new Date(event.startTime).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <IoMdTime className="mr-2" />
                                    <span>
                                        {new Date(event.startTime).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })} -{' '}
                                        {new Date(event.endTime).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <Link
                                    to={`/events/${event.id}`}
                                    className="bg-teal-600 text-white font-body border-teal-600 rounded-full hover:bg-blue-950 hover:text-white py-2 px-6 transition-colors duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default AllEvents;
