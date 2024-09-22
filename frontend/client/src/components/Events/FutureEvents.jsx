// components/FutureEvents.jsx
import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvents';
import { Link } from 'react-router-dom';
import { HiArrowLongRight } from "react-icons/hi2";

const FutureEvents = () => {
    const { events, loading, error } = useGetEvents();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="flex flex-col items-center p-12 bg-white text-gray-800 h-4/5">
            <h2 className="text-6xl text-center mb-6 font-robinson">
                Future Activities {/* Replace this with translation function if needed */}
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

            <Link to="/events-archive">
                <span
                    className="border-none text-black py-3 px-5 bg-yellow-500 sm:w-full sm:px-40 lg:px-40 
                    font-robinson uppercase ssm:text-4xl lg:text-6xl hover:opacity-50 flex items-center justify-center mx-auto"
                >
                    View All Activities {/* Replace this with translation function if needed */}
                    <HiArrowLongRight className="inline-block ml-2 ssm:text-4xl" />
                </span>
            </Link>
        </div>
    );
};

export default FutureEvents;
