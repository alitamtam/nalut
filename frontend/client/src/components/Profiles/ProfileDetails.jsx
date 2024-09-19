import { useParams } from 'react-router-dom';
// import { useProfile } from '../Admin/Dashboard/hooks/useGetProfileById'; // Import the custom hook
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublications'; // Hook to fetch publications
const ProfileDetails = () => {
    const { id } = useParams(); // Get the user ID from URL params
    const { data: profile, isLoading, error } = useGetPublications(id); // Use the custom hook

    if (isLoading) return <div>Loading profile...</div>;
    if (error) return <div>Error loading profile</div>;

    return (
        <div className="lg:mx-80 bg-slate-100 p-6 rounded-lg shadow-md">
            {/* Profile Details Layout */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                {/* Left Section: Image, Name, and Title */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center">
                    <img
                        src={profile.image || '/default-profile.jpg'}
                        // alt={profile.user.first_name}
                        className="w-48 h-48 object-cover rounded-full mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">
                        {/* {profile.user.first_name} {profile.user.last_name} */}
                    </h2>
                    <p className="text-gray-600 text-lg">{profile.title}</p>
                </div>

                {/* Separator Line */}
                <div className="hidden md:block w-px bg-gray-300 mx-6"></div>

                {/* Right Section: Bio */}
                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Bio</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {profile.bio || 'No bio available.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
