import PropTypes from 'prop-types';

const MemberCard = ({ member, onViewDetails }) => (
    <div className="bg-white shadow-md p-4 rounded-md text-center">
        <img
            src={member.photo || '/images/default-profile.jpg'}  // Handle missing photo
            alt={member.fullName || 'Member Photo'}              // Using fullName for the alt attribute
            className="w-32 h-32 mx-auto rounded-full object-cover"
        />
        <h3 className="mt-4 font-bold">{member.fullName || 'Name not available'}</h3>  {/* Use fullName */}
        <p className="text-sm text-gray-500">{member.title || 'Title not available'}</p>
        <button
            className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md"
            onClick={() => onViewDetails(member.id)}
        >
            View Details
        </button>
    </div>
);

MemberCard.propTypes = {
    member: PropTypes.shape({
        id: PropTypes.number.isRequired,
        photo: PropTypes.string,
        fullName: PropTypes.string,   // Adjusted to use fullName
        title: PropTypes.string
    }).isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default MemberCard;
