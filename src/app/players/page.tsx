"use client";
import { Player } from "@/interfaces/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Players = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [totalPlayers, setTotalPlayers] = useState<number>(0);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getData = async () => {
        const response = await fetch(`${apiUrl}/player/`);
        const data = await response.json();
        setPlayers(data.data);
        setTotalPlayers(data.data.length);
    };

    useEffect(() => {
        getData();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");

    const handleOrder = (value: number) => {
        if (value < 3) {
            return "Opening Batsman";
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                        <div
                            key={player.id}
                            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
                        >
                            <Image
                                src={player.images[0]}
                                alt={player.name}
                                width={120}
                                height={120}
                                className="rounded-full object-cover mb-4"
                            />
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
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
                                    {player.bowlingType ?? "Not Specified"}{" "}
                                    {/* Fallback value */}
                                </p>
                                <p>
                                    <strong>Email:</strong> {player.email}
                                </p>
                                <p>
                                    <strong>Contact:</strong>{" "}
                                    {player.contactNumber}
                                </p>
                                <p className="mt-2">
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
