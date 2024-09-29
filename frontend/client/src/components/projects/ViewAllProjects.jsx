// ViewAllProjects.js
import { useGetProjects } from "../Admin/Dashboard/hooks/projectsHooks/useGetProjects";
import { Link } from "react-router-dom";

const ViewAllProjects = () => {
    const { data: projects, isPending, error } = useGetProjects();

    if (isPending) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                Error: {error.message}
            </div>
        );
    }

    // Ensure projects is not undefined before mapping
    if (!projects || projects.length === 0) {
        return <div className="text-center">No projects available.</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">All Projects</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <div key={project.id} className="border bg-neutral-100 border-gray-200 p-6 shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105">
                        <h3 className="text-xl font-semibold capitalize">{project.title}</h3>
                        <p className="text-gray-600">{project.content1}</p>
                        {project.project_image && (
                            <img
                                src={project.project_image}
                                alt={project.title}
                                className="w-full h-40 object-cover mt-4 rounded-lg"
                            />
                        )}
                        <Link to={`/projects/${project.id}`} className="text-blue-500 mt-2 inline-block hover:underline">View Details</Link>
                    </div>
                ))}
            </div>
            <div className="mt-10 text-center">
                <Link to="/" className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ViewAllProjects;
