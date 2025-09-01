import React from 'react';
import Sidebar from "@/components/layout/sidebar.jsx";
import Header from "@/components/layout/header.jsx";
import {Outlet} from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header/>

                {/* Page Content */}
                <main className="p-4 md:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;