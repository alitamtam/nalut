import { Link, useParams } from 'react-router-dom';
import { useGetProjectById } from '../Admin/Dashboard/hooks/projectsHooks/useGetProjectById';

const ProjectDetails = () => {
    const { id } = useParams();
    const { data: project, isLoading, error } = useGetProjectById(id);

    if (isLoading) return <div className="flex items-center justify-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">Loading...</div>;
    if (error) return <div className="flex items-center justify-center bg-red-100 border lg:mx-80 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Error: {error.message}</div>;

    return (
        <div className="lg:mx-80 bg-white p-6  ">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

            {/* Flex container for image and author details */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                {/* Image on the left */}
                <img
                    src={project.project_image}
                    alt={project.title}
                    className="w-full md:w-1/2 h-64 object-cover "
                />

                {/* Separator line */}
                <div className="hidden md:block w-px bg-gray-300 mx-6"></div>

                {/* Author details on the right */}
                <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
                    <Link to={`/profileDisplay/${project.actors.profile?.id}`} className="text-gray-600 mb-2 capitalize font-bold hover:text-teal-600 py-5">
                        By {project.actors.first_name} {project.actors.last_name} | {new Date(project.created_at).toLocaleDateString("en-UK", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </Link>
                    {/* Display Actor Profile Image
                    {project.actors.profile?.image && (
                        <img
                            src={`data:image/png;base64,${project.actors.profile.image}`}
                            alt={`${project.actors.first_name} ${project.actors.last_name}`}
                            className="w-16 h-16 rounded-full border-2 border-gray-300 mb-2"
                        />
                    )} */}
                    {/* Display Actor Bio */}
                </div>
            </div>

            {/* Thin line divider */}
            <hr className="border-t border-gray-300 my-6" />

            {/* Project content */}
            <section className="mt-6 p-6">
                <p className="text-gray-700 mb-4 flex-grow">
                    {project.content1}
                </p>
            </section>
            <section>
                <p className="text-gray-700 mb-4 flex-grow">
                    {project.content2}
                </p>
            </section>
            <section>
                <p className="text-gray-700 mb-4 flex-grow">
                    {project.content3}
                </p>
            </section>
        </div>
    );
};

export default ProjectDetails;
