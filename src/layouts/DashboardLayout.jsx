import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div>
            <nav>
                <Link to="/dashboard">Home</Link>
                <Link to="/dashboard/settings">Settings</Link>
                <Link to="/dashboard/profile">Profile</Link>
            </nav>
            <main>
                <Outlet /> {/* Aquí se renderizan las subrutas */}
            </main>
        </div>
    );
};

export default DashboardLayout;
