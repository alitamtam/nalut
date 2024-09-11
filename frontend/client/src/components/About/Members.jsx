import { useState } from 'react';
import MemberCard from './MemberCard';
import MemberDetails from './MemberDetails';

const members = [
    {
        id: 1,
        name: 'John Doe',
        title: 'Senior Developer',
        bio: 'John is an experienced developer...',
        photo: '/images/john.jpg',
        contact: 'john@example.com',
    },
    // Add more members here
];

const Members = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const handleViewDetails = (id) => {
        const member = members.find(member => member.id === id);
        setSelectedMember(member);
    };

    return (
        <div className="p-8">
            {selectedMember ? (
                <MemberDetails member={selectedMember} />
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {members.map(member => (
                        <MemberCard key={member.id} member={member} onViewDetails={handleViewDetails} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Members;
