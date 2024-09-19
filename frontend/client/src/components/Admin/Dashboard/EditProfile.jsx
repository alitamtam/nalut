import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSettingsStore } from '../../../store/useSettingsStore'; // Assuming this manages user state
import { useEditProfiles } from '../Dashboard/hooks/useEditProfile'; // Adjust the path

const EditProfile = () => {
    const { user } = useSettingsStore(state => ({
        user: state.user,
    }));

    const [bio, setBio] = useState(user.bio || '');
    const [image, setImage] = useState(user.image || null);

    const { mutate: editProfile, isLoading } = useEditProfiles(); // Import the mutation hook

    useEffect(() => {
        setBio(user.bio || '');
        setImage(user.image || null);
    }, [user]);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result?.toString().split(',')[1]); // Convert to base64
            };
            reader.readAsDataURL(file);
        }
    };


    console.log("Current user ID:", user.id);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { bio, image }; // Prepare form data

        // Call mutation function
        editProfile(
            { id: user.id, formData }, // Pass user id and form data to the mutation
            {
                onSuccess: () => {
                    toast.success('Profile updated successfully!');
                },
                onError: () => {
                    toast.error('Failed to update profile.');
                },
            }
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
                    <img
                        src={image ? `data:image/jpeg;base64,${image}` : '/path/to/default/avatar.png'}
                        alt={`${user.fullName}'s profile`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{user.fullName}</h2>
                    <p className="text-gray-600">{user.bio}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="bio" className="block text-gray-700 font-medium">Bio:</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        rows="4"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-gray-700 font-medium">Profile Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading} // Disable button while loading
                    className="mt-4 py-2 px-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
                >
                    {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
