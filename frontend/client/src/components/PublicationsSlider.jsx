import { TECarousel, TECarouselItem } from "tw-elements-react";

const publications = [
    {
        id: 1,
        title: 'The Future of Education',
        author: 'John Doe',
        img: 'https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_640.jpg',
    },
    {
        id: 2,
        title: 'Technology in Classrooms',
        author: 'Jane Smith',
        img: 'https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=',
    },
    {
        id: 3,
        title: 'AI and Learning',
        author: 'Mark Lee',
        img: 'https://media.istockphoto.com/id/1352603244/photo/shot-of-an-unrecognizable-businessman-working-on-his-laptop-in-the-office.jpg?s=612x612&w=0&k=20&c=upiDYeAZEsxbUBdhX35MXm79drIXA-5Q-FcfmZk71lM=',
    },
];

const PublicationsSlider = () => {
    return (
        <>
            <TECarousel
                className="h-[400px] w-[600px]  "  // Fix the height of the carousel
                showControls
                showIndicators
                crossfade
                ride="carousel"
                prevBtnIcon={
                    <>
                        <span className="inline-block text-black h-8 w-8 [&>svg]:h-8">
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
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Previous
                        </span>
                    </>
                }
                nextBtnIcon={
                    <>
                        <span className="inline-block text-black h-8 w-8 [&>svg]:h-8">
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
                    {publications.map((pub) => (
                        <TECarouselItem
                            key={pub.id}
                            itemID={pub.id}
                            className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
                        >
                            <img
                                src={pub.img}
                                className="block w-[600px] h-[400px] "  // Ensure images have consistent height and aspect ratio
                                alt={pub.title}
                            />
                            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                <h5 className="text-xl font-bold">{pub.title}</h5>
                                <p>by {pub.author}</p>
                            </div>
                        </TECarouselItem>
                    ))}
                </div>
            </TECarousel>
        </>
    );
};

export default PublicationsSlider;
