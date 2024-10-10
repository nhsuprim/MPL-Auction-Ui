"use client";
import Dashboard from "@/components/dashboard/dashboard";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const page = () => {
    const [team, setTeam] = useState([]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getData = async () => {
        const response = await fetch(`${apiUrl}/team`);
        const data = await response.json();
        setTeam(data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        try {
            const response = await axios.delete(
                `${apiUrl}/admin/delete-team/${id}`,
                {
                    headers: {
                        Authorization: `${token}`, // Attach the token to the request
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Team deleted successfully");
                getData(); // Refresh the data after successful deletion
            } else {
                toast.error("Failed to delete the team");
            }
        } catch (error) {
            console.error("Error deleting team:", error);
            toast.error("Error deleting the team");
        }
    };

    const handlePlayerDelete = async (id: string) => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        try {
            const response = await axios.patch(
                `${apiUrl}/player/remove/${id}`,
                {},
                {
                    headers: {
                        Authorization: `${token}`, // Attach the token to the request
                    },
                }
            );

            if (response.status === 200) {
                toast.success("player deleted successfully");
                getData(); // Refresh the data after successful deletion
            } else {
                toast.error("Failed to delete the player");
            }
        } catch (error) {
            console.error("Error deleting player:", error);
            toast.error("Error deleting the player");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex">
                <div className="w-1/4">
                    <Dashboard />
                </div>
                <div className="w-3/4 ml-8 p-6 bg-white rounded-lg shadow-md">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold text-center mb-8">
                            Team Page
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {team.map((team: any) => (
                                <div
                                    key={team.id}
                                    className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <Image
                                                width={50}
                                                height={50}
                                                src={team.image}
                                                alt={team.name}
                                                className="rounded-full mr-4 object-cover relative"
                                            />
                                            <h2 className="text-xl font-semibold">
                                                {team.name}
                                            </h2>
                                        </div>
                                        <p
                                            onClick={() =>
                                                handleDelete(team.id)
                                            }
                                            className="text-right text-3xl text-red-500 cursor-pointer"
                                        >
                                            <MdDelete />
                                        </p>
                                    </div>

                                    <h3 className="text-lg font-medium text-gray-700">
                                        Captain: {team?.captain?.name}
                                    </h3>
                                    <h3 className="text-lg font-medium text-red-500">
                                        Balance: {team?.balance}
                                    </h3>

                                    <p className="mt-4 text-gray-600 font-medium">
                                        Team Players:{" "}
                                        <span className="italic text-gray-600">
                                            {team?.players.length}
                                        </span>
                                    </p>
                                    <ul className="mt-2 space-y-4">
                                        {team?.players?.map((player: any) => (
                                            <li
                                                key={player.id}
                                                className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-gray-800">
                                                            {player.name}
                                                        </h4>
                                                    </div>
                                                    <div>
                                                        <p
                                                            onClick={() =>
                                                                handlePlayerDelete(
                                                                    player.id
                                                                )
                                                            }
                                                            className="text-right text-3xl font-bold text-red-500 cursor-pointer"
                                                        >
                                                            <IoClose />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <span className="bg-green-200 text-green-800 font-bold p-1 rounded-full text-md">
                                                        value: $
                                                        {player.playerCost}
                                                    </span>
                                                    <p className="text-gray-600 font-semibold">
                                                        Contact:{" "}
                                                        {player.contactNumber}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
