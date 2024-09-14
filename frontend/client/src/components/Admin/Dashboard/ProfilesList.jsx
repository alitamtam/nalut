import { useGetProfiles } from "../Dashboard/hooks/useGetProfiles";

const ProfileList = () => {
    const { data, isPending, isError, error } = useGetProfiles();
    if (isPending) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

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
                            <td className="border px-4 py-2">{profile.name}</td>
                            <td className="border px-4 py-2">{profile.bio}</td>
                            <td className="border px-4 py-2">{profile.image}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfileList;
