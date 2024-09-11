import PropTypes from 'prop-types';

const MemberCard = ({ member, onViewDetails }) => (
    <div className="bg-white shadow-md p-4 rounded-md text-center">
        <img src={member.photo} alt={member.name} className="w-32 h-32 mx-auto rounded-full" />
        <h3 className="mt-4 font-bold">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.title}</p>
        <button
            className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md"
            onClick={() => onViewDetails(member.id)}
        >
            View Details
        </button>
    </div>
);

MemberCard.propTypes = {
    member: PropTypes.object.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default MemberCard;
