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
        <div className="relative w-[650px] h-full mx-auto overflow-hidden ">
            <TECarousel
                className="relative h-[550px] w-[fill] "
                showControls
                crossfade
                ride="carousel"
                prevBtnIcon={
                    <span
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black h-8 w-8 cursor-pointer"
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
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black h-8 w-8 cursor-pointer"
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
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeIndex === index
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0"
                            }`}
                    >
                        {/* Image Section */}
                        <div className="relative">
                            <img
                                src={
                                    pub.image ||
                                    "https://via.placeholder.com/600x400"
                                }
                                className="block w-full h-[400px] object-cover"
                                alt={pub.title}
                            />

                            {/* Table Name (Bottom Left on Image) */}
                            <span className="absolute bottom-2 left-2 bg-sky-950 text-white px-2 py-1 text-xl font-bold">
                                Publications
                            </span>
                        </div>

                        {/* Slide Details Section (White Background) */}
                        <div className="bg-white p-4 text-black">
                            <h5 className="text-xl font-bold  text-sky-950 hover:text-teal-500">
                                <Link to={`/publications/${pub.id}`}>
                                    {pub.title}
                                </Link>
                            </h5>
                            <p className="text-sm mt-1 font-bold capitalize text-orange-400 hover:text-teal-500">
                                by {pub.owner.first_name} {pub.owner.last_name}
                            </p>
                            <p className="text-sm text-gray-500">Date {new Date(pub.created_at).toLocaleDateString()}</p>
                        </div>
                    </TECarouselItem>
                ))}

                {/* Indicators Below the Image */}
                <div className="absolute bottom-0 w-full  py-2 flex justify-center space-x-2 border-b-4 border-gray-100 shadow-lg">
                    {recentPublications.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${activeIndex === index
                                ? "bg-gray-300"
                                : "bg-blue-950"
                                }`}
                        ></button>
                    ))}
                </div>
            </TECarousel>
        </div>
    );
};

export default PublicationsSlider;
