import { useParams } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublicationById'; // Hook to fetch publications

const ProfileDetails = () => {
    const { id } = useParams(); // Get the user ID from URL params
    const { data: publications, isLoading, error } = useGetPublications(); // Fetch publications
    const publication = publications?.find((pub) => pub.owner.Profile?.id === parseInt(id)); // Find the specific publication based on profile ID

    if (isLoading) return <div>Loading profile...</div>;
    if (error) return <div>Error loading profile</div>;
    if (!publication || !publication.owner) return <div>Profile not found</div>; // Ensure publication and owner exist

    return (
        <div className="lg:mx-80 bg-slate-500 p-6  shadow-md">
            {/* Profile Details Layout */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                {/* Left Section: Image, Name, and Title */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center bg-sky-950">
                    <img
                        src={`data:image/jpeg;base64,${publication.owner.Profile?.image || '/default-profile.jpg'}`}  // Check if image exists, otherwise show default
                        alt='profile'
                        className="w-48 h-48 object-cover rounded-full mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">
                        {publication.owner.first_name} {publication.owner.last_name}
                    </h2>
                </div>

                {/* Separator Line */}
                <div className="hidden md:block w-px bg-gray-300 mx-6"></div>

                {/* Right Section: Bio */}
                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Bio</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {publication.owner.Profile?.bio || 'No bio available.'} {/* Check if bio exists */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
