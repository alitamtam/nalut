import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PublicationForm = ({ onSubmit, initialData, onCancel, topics }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        topicId: initialData?.topicId || '',
        content: initialData?.content || '',
        image: null,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                topicId: initialData.topicId,
                content: initialData.content,
                image: null, // Reset the image field for editing
            });
        }
    }, [initialData]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    image: reader.result,
                }));
            };
            reader.onerror = (error) => {
                console.error('Error converting file to base64:', error);
            };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Topic</label>
                <select
                    name="topicId"
                    value={formData.topicId}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                >
                    <option value="">Select Topic</option>
                    {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                            {topic.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1">Content</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Upload Image</label>
                <input type="file" onChange={handleImageUpload} />
                {formData.image && (
                    <p className="mt-2 text-sm">Image ready for upload.</p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {initialData ? 'Update Publication' : 'Add Publication'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

PublicationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired,
};

export default PublicationForm;