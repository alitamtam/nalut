// import { useState } from 'react';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ sections, onSectionClick }) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <div className={` bg-[#e2dfd8] p-4 ${isArabic ? 'text-right  ' : ''} shadow-lg w-[200px]  `}>
            <ul>
                {sections.map((section, index) => (
                    <li key={index} className="mb-2">
                        <button
                            onClick={() => onSectionClick(section.name)}
                            className={`text-sky-950 text-base font-bold hover:text-teal-600 font-arabic hover:underline`}
                        >
                            {section.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

Sidebar.propTypes = {
    sections: PropTypes.array.isRequired,
    onSectionClick: PropTypes.func.isRequired
};




export default Sidebar;
