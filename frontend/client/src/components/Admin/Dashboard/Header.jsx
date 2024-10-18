import { useSettingsStore } from "../../../store/useSettingsStore";

// src/components/Admin/Dashboard/Header.jsx
const Header = () => {

    const { user } = useSettingsStore();
    return (
        <header className="bg-sky-950 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg  border p-2">Admin Dashboard</h1>
            <div>
                {/* You can add links or user-related actions here */}
                <span className="text-base capitalize">{`Welcome ${user.username}`}</span>
            </div>
        </header>
    );
};

export default Header;
