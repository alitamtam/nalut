import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/authSlice'; // Assuming you have an auth slice

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-6">Admin Login</h2>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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
