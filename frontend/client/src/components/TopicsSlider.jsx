import { useState } from 'react';
import { FaChalkboardTeacher, FaUserGraduate, FaSchool, FaBuilding, FaCheck, FaBook, FaLaptop, FaBrain, FaLeaf, FaPenAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdConstruction } from 'react-icons/md';

const topics = [
    { name: 'Teacher Education', icon: <FaChalkboardTeacher className="text-6xl " /> },
    { name: 'Teacher Professional Development', icon: <FaUserGraduate className="text-6xl" /> },
    { name: 'School Governance', icon: <FaSchool className="text-6xl" /> },
    { name: 'Ministry of Education', icon: <FaBuilding className="text-6xl" /> },
    { name: 'Buildings and Facilities', icon: <MdConstruction className="text-6xl" /> },
    { name: 'Quality Assurance', icon: <FaCheck className="text-6xl" /> },
    { name: 'Educational Research', icon: <FaBook className="text-6xl" /> },
    { name: 'Information Technology in Schools', icon: <FaLaptop className="text-6xl" /> },
    { name: 'Inclusion and Neuro-divergence', icon: <FaBrain className="text-6xl" /> },
    { name: 'Student Wellbeing and Enrichment', icon: <FaLeaf className="text-6xl" /> },
    { name: 'Assessment and Examination', icon: <FaPenAlt className="text-6xl" /> },
];

const TopicsSlider = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const slideLeft = () => {
        setScrollPosition(prev => Math.min(prev + 200, 0)); // Adjust the scroll position
    };

    const slideRight = () => {
        setScrollPosition(prev => Math.max(prev - 200, -((topics.length * 200) - 200))); // Adjust the scroll position
    };

    return (
        <div className="relative w-full  p-4 py-12 px-7">
            <div className="flex items-center">
                <button
                    onClick={slideLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-sky-700"
                >
                    <FaArrowLeft className="text-xl" />
                </button>
                <div className="overflow-hidden whitespace-nowrap  hover:bg-sky-900 hover:text-white">
                    <div
                        className="flex transition-transform duration-300"
                        style={{ transform: `translateX(${scrollPosition}px)` }}
                    >
                        {topics.map((topic, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-48 h-56 mx-0 flex flex-col items-center justify-center bg-gray-100  shadow-lg p-0 transition-transform duration-300 hover:scale-105 hover:bg-sky-900 hover:text-white"
                            >
                                <div className="mb-3 t text-6x1 text-teal-600 hover:text-white ">
                                    {topic.icon}
                                </div>
                                <p className="text-teal-600 text-xs font-semibold tracking-wider uppercase text-center hover:text-white">
                                    {topic.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={slideRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                >
                    <FaArrowRight className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default TopicsSlider;
