"use client";
import { Player } from "@/interfaces/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Players = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [totalPlayers, setTotalPlayers] = useState<number>(0);
    const [loading, setLoading] = useState(true); // Add loading state
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getData = async () => {
        try {
            const response = await fetch(`${apiUrl}/player/`);
            const data = await response.json();
            setPlayers(data.data);
            setTotalPlayers(data.data.length);
        } catch (error) {
            console.error("Error fetching players:", error);
        } finally {
            setLoading(false); // Set loading to false when the data is fetched
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");

    const handleOrder = (value: number) => {
        if (value < 3) {
            return "Top Order";
        } else if (value >= 3 && value <= 5) {
            return "Middle Order";
        } else {
            return "Lower Order";
        }
    };

    // Filter players based on the search query
    const filteredPlayers = players.filter((player) => {
        const nameMatch = player.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const battingOrderValue = player.battingOrder ?? 0; // Default to 0
        const battingMatch = handleOrder(battingOrderValue)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const bowlingMatch = (player.bowlingType ?? "Not Specified")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const auctionStatusMatch = player.auctionStatus
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return nameMatch || battingMatch || bowlingMatch || auctionStatusMatch;
    });

    return (
        <div className="container min-h-screen mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                Players List
            </h1>
            <h2 className="text-lg text-center text-gray-600 mb-8">
                Total Registered Players: {totalPlayers}
            </h2>

            {/* Search Input */}
            <div className="mb-8 text-center">
                <input
                    type="text"
                    placeholder="Search by Name, Batsman, Bowler, or Auction Status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            {totalPlayers !== filteredPlayers.length && (
                <p className="text-center pb-8 text-xl font-semibold">
                    Total Count: {filteredPlayers.length}
                </p>
            )}

            {/* Players Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-fit mx-auto ">
                {loading ? (
                    // Show skeletons when loading
                    Array(8)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center animate-pulse"
                            >
                                <div className="w-32 h-32 bg-gray-300 rounded-lg mb-4"></div>
                                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                                <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
                                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            </div>
                        ))
                ) : filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                        <div
                            key={player.id}
                            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
                        >
                            <div className="relative w-[200px] h-[200px] mb-4">
                                <Image
                                    src={player.images[0]}
                                    alt={player.name}
                                    fill
                                    className="rounded-lg object-cover mb-4"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">
                                {player.name}
                            </h2>
                            <div className="mb-4 text-left text-gray-600">
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className="text-green-500">
                                        {player.auctionStatus}
                                    </span>
                                </p>
                                <p>
                                    <strong>Batsman:</strong>{" "}
                                    {handleOrder(player.battingOrder ?? 0)}
                                </p>
                                <p>
                                    <strong>Bowler:</strong>{" "}
                                    {player.bowlingType ?? "Not Specified"}
                                </p>
                                <p>
                                    <strong>Email:</strong> {player.email}
                                </p>
                                <p>
                                    <strong>Contact:</strong>{" "}
                                    {player.contactNumber}
                                </p>
                                <p className="mt-2 capitalize text-sm max-w-xs text-ellipsis break-all">
                                    <strong>Address:</strong> {player.address}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No players found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Players;
