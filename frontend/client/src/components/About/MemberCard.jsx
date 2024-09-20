import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MemberCard = ({ member }) => (
    <div className="bg-blue-950 shadow-md p-4 text-white rounded-none text-center capitalize">
        <img
            src={`data:image/jpeg;base64,${member.image}`}// Handle missing photo
            alt={member.fullName || 'Member Photo'}             // Use fullName for alt attribute
            className="w-32 h-32 mx-auto rounded-full object-cover"
        />
        <h3 className="mt-4 font-bold">{member.fullName || 'Name not available'}</h3> {/* Use fullName */}
        <p className="text-sm text-white">{member.title || 'Title not available'}</p>

        {/* Use Link for navigation to the profile details page */}
        <div className='my-10  '> <Link
            to={`/profileDisplay/${member.id}`} // Link to the profile details page using member's id
            className="  text-white border-2 border-white rounded-full hover:bg-teal-500 bg-blue-950 hover:text-white py-2 px-8 font-sans hover:border-none"
        >
            View Details
        </Link></div>

    </div>
);

MemberCard.propTypes = {
    member: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string,
        fullName: PropTypes.string, // Adjusted to use fullName
        title: PropTypes.string,
    }).isRequired,
};

export default MemberCard;
