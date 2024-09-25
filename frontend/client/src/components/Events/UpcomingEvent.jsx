import { useState } from 'react'; // Import useState to manage the current slide index
import Slider from 'react-slick'; // Using react-slick for the slider
import { Link } from 'react-router-dom'; // Import the Link component
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; // Import React Icons for address and date
import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvent'; // Importing the custom hook
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './sliderStyle.css'; // Import your custom CSS for dots

const UpcomingEvent = () => {
    const { data: events, isLoading, isError } = useGetEvents();
    const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide

    const settings = {
        dots: true,
        dotsClass: 'slick-dots custom-dots', // Custom class for dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Update currentSlide on slide change,
        arrows: false, // Hide the arrows
    };

    if (isLoading) {
        return <div>Loading events...</div>;
    }

    if (isError) {
        return <div>Error fetching events</div>;
    }

    // Sort events by startTime in ascending order
    const sortedEvents = [...events].sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).slice(-3); // Only display the last 3 events

    return (
        <div className='lg:mx-80 mb-12'>
            <div className="flex flex-col items-center lg:flex-row lg:justify-between py-4">
                <h2 className="text-3xl font-bold mb-4 text-center capitalise font-sans text-gray-800">
                    Upcoming Events
                </h2>
                <Link to='events/view-all' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8 mb-4 lg:mb-0">
                    View All
                </Link>
            </div>
            <div className="mx-auto px-4 lg:py-8 ssm:py-4 flex justify-between items-center">
                {/* Left Side: Event Details */}
                <div className="lg:w-1/2 lg:h-[340px] bg-[#e2dfd8] lg:px-8 py-12 ">
                    {sortedEvents.length > 0 && (
                        <>
                            <Link to={`/events/${sortedEvents[currentSlide]?.id}`} className="text-gray-800 font-serif  text-lg font-bold mb-12 hover:text-teal-600">
                                {sortedEvents[currentSlide]?.title}
                            </Link>
                            <div className='my-12'>
                                <p className="text-gray-700 mb-2 flex items-center">
                                    <FaMapMarkerAlt className="mr-2" /> {sortedEvents[currentSlide]?.location}
                                </p>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FaCalendarAlt className="mr-2" /> {new Date(sortedEvents[currentSlide]?.startTime).toLocaleDateString()} at {new Date(sortedEvents[currentSlide]?.startTime).toLocaleTimeString()}
                                </p></div>
                            <Link to={`/events/${sortedEvents[currentSlide]?.id}`} className="bg-teal-600 text-white font-sans py-4 border-teal-600 text-base rounded-full hover:bg-sky-950 hover:text-white px-8 transition-colors duration-300">
                                View Details
                            </Link>
                        </>
                    )}
                </div>

                {/* Right Side: Image Slider */}
                <div className="lg:w-1/2 lg:h-[340px]">
                    <Slider {...settings}>
                        {sortedEvents.map((event, index) => (
                            <div key={index}>
                                <img
                                    src={event.image || '/default-event-image.jpg'} style={{ height: "340px" }} // Use a default image if none is provided
                                    alt={event.title}
                                    className="w-full h-96 object-contain-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvent;
