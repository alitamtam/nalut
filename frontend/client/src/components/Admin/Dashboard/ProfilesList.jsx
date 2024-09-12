import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profileActions } from '../../../store/profileSlice'; // Update the path based on your structure
const { fetchProfiles } = profileActions;

const ProfileList = () => {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profile.profiles); // Adjust to match the state
    const loading = useSelector((state) => state.profile.status === 'loading');
    const error = useSelector((state) => state.profile.error);

    useEffect(() => {
        dispatch(fetchProfiles()); // Dispatch action to fetch profiles
    }, [dispatch]);

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
