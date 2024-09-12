import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get('/api/profiles');
                setProfiles(response.data);
                setLoading(false);
            } catch {
                setError('Error fetching profiles');
                setLoading(false);
            }
        };
        fetchProfiles();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Profile List</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Bio</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((profile) => (
                        <tr key={profile.id}>
                            <td className="border px-4 py-2">{profile.id}</td>
                            <td className="border px-4 py-2">{profile.name}</td>
                            <td className="border px-4 py-2">{profile.bio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfileList;
