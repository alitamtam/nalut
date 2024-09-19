import MemberCard from './MemberCard';
import { useAllProfiles } from '../Admin/Dashboard/hooks/useGetProfiles'; // Import the useGetProfiles hook

const Members = () => {
    // Use the custom hook to fetch profiles
    const { data: members = [], isLoading, error } = useAllProfiles();

    if (isLoading) return <p>Loading members...</p>;
    if (error) return <p>Error loading members: {error.message}</p>;

    return (
        <div className="p-8">
            {Array.isArray(members) && members.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                    {members.map((member) => (
                        <MemberCard key={member.id} memberId={member.id} member={member} />
                    ))}
                </div>
            ) : (
                <p>No members found.</p>
            )}
        </div>
    );
};

export default Members;
