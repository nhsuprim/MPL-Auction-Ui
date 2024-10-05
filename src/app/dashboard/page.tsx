import Dashboard from "@/components/dashboard/dashboard";
import React from "react";

const page = () => {
    return (
        <div className=" min-h-screen bg-gray-100 p-4 ">
            <div className="flex ">
                <div className="w-1/4">
                    <Dashboard />
                </div>
                <div>
                    <h1 className="text-5xl">Welcome to Dashboard</h1>
                </div>
            </div>
        </div>
    );
};

export default page;
