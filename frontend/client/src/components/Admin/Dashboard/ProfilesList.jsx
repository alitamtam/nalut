import { useAllProfiles } from "../Dashboard/hooks/useGetProfiles";

const ProfileList = () => {
    const { data, isPending, isError, error } = useAllProfiles();
    if (isPending) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }
    console.log(data)
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Profile List</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Bio</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((profile) => (
                        <tr key={profile.id}>
                            <td className="border px-4 py-2">{profile.id}</td>
                            <td className="border px-4 py-2">{profile.fullName}</td>
                            <td className="border px-4 py-2">{profile.bio}</td>
                            <td className="border px-4 py-2">
                                {profile.image ? (
                                    <img
                                        alt="profile"
                                        src={`data:image/jpeg;base64,${profile.image}`} // Include the base64 prefix here
                                        className="h-16 w-16 object-cover rounded-full"
                                    />
                                ) : (
                                    <p>No Image</p> // Fallback if no image is provided
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfileList;
