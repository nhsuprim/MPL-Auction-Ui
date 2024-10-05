"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
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
    const handleDelete = async (playerId: string) => {
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

    return (
        <div className="container min-h-screen mx-auto px-4">
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
                            <th className="border border-gray-300 px-4 py-2">
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
                            <tr key={player.id} className="hover:bg-gray-100">
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
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(player.id)}
                                        className="text-green-600 hover:text-green-800 font-semibold"
                                    >
                                        Confirm
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
    );
};

export default Page;
