// import React from 'react';

const MemberDetails = ({ member }) => (
    <div className="flex">
        <div className="w-1/3">
            <img src={member.photo} alt={member.name} className="w-48 h-48 rounded-md" />
            <div className="mt-4">
                <p><strong>Contact Info:</strong> {member.contact}</p>
            </div>
        </div>
        <div className="w-2/3 pl-8">
            <h2 className="text-2xl font-bold">{member.name}</h2>
            <p className="mt-2 text-sm text-gray-700">{member.bio}</p>
        </div>
    </div>
);

export default MemberDetails;
