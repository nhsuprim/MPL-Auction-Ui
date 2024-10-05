"use client";
import { Player } from "@/interfaces/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Players = () => {
    const [players, setPlayers] = useState<Player[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getData = async () => {
        try {
            const response = await fetch(`${apiUrl}/player/`);
            const data = await response.json();
            setPlayers(data.data);
        } catch (error) {
            console.error("Failed to fetch players:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleOrder = (value: number) => {
        if (value < 3) return "Opening Batsman";
        if (value >= 3 && value <= 5) return "Middle Order";
        return "Lower Order";
    };

    // Filter players based on the search query
    const filteredPlayers = players?.filter((player: any) => {
        const nameMatch = player.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const battingMatch = handleOrder(player.battingOrder)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const bowlingMatch = player.bowlingType
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return nameMatch || battingMatch || bowlingMatch;
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Players List
            </h1>

            <div className="mb-8 text-center">
                <input
                    type="text"
                    placeholder="Search by Name, Batsman, or Bowler"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPlayers?.length > 0 ? (
                        filteredPlayers?.map((player: any) => (
                            <div
                                key={player.id}
                                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 text-start"
                            >
                                <Image
                                    src={player.images[0]}
                                    alt={player.name}
                                    width={120}
                                    height={120}
                                    className="rounded-full mb-4 object-cover"
                                />
                                <h2 className="text-xl font-semibold mb-2">
                                    {player.name}
                                </h2>
                                <h1>Status: {player.auctionStatus}</h1>
                                <p className="text-gray-600">
                                    <strong>Address:</strong> {player.address}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Batsman:</strong>{" "}
                                    {handleOrder(player.battingOrder)}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Bowler:</strong>{" "}
                                    {player.bowlingType}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Email:</strong> {player.email}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Number:</strong>{" "}
                                    {player.contactNumber}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No players found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Players;
