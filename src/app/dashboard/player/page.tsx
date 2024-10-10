"use client";
import Dashboard from "@/components/dashboard/dashboard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
    const [players, setPlayers] = useState([]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getData = async () => {
        const response = await fetch(`${apiUrl}/admin/request-player`);
        const data = await response.json();
        setPlayers(data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    // Delete player by ID
    const handleConfirm = async (playerId: string) => {
        console.log(playerId);

        const token = localStorage.getItem("accessToken");

        if (!token) {
            console.error("No token found, unable to proceed with deletion.");
            return;
        }

        try {
            const response = await fetch(
                `${apiUrl}/admin/confirm-player/${playerId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                toast.success("Player successfully confirmed.");
                getData();
            }
        } catch (error) {
            toast.error("Error confirming the player");
        }
    };

    const handleDelete = async (playerId: string) => {
        console.log(playerId);

        const token = localStorage.getItem("accessToken");

        if (!token) {
            console.error("No token found, unable to proceed with deletion.");
            return;
        }

        try {
            const response = await fetch(
                `${apiUrl}/admin/delete-player/${playerId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                toast.success("Player successfully deleted.");
                getData();
            }
        } catch (error) {
            toast.error("Error Deleting the player");
        }
    };

    return (
        <div className=" min-h-screen bg-gray-100 p-4 ">
            <div className="flex ">
                <div className="w-1/4">
                    <Dashboard />
                </div>
                <div className="w-3/4 ml-8 p-6 bg-white rounded-lg shadow-md">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold text-center my-8">
                            Players List
                        </h1>

                        {/* Make table container scrollable on smaller screens */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">
                                            Image
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 ">
                                            Name
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Number
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Bkash
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {players.map((player: any) => (
                                        <tr
                                            key={player.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="border border-gray-300 px-4 py-2">
                                                <Image
                                                    src={player.images[0]}
                                                    alt={player.name}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full"
                                                />
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {player.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {player.contactNumber}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {player.transactionNumber}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center uppercase">
                                                <button
                                                    onClick={() =>
                                                        handleConfirm(player.id)
                                                    }
                                                    className="text-green-600 hover:text-green-800 bg-green-400 py-1 px-2 rounded-full font-bold mr-2"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(player.id)
                                                    }
                                                    className="text-red-600 hover:text-red-800 bg-red-400 py-1 px-2 rounded-full font-bold"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Responsive message when no players are found */}
                        {players.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">
                                No players found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
