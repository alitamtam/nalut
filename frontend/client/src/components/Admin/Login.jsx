import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/authSlice'; // Assuming you have an auth slice
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser({ username, password })); // line 14 in login.jsx
        if (loginUser.fulfilled.match(resultAction)) {
            navigate('/admin'); // Navigate to admin dashboard on successful login
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-6">Admin Login</h2>
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
                <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
