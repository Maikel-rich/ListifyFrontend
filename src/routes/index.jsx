import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Landing from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import CreateList from "../pages/Dashboard/DashboardCreateList.jsx";
import Products from "../pages/Dashboard/DashboardProducts.jsx";
import ViewList from "../pages/Dashboard/DashboardViewLists.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import ListDetails from "../pages/dashboard/ListDetails.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="products" element={<Products />} />
                    <Route path="createList" element={<CreateList />} />
                    <Route path="lists" element={<ViewList />} />

                    <Route path="details/:id" element={<ListDetails />} />
                </Route>
            </Route>

            {/* Redirigir rutas no existentes */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;
