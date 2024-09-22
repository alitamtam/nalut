// Corrected DeleteUsers Component

import { useState } from "react";
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

    // Handle delete user action
    const handleDeleteUser = (userId) => {
        deleteUser(userId, {
            onSuccess: () => {
                console.log(`User ${userId} deleted successfully`);
            },
            onError: (err) => {
                setError(err.response?.data?.message || "Error deleting user");
            },
        });
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
                        <span>{`${user.first_name} ${user.last_name} (${user.username})`}</span>
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
