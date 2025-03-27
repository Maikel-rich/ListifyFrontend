import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index.jsx";
import React from "react";
import "./App.css"

createRoot(document.getElementById('root')).render(
    <BrowserRouter future={{ v7_startTransition: true }}>
        <AppRoutes />
    </BrowserRouter>
)
