import { useGetProjects } from '../Admin/Dashboard/hooks/projectsHooks/useGetProjects';
import { Link } from 'react-router-dom';

const ProjectsList = () => {
    const { data: projects, isLoading, error } = useGetProjects();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects?.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 shadow-lg">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-gray-600">{project.content1}</p>
                        <Link to={`/projects/${project.id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsList;
