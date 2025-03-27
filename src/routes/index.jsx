import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Landing";
import Login from "../pages/Login.jsx";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Products from "../pages/Dashboard/DashboardProducts.jsx";
import ViewList from "../pages/Dashboard/DashnboardViewLists.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="products" element={<Products />} />
                    <Route path="lists" element={<ViewList />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
