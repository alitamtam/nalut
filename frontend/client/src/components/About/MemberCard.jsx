import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useTranslation } from 'react-i18next'; // Import the hook

const MemberCard = ({ member }) => {
    const { t, i18n } = useTranslation('navbar'); // Use the hook to get the translation
    const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic

    // Find the translation for the current language
    const translation = member.translations?.find(tr => tr.language === i18n.language);

    return (
        <div className="bg-sky-950 shadow-md p-4 text-white rounded-none text-center capitalize">
            <img
                src={`data:image/jpeg;base64,${member.image}`} // Handle missing photo
                alt={member.fullName || 'Member Photo'} // Use fullName for alt attribute
                className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-4 ">
                {isArabic ? translation?.title || member.fullName : member.fullName || 'Name not available'}
            </h3>

            {/* Use Link for navigation to the profile details page */}
            <div className="my-10">
                <Link
                    to={`/profileDisplay/${member.id}`} // Link to the profile details page using member's id
                    className="text-white border-2 border-white rounded-full hover:bg-teal-600 bg-sky-950 hover:text-white py-2 px-8 font-sans hover:border-none"
                >
                    {t('viewDetails.title')}
                </Link>
            </div>
        </div>
    );
};

MemberCard.propTypes = {
    member: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string,
        fullName: PropTypes.string, // Adjusted to use fullName
        translations: PropTypes.arrayOf(
            PropTypes.shape({
                language: PropTypes.string.isRequired,
                name: PropTypes.string,
            })
        ),
    }).isRequired,
};

export default MemberCard;
