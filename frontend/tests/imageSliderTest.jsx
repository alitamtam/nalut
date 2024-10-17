import { TECarousel, TECarouselItem } from "tw-elements-react";
import { useGetPublications } from "./Admin/Dashboard/hooks/useGetPublications";
import { Link } from "react-router-dom";

const PublicationsSlider = () => {
    // Use the custom hook to fetch publications
    const { data: publications = [], isLoading, isError } = useGetPublications();

    // Filter to get the latest 3 publications
    const recentPublications = publications.slice(0, 3);

    // Handle loading and error states
    if (isLoading) return <p>Loading publications...</p>;
    if (isError) return <p>Error fetching publications</p>;
    return (
        <TECarousel
            className="h-[400px] w-[600px]"
            showControls
            showIndicators
            crossfade
            ride="carousel"
            prevBtnIcon={
                <>
                    <span className="inline-block text-black h-8 w-8 [&>svg]:h-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            stretch="none"
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
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Previous
                    </span>
                </>
            }
            nextBtnIcon={
                <>
                    <span className="inline-block text-white h-8 w-8 [&>svg]:h-8 border rounded p">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            stretch="none"
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
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Next
                    </span>
                </>
            }
            theme={{
                indicator:
                    "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
            }}
        >
            <div className="relative w-[600px] overflow-hidden after:clear-both after:block after:content-['']">
                {recentPublications.map((pub) => (
                    <TECarouselItem
                        key={pub.id}
                        itemID={pub.id}
                        className="relative float-left w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <img
                            src={pub.image || 'https://via.placeholder.com/600x400'}
                            className="block w-[600px] h-[400px]"
                            alt={pub.title}
                        />

                        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block hover:text-teal-500">
                            <h5 className="text-xl font-bold">
                                {/* Wrap title in a Link to navigate to publication details */}
                                <Link to={`/publications/${pub.id}`}>
                                    {pub.title}
                                </Link>
                            </h5>
                            {/* <p>by {pub.author}</p> */}
                        </div>
                    </TECarouselItem>
                ))}
            </div>
        </TECarousel>
    );
};

export default PublicationsSlider;
