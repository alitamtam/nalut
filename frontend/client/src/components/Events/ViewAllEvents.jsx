import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvent';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the hook

const AllEvents = () => {
    // Fetch all events using the useGetEvents hook
    const { data: events, isLoading, isError, error } = useGetEvents();
    const { t } = useTranslation('navbar'); // Use the hook to get the translation function

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
        <div className="flex flex-col items-center py-12 bg-white text-gray-800 h-4/5">
            <h2 className="text-3xl font-bold mb-4 items-start capitalise font-sans text-gray-800">
                {t('Our Latest  Events')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-80 gap-4 justify-center mx-auto py-6 ">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="rounded-none overflow-hidden  bg-gray-100 hover:shadow-lg transition-shadow duration-300 w-96  " // Tailwind classes for styling
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
                            <h3 className="font-semibold mb-2 text[#092a40] capitalize font-serif text-lg py-4">{event.title}</h3>
                            {/* <p className="text-gray-700 text-sm mb-3 line-clamp-2">{event.description}</p> Clamp description to 2 lines */}



                            <div className="flex flex-col text[#092a40] text-ssm mb-2">
                                <div className="flex items-center text[#092a40] text-ssm mb-2">
                                    <IoLocationOutline className="mr-2" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center mb-1">
                                    <CiCalendar className="mr-2" />
                                    <span>
                                        {new Date(event.startTime).toLocaleDateString('en-UK', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <IoMdTime className="mr-2" />
                                    <span>
                                        {new Date(event.startTime).toLocaleTimeString('en-UK', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })} -{' '}
                                        {new Date(event.endTime).toLocaleTimeString('en-UK', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 text-center py-5">
                                <Link
                                    to={`/events/${event.id}`}
                                    className="bg-teal-600 text-white font-sans py-4 border-teal-600 text-base rounded-full hover:bg-sky-950 hover:text-white px-8 transition-colors duration-300"
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
