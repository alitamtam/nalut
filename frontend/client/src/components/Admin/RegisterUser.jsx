// path: client/src/components/dashboard/RegisterUser.jsx
import { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Function to check password strength
    const checkPasswordStrength = (password) => {
        if (password.length < 6) return 'Too short';
        if (!/[A-Z]/.test(password)) return 'Must contain an uppercase letter';
        if (!/[a-z]/.test(password)) return 'Must contain a lowercase letter';
        if (!/[0-9]/.test(password)) return 'Must contain a number';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Must contain a special character';
        return 'Strong';
    };

    // Handle password change and update strength
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(checkPasswordStrength(newPassword));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/api/users/register', { username, password });
            setSuccess(response.data.message);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setPasswordStrength('');
        } catch (error) {
            setError(error.response?.data?.error || 'Error creating user');
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Register New User</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {passwordStrength && (
                        <div className={`mt-2 text-sm ${passwordStrength === 'Strong' ? 'text-green-500' : 'text-red-500'}`}>
                            {passwordStrength}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Register User
                </button>
            </form>
        </div>
    );
};

export default RegisterUser;