import { useDeleteProfile } from '../Dashboard/hooks/useDeleteProfile'; // Adjust the path
import { useEditProfiles } from '../Dashboard/hooks/useEditProfile'; // Adjust the path
import { useGetProfileById } from './hooks/useGetProfileById';
import { useSettingsStore } from '../../../store/useSettingsStore'; // Adjust the path
import { toast } from 'react-toastify'; // Import toast for notifications
import { useEffect, useState } from 'react'; // Import useEffect and useState

const EditProfile = () => {
    const { user } = useSettingsStore(state => ({ user: state.user }));
    const { data, isLoading, error } = useGetProfileById(user?.id); // Pass user.id to the hook

    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [translations, setTranslations] = useState({
        en: { bio: '', title: '' },
        ar: { bio: '', title: '' },
    });

    const { mutate: editProfile, isLoading: isUpdating } = useEditProfiles();
    const { mutate: deleteProfile, isLoading: isDeleting } = useDeleteProfile();

    useEffect(() => {
        if (data) {
            setBio(data.bio || '');
            setImage(data.image || null);
            setTranslations({
                en: { bio: data.bio || '', title: data.title || '' },
                ar: { bio: data.translations?.ar?.bio || '', title: data.translations?.ar?.title || '' },
            });
        }
    }, [data]);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract only the base64 part
                setImage(base64String); // Store only the base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTranslationChange = (lang, key, value) => {
        setTranslations((prev) => ({
            ...prev,
            [lang]: {
                ...prev[lang],
                [key]: value,
            },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            bio,
            image,
            translations: [
                { language: 'en', ...translations.en },
                { language: 'ar', ...translations.ar },
            ],
        };

        editProfile(
            { id: user.id, formData },
            {
                onSuccess: () => toast.success('Profile updated successfully!'),
                onError: () => toast.error('Failed to update profile.'),
            }
        );
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            deleteProfile(user.id, {
                onSuccess: () => {
                    toast.success('Profile deleted successfully.');
                },
                onError: () => toast.error('Failed to delete profile.'),
            });
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="text-left py-2">ID</th>
                            <th className="text-left py-2">Name</th>
                            <th className="text-left py-2">Bio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (
                            <tr>
                                <td className="border px-4 py-2">{data.id}</td>
                                <td className="border px-4 py-2">{data.fullName}</td>
                                <td className="border px-4 py-2">{data.bio}</td>
                                <td className="border px-4 py-2">{data.translations.bio}</td>

                                <td className="border px-4 py-2">
                                    {data.image ? (
                                        <img
                                            alt="profile"
                                            src={`data:image/jpeg;base64,${data.image}`}
                                            className="h-16 w-16 object-cover rounded-full"
                                        />
                                    ) : (
                                        <p>No Image</p>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="bio" className="block text-gray-700 font-medium">English Bio:</label>
                        <textarea
                            id="bio"
                            value={translations.en.bio}
                            onChange={(e) => handleTranslationChange('en', 'bio', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            rows="4"
                        />
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-gray-700 font-medium">Arabic Bio:</label>
                        <textarea
                            id="bio"
                            value={translations.ar.bio}
                            onChange={(e) => handleTranslationChange('ar', 'bio', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            rows="4"
                        />
                        <label htmlFor="title" className="block text-gray-700 font-medium">Arabic Full Name:</label>
                        <textarea
                            id="title"
                            value={translations.ar.title}
                            onChange={(e) => handleTranslationChange('ar', 'title', e.target.value)}
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
                        disabled={isUpdating}
                        className="mt-4 py-2 px-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
                    >
                        {isUpdating ? 'Updating...' : 'Update Profile'}
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Profile'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
