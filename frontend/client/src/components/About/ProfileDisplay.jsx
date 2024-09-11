// path: frontend/client/src/components/About/ProfileDisplay.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/profileSlice';

function ProfileDisplay({ userId }) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const profileStatus = useSelector((state) => state.profile.status);

    useEffect(() => {
        dispatch(fetchProfile(userId));
    }, [dispatch, userId]);

    if (profileStatus === 'loading') return <p>Loading...</p>;
    if (profileStatus === 'failed') return <p>Error loading profile</p>;

    return (
        <div className="profile-container">
            <div className="profile-image">
                <img src={`data:image/jpeg;base64,${profile.image}`} alt="Profile" />
            </div>
            <div className="profile-details">
                <h2>{profile.user.first_name} {profile.user.last_name}</h2>
                <p>{profile.bio}</p>
            </div>
        </div>
    );
}

export default ProfileDisplay;
