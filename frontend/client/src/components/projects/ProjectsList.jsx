import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetProjects } from "../Admin/Dashboard/hooks/projectsHooks/useGetProjects";
import { Link } from "react-router-dom";

const ProjectsList = () => {
    const { data: projects, isPending, error } = useGetProjects();

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Ensure projects is not undefined before mapping
    if (!projects || projects.length === 0) {
        return <div>No projects available.</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
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

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <Slider {...settings}>
                {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 shadow-lg">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-gray-600">{project.content1}</p>
                        {project.project_image && (
                            <img
                                src={project.project_image}
                                alt={project.title}
                                className="w-full h-40 object-cover rounded-lg mt-2"
                            />
                        )}
                        <Link to={`/projects/${project.id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProjectsList;
