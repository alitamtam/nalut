import { useParams } from 'react-router-dom'; // Import useParams to get the event ID
import { useGetEventById } from '../Admin/Dashboard/hooks/useGetEventById';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // Icons for social media
import FutureEvents from './FutureEvents';

const EventDetails = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const { data: event, isLoading, error } = useGetEventById(id); // Fetch event by ID
    const currentUrl = window.location.href; // Get current page URL

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while fetching event
    }

    if (error) {
        return <p>Error: {error.message}</p>; // Display error if there's an issue
    }

    // Social share URLs
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(event.title)}`;
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${encodeURIComponent(event.title)}`;

    return (
        <div className="flex flex-col items-center p-8 bg-white text-gray-800 ">
            <div className="lg:max-w-7xl w-full flex flex-col lg:flex-row bg-white shadow-lg overflow-hidden ">
                {/* Left Section: Title and Date */}
                <div className="flex-1 bg-neutral-200 p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl  mb-4 py-6 px-6 text-gray-700 ">{event.title}</h2>
                        <div className="flex items-center text-gray-700 text-xl mb-4">
                            <CiCalendar className="mr-2" />
                            <span>
                                {new Date(event.startTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>

                        {/* Share on social media links */}
                        <div className="flex items-center space-x-2 mt-2">
                            <span className="text-sky-950 font-bold" >Share</span>
                            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-sky-950 hover:text-teal-600">
                                <FaFacebookF size={18} />
                            </a>
                            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-sky-950 hover:text-teal-600">
                                <FaTwitter size={18} />
                            </a>
                            <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="text-sky-950 hover:text-teal-600">
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>
                    {/* Keep height equal to image */}
                    <div className="flex-1"></div> {/* This helps stretch the left section to match the height of the image */}
                </div>

                {/* Right Section: Image and Event Details */}
                <div className="flex-1 flex flex-col">
                    {/* Event Image */}
                    {event.image && (
                        <img
                            src={event.image}
                            alt={event.title}
                            className=" h-60 object-fill"
                        />
                    )}

                    {/* Event Details (location, start/end time) */}
                    <div className="bg-sky-950 text-white p-6 h-30 w-50">
                        <div className="mb-4">
                            <IoLocationOutline className="inline-block mr-2" />
                            <span>{event.location}</span>
                        </div>
                        <div className="mb-4 flex items-center">
                            <IoMdTime className="inline-block mr-2" />
                            <span>
                                {new Date(event.startTime).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })} -{' '}
                                {new Date(event.endTime).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section (below the image and event details) */}
            <div className="max-w-6xl w-full bg-white  p-6 mt-6 border-b border-sky-950 ">
                <p className="text-gray-800 text-sm mb-6 leading-relaxed">
                    {event.description.split('.').map((sentence, index) => (
                        <span key={index}>
                            {sentence.trim()}{sentence && '.'} {/* Add the period back after trimming */}
                            <br /> {/* Start a new line */}
                        </span>
                    ))}
                </p>


            </div>

            <FutureEvents />
        </div>
    );
};

export default EventDetails;
