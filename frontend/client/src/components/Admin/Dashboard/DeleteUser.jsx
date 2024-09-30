import { useState } from "react";
import { toast } from 'react-toastify';
import { useDeleteUser } from './hooks/useDeleteUser';
import api from '../../../api/axiosConfig';
import { useQuery } from "@tanstack/react-query";

const DeleteUsers = () => {
    const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();
    const [error, setError] = useState(null);

    // Fetch all users with the correct query structure
    const { data: users, isLoading } = useQuery({
        queryKey: ["users"], // query key should be passed like this now
        queryFn: async () => {
            const response = await api.get("/api/users/users");
            return response.data;
        },
    });

    // Handle delete user action with confirmation
    const handleDeleteUser = (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            deleteUser(userId, {
                onSuccess: () => {
                    toast.success(`User ${userId} deleted successfully`);
                },
                onError: (err) => {
                    const errorMessage = err.response?.data?.message || "Error deleting user";
                    setError(errorMessage);
                    toast.error(errorMessage);
                },
            });
        }
    };

    if (isLoading) {
        return <div>Loading users...</div>;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <ul className="mb-4">
                {users?.map((user) => (
                    <li key={user.id} className="flex justify-between items-center mb-2">
                        <span>{`${user.firstName} ${user.lastName} (${user.username})`}</span>
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={isDeleting}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteUsers;
