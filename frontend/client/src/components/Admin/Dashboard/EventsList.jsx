import { useEffect, useState } from 'react';
import axios from 'axios';

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                setEvents(response.data);
                setLoading(false);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Error fetching events');
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Events List</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td className="border px-4 py-2">{event.id}</td>
                            <td className="border px-4 py-2">{event.title}</td>
                            <td className="border px-4 py-2">{event.date}</td>
                            <td className="border px-4 py-2">{event.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventsList;
