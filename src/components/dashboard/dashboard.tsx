import Link from "next/link";
import React from "react";

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <p className="text-2xl font-bold mb-6 text-gray-800">Dashboard</p>
            <div className="flex flex-col gap-6">
                <Link
                    href="/dashboard/captain"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition"
                >
                    Captain
                </Link>
                <Link
                    href="/dashboard/player"
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition"
                >
                    Player
                </Link>
                <Link
                    href="/dashboard/team"
                    className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-md shadow hover:bg-purple-600 transition"
                >
                    Team
                </Link>
                <Link
                    href="/dashboard/auction"
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition"
                >
                    Auction
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
