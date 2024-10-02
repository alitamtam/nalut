import { useParams } from 'react-router-dom'; // Import useParams to get the profile id from URL
import { useGetProfileById } from '../Admin/Dashboard/hooks/useGetProfileById'; // Import the useGetProfiles hook
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next

const ProfileDetails = () => {
    const { id } = useParams(); // Get the profile ID from URL params
    const { data: Profile, isLoading, error } = useGetProfileById(id); // Fetch the profile by ID
    const { t } = useTranslation(); // Use the translation hook

    // Loading, error, or profile not found states
    if (isLoading) return <div className="flex items-center justify-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{t('loading_profile')}</div>;
    if (error) return (
        <div className="flex items-center justify-center bg-red-100 border lg:mx-80 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{t('error')}</strong>
            <span className="block sm:inline ml-2 lg:mx-80">{t('error_loading_profile')}</span>
        </div>
    );
    if (!Profile || !Profile.user) return <div>{t('profile_not_found')}</div>;

    return (
        <div className="lg:mx-80 bg-white p-4">
            {/* Profile Details Layout */}
            <div className="flex flex-col md:flex-row items-start ssm:items-center md:items-center justify-between lg:mb-6 lg:pt-6">
                {/* Left Section: Image, Name, and Title */}
                <div className="lg:w-[300px] p-6 md:w-1/2 flex flex-col items-center md:items-start justify-center bg-sky-950">
                    <img
                        src={`data:image/jpeg;base64,${Profile.image}`} // Check if image exists, otherwise show default
                        alt={`${Profile?.firstName} ${Profile?.lastName}`}
                        className="w-48 h-48 object-cover rounded-full mb-4 my-3"
                    />
                    <h2 className="text-lg font-normal text-white capitalize my-3 center items-center lg:px-6 font-arabic">
                        {Profile.fullName}
                    </h2>
                </div>

                {/* Right Section: Bio */}
                <div className="lg:w-full md:w-1/2 ssm:my-3 lg:mx-6">
                    <p className="text-gray-600 font-arabic font-light md:text-ssm leading-relaxed mb-4 p-4 border-white border bg-white">
                        {Profile?.bio || t('no_bio_available')} {/* Display bio or fallback */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
