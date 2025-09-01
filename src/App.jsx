import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout.jsx";
import {Outlet} from "react-router-dom";

const App = () => {
    return (
            <>
                <DashboardLayout>
                    <Outlet/>
                </DashboardLayout>
            </>
    );
};

export default App;