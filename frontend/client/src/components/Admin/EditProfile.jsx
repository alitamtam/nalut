// client/src/components/Admin/EditProfile.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, fetchProfile } from '../../store/profileSlice'; // Correct path to profileSlice


function EditProfile({ userId }) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const profileStatus = useSelector((state) => state.profile.status);

    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(fetchProfile(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (profile) {
            setBio(profile.bio || '');
            setImage(profile.image || null);
        }
    }, [profile]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result.split(',')[1]); // Base64 encoded string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ userId, bio, image }));
    };

    if (profileStatus === 'loading') return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="edit-profile-form">
            <div>
                <label htmlFor="bio">Bio:</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="image">Profile Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
}

export default EditProfile;
