import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Products from "../pages/Dashboard/DashboardProducts.jsx";
import ViewList from "../pages/Dashboard/DashboardViewLists.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="products" element={<Products />} />
                <Route path="lists" element={<ViewList />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
