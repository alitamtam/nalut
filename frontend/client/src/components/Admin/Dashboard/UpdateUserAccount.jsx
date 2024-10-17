import { useState, useEffect } from "react";
import { useUpdateUser } from "./hooks/useUpdateUser"; // Adjust the path if necessary
import { useGetUserById } from './hooks/useGetUserById'; // New hook to get user details by ID
import { useSettingsStore } from '../../../store/useSettingsStore'; // Adjust the path if necessary
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const UpdateUserAccount = () => {
    const { userId } = useParams(); // Get user ID from URL parameters
    const { user } = useSettingsStore(state => ({ user: state.user }));

    // Initialize state for user details
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updateUserMutation = useUpdateUser();
    const getUserById = useGetUserById(userId); // New hook to get user data

    // Fetch the user data on load
    useEffect(() => {
        if (userId) {
            getUserById.mutate(userId, {
                onSuccess: (data) => {
                    setFirstName(data.firstName || "");
                    setLastName(data.lastName || "");
                    setUsername(data.username || "");
                    setEmail(data.email || "");
                },
                onError: (error) => {
                    toast.error(`Error fetching user details: ${error.message}`);
                }
            });
        }
    }, [userId, getUserById]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            toast.error("New password and confirmation do not match.");
            return;
        }

        // Create FormData object to send only updated fields
        const formData = {
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            username: username || undefined,
            email: email || undefined,
            oldPassword: oldPassword || undefined,
            newPassword: newPassword || undefined,
        };

        updateUserMutation.mutate(
            {
                id: user.id, // Using id from URL
                formData, // Send formData object
            },
            {
                onSuccess: () => {
                    toast.success("User updated successfully!");
                },
                onError: (error) => {
                    toast.error(`Error updating user: ${error.message}`);
                },
            }
        );
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update User Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                    />
                </div>

                {/* Password Update Section */}
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={updateUserMutation.isLoading}
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
                >
                    {updateUserMutation.isLoading ? "Updating..." : "Update User"}
                </button>
                {updateUserMutation.isError && (
                    <p className="text-red-500 mt-2">
                        {updateUserMutation.error?.message || "Error updating user."}
                    </p>
                )}
            </form>
        </div>
    );
};

export default UpdateUserAccount;
