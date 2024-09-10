import { useState } from 'react';
import { FaUserGraduate, FaBook, FaLaptop, FaBrain, FaLeaf, FaPenAlt, } from 'react-icons/fa';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import { BsBuildingAdd } from "react-icons/bs";
import { RiGovernmentLine } from "react-icons/ri";
import { AiOutlineFileProtect } from "react-icons/ai";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const topics = [
    { name: 'Teacher Education', icon: <LiaChalkboardTeacherSolid className="text-6xl" /> },
    { name: 'Teacher Professional Development', icon: <FaUserGraduate className="text-6xl" /> },
    { name: 'School Governance', icon: <FaSchoolCircleCheck className="text-6xl" /> },
    { name: 'Ministry of Education', icon: <RiGovernmentLine className="text-6xl" /> },
    { name: 'Buildings and Facilities', icon: <BsBuildingAdd className="text-6xl" /> },
    { name: 'Quality Assurance', icon: <AiOutlineFileProtect className="text-6xl" /> },
    { name: 'Educational Research', icon: <FaBook className="text-6xl" /> },
    { name: 'Information Technology in Schools', icon: <FaLaptop className="text-6xl" /> },
    { name: 'Inclusion and Neuro-divergence', icon: <FaBrain className="text-6xl" /> },
    { name: 'Student Wellbeing and Enrichment', icon: <FaLeaf className="text-6xl" /> },
    { name: 'Assessment and Examination', icon: <FaPenAlt className="text-6xl" /> },
];

const TopicsSlider = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const slideLeft = () => {
        setScrollPosition(prev => Math.min(prev + 200, 0));
    };

    const slideRight = () => {
        if (scrollPosition <= -(topics.length * 200 - 200)) {
            setScrollPosition(0); // Reset to the beginning for continuous loop
        } else {
            setScrollPosition(prev => prev - 200);
        }
    };

    return (
        <div className="relative w-full pb-10 px-7 mb-40   border-teal-500 border-b">
            <div className="flex items-center">
                <button
                    onClick={slideLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-500 p-2 rounded-full shadow-md hover:bg-sky-700 z-10"
                >
                    <IoIosArrowBack className="text-3xl text-white" />
                </button>
                <div className="overflow-hidden whitespace-nowrap hover:bg-sky-900 hover:text-white">
                    <div
                        className="flex transition-transform duration-300"
                        style={{ transform: `translateX(${scrollPosition}px)` }}
                    >
                        {/* Cloned Items for infinite loop */}
                        {topics.map((topic, index) => (
                            <div
                                key={index + topics.length}
                                className="flex-shrink-0 w-48 h-56 mx-0 flex flex-col items-center justify-center bg-gray-100 shadow-lg p-0 transition-transform duration-300 hover:scale-105 hover:bg-sky-900 hover:text-white md:w-60 md:h-72"
                            >
                                <div className="mb-3 text-6xl text-teal-600 hover:text-white">
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
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 p-2 rounded-full shadow-md hover:bg-sky-700 z-10"
                >
                    <IoIosArrowForward className="text-3xl text-white" />
                </button>
            </div>
        </div>
    );
};

export default TopicsSlider;
