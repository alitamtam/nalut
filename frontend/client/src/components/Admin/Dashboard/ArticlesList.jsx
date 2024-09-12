import { useEffect, useState } from 'react';
import api from '../../../api/axiosConfig';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await api.get('/api/articles');
            setArticles(response.data);
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Articles</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Author</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td className="border px-4 py-2">{article.title}</td>
                            <td className="border px-4 py-2">{article.author.username}</td>
                            <td className="border px-4 py-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArticlesList;
