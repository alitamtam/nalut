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
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:mx-80">
                <h2 className="text-3xl font-bold mb-4 text-center capitalcase  font-sans text-gray-800">
                    Event Areas
                </h2>
                <Link to='events/view-all' className="border-2 text-teal-500 font-body border-teal-500 rounded-full hover:bg-teal-500 hover:text-white py-2 px-8  mb-4 lg:mb-0">
                    View All
                </Link>
            </div>
            <div className="flex flex-col items-center p-12 bg-white text-gray-800 h-4/5">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-80 gap-4 justify-center mx-auto">
                    {lastThreeEvents.map((event) => (
                        <div key={event.id} className="border rounded-none  shadow-lg p-0 bg-slate-200 ">
                            {/* Display event image */}
                            {event.image && (
                                <img
                                    src={event.image} // Image source
                                    alt={event.title} // Accessible alt text with event title
                                    className="w-[480] h-[380] object-cover   mb-4" // Tailwind classes for styling
                                />
                            )}
                            <div className='py-5 px-5'>
                                <h3 className="text-2xl font-bold mb-2  pb-4">{event.title}</h3>
                                <p className="mb-2">{event.description}</p>

                                <p className="flex items-center mb-2">
                                    <IoLocationOutline className="mr-2" />
                                    <strong>Location:</strong> {event.location}
                                </p>

                                <div className="flex flex-col mb-2">
                                    <div className="flex items-center">
                                        <CiCalendar className="mr-2" /> {/* Calendar icon on the left */}
                                        <p>
                                            <strong>Date:</strong> {new Date(event.startTime).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <IoMdTime className="mr-2" /> {/* Calendar icon on the left */}
                                        <p>
                                            <strong>Time:</strong> {new Date(event.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="py-8">
                                    <Link
                                        to={`/events/${event.id}`}
                                        className="bg-teal-500 text-white font-body border-teal-500 rounded-full hover:bg-blue-950 hover:text-white py-4 px-8 mb-4 lg:mb-0"
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
