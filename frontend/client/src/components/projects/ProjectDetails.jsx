import { useParams } from 'react-router-dom';
import { useGetProjectById } from '../Admin/Dashboard/hooks/projectsHooks/useGetProjectById';

const ProjectDetails = () => {
    const { id } = useParams();
    const { data: project, isLoading, error } = useGetProjectById(id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p>{project.content1}</p>
            <img src={project.project_image} alt={project.title} />
            {/* Add other project details as needed */}
        </div>
    );
};

export default ProjectDetails;
