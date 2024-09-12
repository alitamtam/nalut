import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import prop-types library
import { profileActions } from '../../store/profileSlice'; // Import profileActions

const { fetchProfile, updateProfile } = profileActions;

function EditProfile({ userId }) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const profileStatus = useSelector((state) => state.profile.status);

    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);

    // Fetch the profile only when userId is available
    useEffect(() => {
        if (userId) {
            dispatch(fetchProfile(userId));
        }
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
        if (userId) {
            dispatch(updateProfile({ userId, bio, image }));
        }
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

// Add prop types validation
EditProfile.propTypes = {
    userId: PropTypes.string, // Make sure userId is a string
};

// Default props to avoid the prop being undefined initially
EditProfile.defaultProps = {
    userId: '', // Default value as an empty string
};

export default EditProfile;
