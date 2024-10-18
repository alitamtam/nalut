import { useState, useEffect } from "react";
import { useUpdateUser } from "./hooks/useUpdateUser"; // Adjust the path if necessary
import { useGetUserById } from './hooks/useGetUserById'; // Hook to get user details by ID
import { useSettingsStore } from '../../../store/useSettingsStore'; // Adjust the path if necessary
import toast, { Toaster } from 'react-hot-toast'; // Imported toast and Toaster

const UpdateUserAccount = () => {
    const { user } = useSettingsStore(state => ({ user: state.user }));
    const { data: userData, isLoading, isError, error } = useGetUserById(user.id); // Fetch user data by ID
    const updateUserMutation = useUpdateUser(); // Hook to update user data

    // State for user details
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Fetch user data when component loads
    useEffect(() => {
        if (userData) {
            setFirstName(userData.firstName || "");
            setLastName(userData.lastName || "");
            setUsername(userData.username || "");
            setEmail(userData.email || "");
        }
    }, [userData]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            toast.error("New password and confirmation do not match.");
            return;
        }

        // Prepare form data for updating user
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
                id: user.id, // Use userId from the URL
                formData,
            },
            {
                onSuccess: () => {
                    console.log("User updated successfully!"); // Debugging
                    toast.success("User updated successfully!");
                },
                onError: (error) => {
                    toast.error(`Error updating user: ${error.message}`);
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Loading member ...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-full text-red-500">
                <p>Error fetching member: {error.message}</p>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-md mx-auto p-6 rounded-lg ">
                <h2 className="text-2xl font-semibold mb-4">Update {user.username} Account</h2>
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-sky-900"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-sky-900"
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-sky-900"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-sky-900"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-sky-900"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updateUserMutation.isLoading}
                        className="w-full bg-sky-900 text-white font-button py-2 rounded-none hover:bg-blue-600 transition"
                    >
                        {updateUserMutation.isLoading ? "Updating..." : "Update User"}
                    </button>

                    {updateUserMutation.isError && (
                        <p className="text-red-500 mt-2">
                            {updateUserMutation.error?.message || "Error updating user."}
                        </p>
                    )}
                </form>

                {/* Add Toaster component for displaying toast notifications */}
                <Toaster position="top-center" reverseOrder={false} gutter={24} />
            </div>
        </>
    );
};

export default UpdateUserAccount;
