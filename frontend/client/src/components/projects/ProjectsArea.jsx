import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetProjects } from "../Admin/Dashboard/hooks/projectsHooks/useGetProjects";
import { Link } from "react-router-dom";

const ProjectsArea = () => {
    const { data: projects, isPending, error } = useGetProjects();

    if (isPending) return <div>Loading...</div>;
    if (error) return <div className="flex items-center justify-center bg-red-100 border lg:mx-80 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Error: {error.message}</div>;

    // Ensure projects is not undefined before mapping
    if (!projects || projects.length === 0) {
        return <div>No projects available.</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
        // autoplay: true,
        speed: 500,

        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    const lastThreePublications = projects.slice(-9);

    return (
        <div className="p-4 ">
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:mx-80 pb-4">
                <h2 className="text-3xl font-bold lg:mb-4 text-center capitalize font-body text-gray-800">
                    Projects Area
                </h2>
                <Link to='/projects/ViewAllProjects' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8 mb-4 lg:mb-0 hidden lg:block ">
                    View All
                </Link>
            </div>
            <div className=" bg-white text-gray-800 lg:h-4/5 border-b border-teal-600 pb-12 mb-12 w-full max-w-full overflow-x-hidden">

                <div className=" lg:mx-80  bg-white w-auto  ">

                    <Slider {...settings}>
                        {lastThreePublications.map((project) => (
                            <div key={project.id} className=" py-12 px-1 ">
                                <div className="bg-neutral-100 p-6">
                                    <div >
                                        <Link to={`/projects/${project.id}`} className="lg:text-ssm font-semibold capitalize hover:text-teal-600 py-6">
                                            <p className="h-12 mb-6">{project.title}</p>
                                        </Link>
                                    </div>
                                    {project.projectImage && (
                                        <Link to={`/projects/${project.id}`}>
                                            <div>
                                                <img
                                                    src={project.projectImage}
                                                    alt={project.title}
                                                    className="w-[480px] lg:h-60 object-cover mt-2 my-4"
                                                />
                                            </div>
                                        </Link>
                                    )}
                                    <Link to={`/profileDisplay/${project.creator.profile?.id}`}>
                                        <span className="text-gray-600">By |</span>
                                        <span className="text-orange-600 hover:underline"> {project.creator.firstName} {project.creator.lastName}</span>
                                    </Link></div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="pt-10 flex justify-center ">
                    <Link to='/projects/ViewAllProjects' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-14 mb-4 lg:mb-0 lg:hidden md:block ssm:block ">
                        View All
                    </Link>
                </div>
            </div >
        </div >
    );
};

export default ProjectsArea;
