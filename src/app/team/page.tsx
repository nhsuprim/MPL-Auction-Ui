"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getData = async () => {
        try {
            const response = await fetch(`${apiUrl}/team`);
            const data = await response.json();
            setTeam(data.data);
        } catch (error) {
            console.error("Error fetching team data:", error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container min-h-screen mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Team Page</h1>

            {/* Show loading spinner or message */}
            {loading ? (
                <div className="text-center">
                    <span className="loading loading-spinner w-8 h-8"></span>
                    <p>Loading teams...</p>
                </div>
            ) : (
                <>
                    {/* Show "No team found" if team array is empty */}
                    {team.length === 0 ? (
                        <div className="text-center">
                            <p className="text-lg text-gray-500">
                                No team found.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {team.map((team: any) => (
                                <div
                                    key={team.id}
                                    className="bg-white shadow-md rounded-lg p-6 border border-gray-200 w-full"
                                >
                                    <div className="flex items-center mb-4">
                                        <Image
                                            width={50}
                                            height={50}
                                            src={team.image}
                                            alt={team.name}
                                            className="rounded-full mr-4"
                                        />
                                        <h2 className="text-xl font-semibold">
                                            {team.name}
                                        </h2>
                                    </div>

                                    <h3 className="text-lg font-medium text-gray-700">
                                        Captain: {team?.captain?.name}
                                    </h3>
                                    <h3 className="text-lg font-medium text-red-500">
                                        Balance: {team?.balance}
                                    </h3>

                                    <p className="mt-4 text-gray-600 font-medium">
                                        Team Players:{" "}
                                        <span className="text-gray-600 italic">
                                            {team?.players.length} players
                                        </span>
                                    </p>
                                    <ul className="mt-2 space-y-4">
                                        {team?.players?.map((player: any) => (
                                            <li
                                                key={player.id}
                                                className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-semibold text-gray-800">
                                                        {player.name}
                                                    </h4>
                                                    <span className="text-sm bg-green-200 text-green-800 font-bold py-1 px-2 rounded-full">
                                                        ${player.playerCost}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mt-2">
                                                    Contact:{" "}
                                                    {player.contactNumber}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Page;
