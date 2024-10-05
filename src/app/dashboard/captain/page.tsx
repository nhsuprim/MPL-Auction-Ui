"use client";
import React, { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/dashboard";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const page = () => {
    const [captains, setCaptains] = useState([]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getData = async () => {
        const response = await fetch(`${apiUrl}/captain`);
        const data = await response.json();
        console.log(data.data);
        setCaptains(data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        try {
            const response = await axios.delete(
                `${apiUrl}/admin/delete-captain/${id}`,
                {
                    headers: {
                        Authorization: `${token}`, // Attach the token to the request
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Captain deleted successfully");
                getData(); // Refresh the data after successful deletion
            } else {
                toast.error("Failed to delete the captain");
            }
        } catch (error) {
            console.error("Error deleting captain:", error);
            toast.error("Error deleting the captain");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex">
                <div className="w-1/4">
                    <Dashboard />
                </div>
                <div className="w-3/4 ml-8 p-6 bg-white rounded-lg shadow-md">
                    <Link href="/dashboard/captain/create-captain">
                        <button className="btn btn-primary mb-4">
                            Create Captain
                        </button>
                    </Link>
                    <h1 className="text-2xl font-semibold mb-4">
                        Captain List
                    </h1>
                    <div className="space-y-4">
                        {captains.map((captain: any) => (
                            <div
                                key={captain.id}
                                className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 flex justify-between"
                            >
                                <div className="flex justify-center items-center gap-4">
                                    <Image
                                        className="rounded-full"
                                        src={captain.image}
                                        alt={captain.name}
                                        width={50}
                                        height={50}
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {captain.name}{" "}
                                            <span className="text-gray-500">
                                                ({captain?.team?.name})
                                            </span>
                                        </h2>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDelete(captain.id)}
                                        className="btn btn-danger mt-2 bg-red-300 text-red-700 px-2 pt-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
