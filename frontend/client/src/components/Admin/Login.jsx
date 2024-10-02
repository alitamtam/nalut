import { useState } from 'react';
import { useLogin } from './Dashboard/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { mutateAsync: login } = useLogin();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        await login({ username, password });
        navigate('/admin');

    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white p-8 shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-6">EduLibya Login</h2>
                <div>
                    <input
                        type="text" // Correct type for username
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="mb-4 w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mb-4 w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button onClick={handleSubmit} className="bg-blue-500 text-white w-full py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
