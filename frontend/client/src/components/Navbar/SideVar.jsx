// import { useState } from 'react';

import PropTypes from 'prop-types';

const Sidebar = ({ sections, onSectionClick }) => {
    // component code here 
    return (
        <div className="w-64 bg-gray-100 p-4 shadow-lg">
            <ul>
                {sections.map((section, index) => (
                    <li key={index} className="mb-2">
                        <button
                            onClick={() => onSectionClick(section.name)}
                            className="text-teal-600 hover:text-teal-800"
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
