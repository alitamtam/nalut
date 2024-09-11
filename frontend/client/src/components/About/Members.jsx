// frontend/client/src/components/About/Members.jsx
import { useState, useEffect } from 'react';
import MemberCard from './MemberCard';
// import MemberDetails from './MemberDetails';
import api from '../../api/axiosConfig'; // Import the axios instance

const Members = () => {
    const [members, setMembers] = useState([]);
    const [, setSelectedMember] = useState(null);

    useEffect(() => {
        // Fetch members from the API
        const fetchMembers = async () => {
            try {
                const response = await api.get('/api/profiles'); // Use the axios instance
                console.log('API response:', response.data); // Log the response

                setMembers(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const handleViewDetails = (id) => {
        const member = members.find(member => member.id === id);
        setSelectedMember(member);
    };

    return (
        <div className="p-8">
            {Array.isArray(members) && members.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                    {members.map(member => (
                        <MemberCard key={member.id} member={member} onViewDetails={handleViewDetails} />
                    ))}
                </div>
            ) : (
                <p>No members found.</p>
            )}
        </div>
    )
};

export default Members;
