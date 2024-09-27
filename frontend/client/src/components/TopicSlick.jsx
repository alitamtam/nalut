// path: frontend/client/src/components/TopicsSlick.jsx
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { useGetTopics } from "./Admin/Dashboard/hooks/useGetTopics"; // Use hook to fetch topics
import { FaUserGraduate, FaBook, FaLaptop, FaBrain, FaLeaf, FaPenAlt } from 'react-icons/fa';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { FaSchoolCircleCheck } from 'react-icons/fa6';
import { BsBuildingAdd } from 'react-icons/bs';
import { RiGovernmentLine } from 'react-icons/ri';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

// Define a mapping of icon names to components
const iconMap = {
    'Teacher Education': <LiaChalkboardTeacherSolid className="text-6xl" />,
    'Teacher Professional Development': <FaUserGraduate className="text-6xl" />,
    'School Governance': <FaSchoolCircleCheck className="text-6xl" />,
    'Ministry of Education': <RiGovernmentLine className="text-6xl" />,
    'Buildings and Facilities': <BsBuildingAdd className="text-6xl" />,
    'Quality Assurance': <AiOutlineFileProtect className="text-6xl" />,
    'Educational Research': <FaBook className="text-6xl" />,
    'Information Technology in Schools': <FaLaptop className="text-6xl" />,
    'Inclusion and Neuro-divergence': <FaBrain className="text-6xl" />,
    'Student Wellbeing and Enrichment': <FaLeaf className="text-6xl" />,
    'Assessment and Examination': <FaPenAlt className="text-6xl" />,
};

// Custom next and previous arrows
const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute ssm:mx-4 md::mx-4 right-0 ssm:-top-1/4 lg:top-1/2 transform -translate-y-1/2 bg-sky-950 lg:p-2 rounded-full shadow-md hover:bg-teal-600 z-10"
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
        className="absolute ssm:mx-4 md::mx-4 left-0 ssm:-top-1/4 lg:top-1/2 transform -translate-y-1/2 bg-sky-950 lg:p-2 rounded-full shadow-md hover:bg-teal-600 z-10"
    >
        <IoIosArrowBack className="text-3xl text-white" />
    </button>
);
PrevArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const TopicsSlick = () => {
    // Fetch the topics using your custom hook
    const { data: topics, isLoading, error } = useGetTopics();
    const navigate = useNavigate(); // Initialize useNavigate

    const settings = {
        infinite: true,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading topics</div>;

    return (
        <div >
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:mx-80 py-4">
                <h2 className="text-3xl font-bold mb-4 text-center capitalise  font-sans text-gray-800">
                    Topic Areas
                </h2>
                <Link to='topics/view-all' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8  mb-4 lg:mb-0 hidden lg:block md:block">
                    View All
                </Link>
            </div>
            <div className="relative w-full pb-12 lg:px-7  border-teal-500 border-b ">
                <div>
                    <Slider {...settings}>
                        {topics?.map((topic, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-48 h-56 ssm:h-[200px] ssm:w-full mx-none flex flex-col text-center bg-gray-100 shadow-lg lg:p-4 transition-transform duration-300 hover:scale-105 hover:bg-sky-900 hover:text-white md:w-60 md:h-72 group"
                                onClick={() => navigate(`/topics/${topic.name}`)} // Navigate on click
                            >
                                <div className="lg:text-6xl text-teal-600 group-hover:text-white pb-4 pl-20 lg:pt-10 ssm:pt-8 ">
                                    {/* Dynamically render the icon based on iconClass */}
                                    {iconMap[topic.iconClass] || <FaBook className="text-6xl" />}
                                </div>
                                <div className="flex-col">
                                    <p className="lg:mt-4 text-teal-600 lg:text-xs ssm:text-xs font-sans font-bold tracking-wider uppercase text-center group-hover:text-white pb-10">
                                        {topic.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>

                </div>
                <div className='pt-5 w-[200px]  m-auto'>
                    <Link to='topics/view-all' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 text-center mb-4 lg:mb-0 lg:hidden md:block ssm:block">
                        View All
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopicsSlick;
