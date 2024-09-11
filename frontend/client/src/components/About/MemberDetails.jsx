// path: frontend/client/src/components/About/MemberDetails.jsx
import PropTypes from 'prop-types';

const MemberDetails = ({ member }) => {
    if (!member) return <p>Member not found</p>;

    return (
        <div className="flex">
            <div className="w-1/3">
                <img
                    src={member.photo || '/images/default-profile.jpg'}
                    alt={member.name || 'Member Photo'}
                    className="w-48 h-48 rounded-md object-cover"
                />
                <div className="mt-4">
                    <p><strong>Contact Info:</strong> {member.contact || 'N/A'}</p>
                </div>
            </div>
            <div className="w-2/3 pl-8">
                <h2 className="text-2xl font-bold">{member.name || 'Name not available'}</h2>
                <p className="mt-2 text-sm text-gray-700">{member.bio || 'Bio not available'}</p>
            </div>
        </div>
    );
};

MemberDetails.propTypes = {
    member: PropTypes.shape({
        photo: PropTypes.string,
        name: PropTypes.string,
        bio: PropTypes.string,
        contact: PropTypes.string
    })
};

export default MemberDetails;
