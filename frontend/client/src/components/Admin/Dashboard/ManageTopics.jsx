import { useState } from "react";
import { useGetTopics } from "./hooks/useGetTopics";
import { useDeleteTopics } from "./hooks/useDeleteTopics";
import { useAddTopics } from "./hooks/useAddTopics";
import { useEditTopics } from "./hooks/useEditTopics";
// Import icons
import { FaUserGraduate, FaBook, FaLaptop, FaBrain, FaLeaf, FaPenAlt } from 'react-icons/fa';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { FaSchoolCircleCheck } from 'react-icons/fa6';
import { BsBuildingAdd } from 'react-icons/bs';
import { RiGovernmentLine } from 'react-icons/ri';
import { AiOutlineFileProtect } from 'react-icons/ai';

const iconOptions = [
    { name: 'Teacher Education', icon: <LiaChalkboardTeacherSolid className="text-3xl" /> },
    { name: 'Teacher Professional Development', icon: <FaUserGraduate className="text-3xl" /> },
    { name: 'School Governance', icon: <FaSchoolCircleCheck className="text-3xl" /> },
    { name: 'Ministry of Education', icon: <RiGovernmentLine className="text-3xl" /> },
    { name: 'Buildings and Facilities', icon: <BsBuildingAdd className="text-3xl" /> },
    { name: 'Quality Assurance', icon: <AiOutlineFileProtect className="text-3xl" /> },
    { name: 'Educational Research', icon: <FaBook className="text-3xl" /> },
    { name: 'Information Technology in Schools', icon: <FaLaptop className="text-3xl" /> },
    { name: 'Inclusion and Neuro-divergence', icon: <FaBrain className="text-3xl" /> },
    { name: 'Student Wellbeing and Enrichment', icon: <FaLeaf className="text-3xl" /> },
    { name: 'Assessment and Examination', icon: <FaPenAlt className="text-3xl" /> },
];

const ManageTopics = () => {
    const { data: topics, isLoading, error } = useGetTopics();

    const { mutate: deleteTopic } = useDeleteTopics();
    const { mutate: addTopic } = useAddTopics();
    const { mutate: editTopic } = useEditTopics();

    const [newTopic, setNewTopic] = useState({ name: "", iconClass: "" });
    const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTopicId, setEditingTopicId] = useState(null);

    if (isLoading) return <div className="flex items-center justify-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">Loading...</div>;
    if (error) return <div className="flex items-center justify-center bg-red-100 border lg:mx-80 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Error loading topics</div>;

    // Handle Delete Topic
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this topic?")) {
            deleteTopic(id);
        }
    };

    // Edit topic
    const handleEdit = (topic) => {
        setNewTopic({ name: topic.name, iconClass: topic.iconClass });
        setSelectedIcon(iconOptions.find(icon => icon.name === topic.iconClass));
        setIsEditing(true);
        setEditingTopicId(topic.id);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const topicWithIcon = { ...newTopic, iconClass: selectedIcon.name };

        if (isEditing) {
            editTopic({ ...topicWithIcon, id: editingTopicId });
        } else {
            addTopic(topicWithIcon);
        }
        setNewTopic({ name: "", iconClass: "" });
        setSelectedIcon(iconOptions[0]); // Reset to default icon
        setIsEditing(false); // Reset editing state
        setEditingTopicId(null); // Reset editing topic id
    };

    // Handle Select Icon
    const handleSelectIcon = (e) => {
        const index = e.target.value;
        setSelectedIcon(iconOptions[index]);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Manage Topics</h2>

            {/* Add / Edit Form */}
            <form onSubmit={handleAdd} className="mb-6">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Topic Name"
                        value={newTopic.name}
                        onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                        className="border p-2 rounded-md"
                        required
                    />

                    {/* Icon Preview */}
                    <div className="flex items-center">
                        <p className="mr-4">Selected Icon: {selectedIcon.icon}</p>
                        <select
                            className="border p-2 rounded-md"
                            onChange={handleSelectIcon}
                            value={iconOptions.findIndex(icon => icon.name === selectedIcon.name)}
                        >
                            {iconOptions.map((icon, index) => (
                                <option key={index} value={index}>
                                    {icon.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        {isEditing ? 'Update Topic' : 'Add Topic'}
                    </button>
                </div>
            </form>

            {/* List of Topics */}
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Icon</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {topics?.map((topic) => (
                        <tr key={topic.id} className="border-b">
                            <td className="p-2">{topic.id}</td>
                            <td className="p-2">{topic.name}</td>
                            <td className="p-2">{iconOptions.find(opt => opt.name === topic.iconClass)?.icon}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => handleEdit(topic)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(topic.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTopics;
