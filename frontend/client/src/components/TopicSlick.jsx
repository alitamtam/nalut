
import PropTypes from 'prop-types';

import Slider from "react-slick";
import { FaUserGraduate, FaBook, FaLaptop, FaBrain, FaLeaf, FaPenAlt } from 'react-icons/fa';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { FaSchoolCircleCheck } from 'react-icons/fa6';
import { BsBuildingAdd } from 'react-icons/bs';
import { RiGovernmentLine } from 'react-icons/ri';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Define the topics array
const topics = [
    { name: 'Teacher Education', icon: <LiaChalkboardTeacherSolid className="text-6xl border-2 border-teal-500 rounded-[50px] group-hover-border-white " /> },
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

// Custom next and previous arrows
const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 p-2 rounded-full shadow-md hover:bg-sky-700 z-10"
    >
        <IoIosArrowForward className="text-3xl text-white" />
    </button>
);
NextArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
};
const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-500 p-2 rounded-full shadow-md hover:bg-sky-700 z-10"
    >
        <IoIosArrowBack className="text-3xl text-white" />
    </button>
);
PrevArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const TopicsSlick = () => {
    const settings = {
        infinite: true,
        autoplay: true,
        speed: 200,
        slidesToShow: 7,

        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="relative w-full pb-10 px-7 mb-40 border-teal-500 border-b ">
            <div >
                <Slider {...settings} >
                    {topics.map((topic, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-48 h-56 mx-0 flex flex-col text-center bg-gray-100 shadow-lg p-4 transition-transform duration-300 hover:scale-105 hover:bg-sky-900 hover:text-white md:w-60 md:h-72 group"
                        >
                            <div className="text-6xl  text-teal-600 group-hover:text-white  pb-4 pl-20 pt-10">
                                {topic.icon}
                            </div>
                            <div className="flex-col ">

                                <p className="mt-4 text-teal-600 text-xs font-sans font-bold tracking-wider uppercase text-center group-hover:text-white pb-10">
                                    {topic.name}
                                </p></div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default TopicsSlick;
