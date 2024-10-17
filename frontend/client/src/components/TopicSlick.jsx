import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useGetTopics } from './Admin/Dashboard/hooks/useGetTopics';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    FaUserGraduate, FaBook, FaLaptop, FaBrain, FaLeaf, FaPenAlt,
} from 'react-icons/fa';
import { FaSchoolCircleCheck } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { BsBuildingAdd } from 'react-icons/bs';
import { RiGovernmentLine } from 'react-icons/ri';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Icon mapping for topics
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
        aria-label="Next"
        className="absolute ssm:mx-4 md::mx-4 md:my-6 right-0   ssm:-top-1/4 top-1/2 transform -translate-y-1/2 bg-sky-950 lg:p-2 rounded-full shadow-md hover:bg-teal-600 z-10"
    >
        <IoIosArrowForward className="text-3xl text-white" />
    </button>
);
NextArrow.propTypes = { onClick: PropTypes.func.isRequired };

const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label="Previous"
        className="absolute ssm:mx-4 md::mx-4 md:my-6 left-0  ssm:-top-1/4 top-1/2 transform -translate-y-1/2 bg-sky-950 lg:p-2 rounded-full shadow-md hover:bg-teal-600 z-10"
    >
        <IoIosArrowBack className="text-3xl text-white" />
    </button>
);
PrevArrow.propTypes = { onClick: PropTypes.func.isRequired };

const TopicsSlick = () => {
    const { data: topics, isLoading, error } = useGetTopics();
    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar';
    const navigate = useNavigate();

    const settings = {
        infinite: true,
        speed: 200,
        slidesToShow: 7,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1536, settings: { slidesToShow: 7 } },
            { breakpoint: 1280, settings: { slidesToShow: 5 } },
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 640, settings: { slidesToShow: 2 } },
        ],
    };

    if (isLoading) {
        return <div className="flex items-center justify-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded lg:mx-80" role="alert">Error loading topics</div>;
    }

    return (
        <div>
            <div className={`flex flex-col items-center ${isArabic ? 'lg:flex-row-reverse' : ''} lg:flex-row lg:justify-between xxl:mx-80 lg:mx-40 py-4`}>
                <h2 className={`text-3xl font-bold text-center ${isArabic ? 'lg:text-2xl font-arabic' : ''} font-sans text-sky-950`}>
                    {t('topics.topic area')}
                </h2>
                <Link to="topics/view-all" className={`border-2 text-teal-600 font-body ${isArabic ? 'lg:text-base font-arabic' : ''} border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8 mb-4 lg:mb-0 hidden lg:block`}>
                    {t('view_all')}
                </Link>
            </div>
            <div className="relative w-full pb-12 lg:px-12 border-b border-teal-500">
                <Slider {...settings}>
                    {Array.isArray(topics) && topics.length > 0 ? (
                        topics.map((topic) => {
                            const translation = topic.translations?.find(tr => tr.language === i18n.language)?.name || topic.name || 'No Name';

                            return (
                                <div
                                    key={topic.id || Math.random()}
                                    className={`flex-shrink-0 md:w-60 md:h-72 ssm:h-[200px] ssm:w-full flex flex-col bg-[#e2dfd8] shadow-lg lg:p-4 transition-transform duration-300 hover:scale-105 hover:bg-sky-900 hover:text-white group ${isArabic ? 'font-arabic' : 'font-ubuntu'} `}
                                    onClick={() => topic.name && navigate(`/topics/${topic.name}`)}
                                >
                                    <div className="lg:text-6xl text-teal-600 group-hover:text-white lg:px-16 ssm:px-16 sm:px-20 ssm:pt-8">
                                        {iconMap[topic.iconClass] || <LiaChalkboardTeacherSolid className="text-6xl" />}
                                    </div>
                                    <div className="flex-col py-6">
                                        <p className={`lg:mt-4 text-teal-700 sm:text-lg ssm:text-sm lg:text-sm text-center group-hover:text-white ${isArabic ? 'lg:text-xl font-arabic' : 'font-ubuntu tracking-wider uppercase'}`}>
                                            {translation || 'No Translation Available'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No topics available at the moment.</p>
                    )}
                </Slider>
                <div className="pt-5 w-[200px] m-auto">
                    <Link to="topics/view-all" className={`border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 text-center mb-4 lg:text-base lg:font-arabic ssm:py-1 ssm:font-arabic md:font-arabic ssm:text-lg lg:mb-0 lg:hidden md:block ssm:block`}>
                        {t('view_all')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopicsSlick;
