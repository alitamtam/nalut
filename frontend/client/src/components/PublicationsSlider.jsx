import { TECarousel, TECarouselItem } from "tw-elements-react";
import { useGetPublications } from "./Admin/Dashboard/hooks/useGetPublications";
import { Link } from "react-router-dom";
import { useState } from "react";

const PublicationsSlider = () => {
    const { data: publications = [], isLoading, isError } = useGetPublications();
    const [activeIndex, setActiveIndex] = useState(0);

    const recentPublications = publications.slice(0, 3);

    if (isLoading) return <p>Loading publications...</p>;
    if (isError) return <p>Error fetching publications</p>;

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === recentPublications.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? recentPublications.length - 1 : prevIndex - 1
        );
    };

    const handleIndicatorClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative lg:w-[800px] ssm:w-auto h-auto   mx-auto overflow-hidden capitalize  ">
            <TECarousel
                className="relative h-[550px] object-cover w-[fill] "
                showControls
                autoPlay // auto play the
                crossfade
                ride="carousel"
                prevBtnIcon={
                    <span
                        className="absolute top-1/3 left-2 transform-translate-y-1/2 text-white h-8 w-8  bg-sky-950  rounded-full "
                        onClick={handlePrev}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </span>
                }
                nextBtnIcon={
                    <span
                        className="absolute top-1/3 right-2 transform-translate-y-1/2 text-white h-8 w-8  bg-sky-950  rounded-full "
                        onClick={handleNext}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </span>
                }
            >
                {recentPublications.map((pub, index) => (
                    <TECarouselItem
                        key={pub.id}
                        itemID={pub.id}
                        className={`absolute top-0 left-0 lg:w-full lg:h-full  transition-opacity duration-500 ease-in-out ${activeIndex === index
                            ? "opacity-100 "
                            : "opacity-0 "
                            }`}
                    >
                        {/* Image Section */}
                        <div className="relative ">
                            <img
                                src={
                                    pub.image ||
                                    "https://via.placeholder.com/600x400"
                                }
                                className="block w-full h-[435px] object-cover"
                                alt={pub.title}
                            />

                            {/* Table Name (Bottom Left on Image) */}
                            {/* <span className="absolute bottom-2 left-2 bg-sky-950 text-white px-2 py-1 text-xl font-bold">
                                Publications
                            </span> */}
                            <span className="absolute bottom-4 left-2  text-white px-2 py-1 text-xl  font-serif text-shad ">
                                <Link to={`/publications/${pub.id}`}>
                                    {pub.title}
                                </Link>
                            </span>
                        </div>

                        {/* Slide Details Section (White Background) */}
                        <div className="bg-white p-4 text-black py-1">
                            <h5 className="flex text-lg font-normal text-sky-950 hover:text-teal-500 py-2">
                                {pub.topic.name}   <p className="text-gray-400 px-2"> | {new Date(pub.created_at).toLocaleDateString("en-UK", { day: 'numeric', month: 'long', year: 'numeric' })}</p>

                            </h5>
                            <p className="text-sm mt-1 font-bold capitalize text-orange-400 hover:text-teal-500">
                                <span className="text-gray-500 font-">by</span>  {pub.owner.first_name} {pub.owner.last_name}
                            </p>
                        </div>
                    </TECarouselItem>
                ))}

                {/* Indicators Below the Image */}
                <div className="absolute bottom-0 w-full  py-2 flex justify-center space-x-2 border-b-4 border-gray-100 shadow-lg px-4 ">
                    {recentPublications.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-3 w-3 rounded-full transition-all duration-300  ${activeIndex === index
                                ? "bg-sky-950"
                                : "bg-gray-300"
                                }`}
                        ></button>
                    ))}
                </div>
            </TECarousel>
        </div>
    );
};

export default PublicationsSlider;
