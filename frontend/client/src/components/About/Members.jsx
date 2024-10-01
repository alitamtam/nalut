import MemberCard from './MemberCard';
import { useAllProfiles } from '../Admin/Dashboard/hooks/useGetProfiles'; // Import the useGetProfiles hook
import { useTranslation } from 'react-i18next';


const Members = () => {
    // Use the custom hook to fetch profiles
    const { t } = useTranslation('navbar');
    const { data: members = [], isLoading, error } = useAllProfiles();

    if (isLoading) return <p>Loading members...</p>;
    if (error) return <p>Error loading members: {error.message}</p>;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-600 font-arabic">{t('Members')}</h2>
            {Array.isArray(members) && members.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 font-arabic">
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
