
import { TECarousel, TECarouselItem } from "tw-elements-react";
import img1 from "../assets/img/img01.jpg";
import img2 from "../assets/img/img02.jpg";
import img3 from "../assets/img/img03.jpg";

function ImageSlider() {
    return (
        <>
            <TECarousel showControls showIndicators ride="carousel">
                <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                    <TECarouselItem
                        itemID={1}
                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <img
                            src={img1}
                            className="block w-full"
                            alt="First slide"
                        />
                        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                            <h5 className="text-xl">First slide label</h5>
                            <p>
                                Some representative placeholder content for the first slide.
                            </p>
                        </div>
                    </TECarouselItem>
                    <TECarouselItem
                        itemID={2}
                        className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <img
                            src={img2}
                            className="block w-full"
                            alt="Second slide"
                        />
                        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                            <h5 className="text-xl">Second slide label</h5>
                            <p>
                                Some representative placeholder content for the second slide.
                            </p>
                        </div>
                    </TECarouselItem>
                    <TECarouselItem
                        itemID={3}
                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    >
                        <img
                            src={img3}
                            className="block w-full"
                            alt="Third slide"
                        />
                        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                            <h5 className="text-xl">Third slide label</h5>
                            <p>
                                Some representative placeholder content for the third slide.
                            </p>
                        </div>
                    </TECarouselItem>
                    {/* Add more slides as needed */}
                </div>
            </TECarousel>
        </>
    );
}

export default ImageSlider;
