
import { Link } from 'react-router-dom';
import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvent';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";

const FutureEvents = () => {
    // Destructure the query result from useGetEvents
    const { data: events, isLoading, error } = useGetEvents();

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while events are being fetched
    }

    if (error) {
        return <p>Error: {error.message}</p>; // Display error if there's an issue
    }

    if (!events || events.length === 0) {
        return <p>No future events found.</p>; // Handle case where no events are returned
    }
    // Get the last 3 events
    const lastThreeEvents = events.slice(-3);
    return (
        <div>
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:mx-80 py-4 ">
                <h2 className="text-3xl font-bold mb-4 text-center capitalise  font-sans text-gray-800">
                    Event Areas
                </h2>
                <Link to='events/view-all' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8  mb-4 lg:mb-0">
                    {t('view_all')}
                </Link>
            </div>
            <div className="flex flex-col items-center p-12 bg-white text-gray-800 h-4/5 border-b border-teal-600 pb-12 mb-12">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-80 gap-3 justify-center mx-auto">
                    {lastThreeEvents.map((event) => (
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
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 capitalize">{event.title}</h3>
                                {/* <p className="text-gray-700 text-sm mb-3 line-clamp-1">{event.description}</p> Clamp description to 2 lines */}

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

                                <div className="my-6 text-center">
                                    <Link
                                        to={`/events/${event.id}`}
                                        className="bg-teal-600 text-white font-sans py-4 border-teal-600 text-base rounded-full hover:bg-sky-950 hover:text-white  px-8 transition-colors duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>




            </div>
        </div >
    );
};

export default FutureEvents;
