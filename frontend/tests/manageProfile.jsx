import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { useEditProfiles } from '../Dashboard/hooks/useEditProfile';
import { useGetProfileById } from '../Dashboard/hooks/useGetProfileById';
import { useAddProfile } from '../Dashboard/hooks/useAddProfile';
import { useDeleteProfile } from '../Dashboard/hooks/useDeleteProfile';

const EditProfile = () => {
    const { userId } = useSettingsStore(state => ({
        userId: state.user?.id, // Fetch user ID from settings store
    }));

    const { data: user, refetch: refetchUser } = useGetProfileById(userId); // Fetch profile by ID
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);

    const { mutate: editProfile, isPending: isEditPending } = useEditProfiles(); // Mutation hook for editing profile
    const { mutate: createProfile, isPending: isCreatePending } = useAddProfile(); // Mutation hook for creating profile
    const { mutate: deleteProfile } = useDeleteProfile(); // Mutation hook for deleting profile

    useEffect(() => {
        if (user) {
            setBio(user.bio || '');
            setImage(user.image || null);
        }
    }, [user]);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { bio, image };

        if (user) {
            // If user exists, edit the profile
            editProfile(
                { id: user.id, formData },
                {
                    onSuccess: () => {
                        toast.success('Profile updated successfully!');
                        refetchUser();
                    },
                    onError: () => {
                        toast.error('Failed to update profile.');
                    },
                }
            );
        } else {
            // If user does not exist, create a new profile
            createProfile(
                formData,
                {
                    onSuccess: () => {
                        toast.success('Profile created successfully!');
                        refetchUser();
                    },
                    onError: () => {
                        toast.error('Failed to create profile.');
                    },
                }
            );
        }
    };

    const handleDeleteProfile = () => {
        if (user) {
            deleteProfile(user.id, {
                onSuccess: () => {
                    toast.success('Profile deleted successfully!');
                    // Optionally, redirect or clear state
                },
                onError: () => {
                    toast.error('Failed to delete profile.');
                },
            });
        }
    };

    return (
        <div className=" mx-auto p-6 bg-white rounded-lg ">
            <div className="flex items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-6">

                    <img
                        src={image ? `data:image/jpeg;base64,${image}` : '/path/to/default/avatar.png'}
                        alt={`${user?.fullName}'s profile`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{user?.fullName}</h2>
                    <p className="text-gray-600">{user?.bio}</p>
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
                    disabled={isEditPending || isCreatePending}
                    className="mt-4 py-2 px-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
                >
                    {(isEditPending || isCreatePending) ? 'Processing...' : 'Update Profile'}
                </button>
                {user && (
                    <button
                        type="button"
                        onClick={handleDeleteProfile}
                        className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Delete Profile
                    </button>
                )}
                <h2></h2>
            </form>
        </div>
    );
};

export default EditProfile;
