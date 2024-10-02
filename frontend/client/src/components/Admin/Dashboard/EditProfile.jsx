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
    const [translations, setTranslations] = useState({
        en: { bio: user.bio || '', title: user.title || '' },
        ar: { bio: '', title: '' },
    });

    const { mutate: editProfile, isPending } = useEditProfiles(); // Import the mutation hook

    useEffect(() => {
        setBio(user.bio || '');
        setImage(user.image || null);
    }, [user]);

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
            bio, image, translations: [
                { language: 'en', ...translations.en },
                { language: 'ar', ...translations.ar },
            ]
        };

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
        <>
            <div className="flex items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
                    <img
                        src={user.profile?.image}
                        alt={`${user.fullName}'s profile`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{user.firstName}</h2>
                    <p className="text-gray-600">{user.bio}</p>
                </div>
            </div>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* English Version */}
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

                    {/* Arabic Version */}
                    <div>
                        <label htmlFor="bio" className="block text-gray-700 font-medium">Arabic Bio:</label>
                        <textarea
                            id="bio"
                            value={translations.ar.bio}
                            onChange={(e) => handleTranslationChange('ar', 'bio', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            rows="4"
                        />
                        <label htmlFor="bio" className="block text-gray-700 font-medium">Arabic Full Name:</label>
                        <textarea
                            id="bio"
                            value={translations.ar.title}
                            onChange={(e) => handleTranslationChange('ar', 'title', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            rows="4"
                        />
                    </div>

                    {/* Profile Image */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-4 py-2 px-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
                    >
                        {isPending ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
