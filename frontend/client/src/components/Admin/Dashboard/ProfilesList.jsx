import { useAllProfiles } from "../Dashboard/hooks/useGetProfiles";
import { FaUserCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa'; // Import relevant icons

const ProfileList = () => {
    const { data: responseData, isPending, isError, error } = useAllProfiles();

    // Ensure profiles is always an array
    const profiles = Array.isArray(responseData) ? responseData : [];

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-full">
                <FaSpinner className="animate-spin text-3xl text-blue-500 mr-2" /> {/* Loading spinner icon */}
                <p>Loading profiles...</p>
            </div>
        );
    }

    if (isError) {
        console.error('Error fetching profiles:', error);
        return (
            <div className="flex items-center justify-center h-full text-red-500">
                <FaExclamationTriangle className="mr-2 text-3xl" /> {/* Error icon */}
                <p>Error fetching profiles: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-3">
            <h2 className="text-3xl font-bold mb-6 text-center">Profile List</h2> {/* Profile List in English */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg items-center text-center">
                    <thead>
                        <tr className="items-center">
                            <th className=" py-3 px-4 font-semibold text-gray-700">#</th>
                            <th className=" py-3 px-4 font-semibold text-gray-700">Name & Image</th> {/* Name and Image combined */}
                            <th className=" py-3 px-4 font-semibold text-gray-700">English Bio</th>
                            <th className=" py-3 px-4 font-semibold text-gray-700">Arabic Bio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.length > 0 ? (
                            profiles.map((profile, index) => (
                                <tr key={profile.id} className="bg-gray-100 border-b border-gray-200">
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-10 py-2 flex flex-col items-center space-x-2">
                                        {/* Profile Image or User Icon */}
                                        {profile.image ? (
                                            <img
                                                alt="profile"
                                                src={`data:image/jpeg;base64,${profile.image}`} // Display base64 image
                                                className="h-16 w-16 object-cover rounded-full border"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <FaUserCircle className="text-gray-500 text-4xl" /> // Default User Icon
                                        )}
                                        <div className="flex flex-col mx-3">
                                            <span className="text-base font-semibold">
                                                {profile.fullName || 'No Name'}
                                            </span> {/* English Name */}
                                            <span className="text-base font-semibold text-center">
                                                {profile.translations[1]?.title || 'No Name'}
                                            </span> {/* Arabic Name */}
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {profile.translations[0]?.bio || 'No bio available'}
                                    </td> {/* English Bio */}
                                    <td className="border px-4 py-2 text-right">
                                        {profile.translations[1]?.bio || 'No bio available'}
                                    </td> {/* Arabic Bio */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="border px-4 py-2 text-center">No profiles found</td> {/* No profiles found */}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfileList;
