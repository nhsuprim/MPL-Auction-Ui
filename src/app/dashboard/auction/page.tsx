"use client";
import Confetti from "@/components/Animation/Animation";
import Dashboard from "@/components/dashboard/dashboard";
import Modal from "@/components/Modal/modal";
import { Player, Team } from "@/interfaces/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Define an interface for assigned details
interface AssignedDetails {
    player: Player | null; // Player can be a Player object or null
    team: Team | null | undefined; // Team can be a Team object, null, or undefined
}

const Page = () => {
    const [players, setPlayers] = useState<Player[]>([]); // Initialize players as an array
    const [team, setTeam] = useState<Team[]>([]); // Initialize team as an array
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Keep track of current player
    const [selectedTeam, setSelectedTeam] = useState(""); // Track selected team
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [assignedDetails, setAssignedDetails] =
        useState<AssignedDetails | null>(null); // Store assigned details
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);

    // Function to shuffle the players array randomly
    const shuffleArray = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // Fetch the team and player data
    const getData = async () => {
        const teamResponse = await fetch(`${apiUrl}/team`);
        const teamdata = await teamResponse.json();
        setTeam(teamdata.data);

        const response = await fetch(`${apiUrl}/player/`);
        const playerData = await response.json();
        const filteredPlayers = playerData.data.filter(
            (p: any) => p.auctionStatus === "AVAILABLE"
        );
        console.log(filteredPlayers);
        const shuffledPlayers = shuffleArray(filteredPlayers);
        setPlayers(shuffledPlayers);
    };

    useEffect(() => {
        getData();
    }, [loading]);

    const handleSkip = () => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeam(e.target.value);
    };

    const handleAssignPlayer = () => {
        const selectedPlayer = players[currentPlayerIndex];
        const selectedTeamDetails =
            team.find((t: Team) => t.name === selectedTeam) || null; // Default to null if not found
        console.log("Player Details:", selectedPlayer);
        console.log("Team Details:", selectedTeamDetails);

        // Store assigned details to pass to modal
        setAssignedDetails({
            player: selectedPlayer,
            team: selectedTeamDetails,
        });

        // Open modal
        setIsModalOpen(true);

        // Reset selected team after assigning player
        setSelectedTeam("");
    };

    const handleOrder = (value: number) => {
        if (value < 3) {
            return "Opening Batsman";
        } else if (value >= 3 && value <= 5) {
            return "Middle Order";
        } else {
            return "Lower Order";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex">
                <div className="w-1/4">
                    <Dashboard />
                    <Confetti />
                </div>
                <div className="w-3/4 ml-8 p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">MPL Auction</h1>

                    {players.length > 0 && (
                        <div>
                            {/* Display current player */}
                            <div className="flex gap-12 items-center mb-6">
                                <div className="relative w-[300px] h-[300px]">
                                    <Image
                                        src={
                                            players[currentPlayerIndex]
                                                ?.images[0]
                                        }
                                        alt=""
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>

                                <div className="ml-8">
                                    <h2 className="text-5xl mb-8 font-bold capitalize">
                                        {players[currentPlayerIndex]?.name}
                                    </h2>
                                    <div className="pt-8 text-xl">
                                        <p>
                                            <span className="text-gray-700 font-semibold">
                                                Age:{" "}
                                            </span>
                                            {players[currentPlayerIndex]?.age}
                                        </p>
                                        <p>
                                            <span className="text-gray-700 font-semibold">
                                                Batsman:{" "}
                                            </span>
                                            {handleOrder(
                                                players[currentPlayerIndex]
                                                    ?.battingOrder ?? 0
                                            )}{" "}
                                            {/* Default to 0 */}
                                        </p>
                                        <p>
                                            <span className="text-gray-700 font-semibold">
                                                Bowling:{" "}
                                            </span>
                                            {
                                                players[currentPlayerIndex]
                                                    ?.bowlingType
                                            }
                                        </p>
                                        <p className="pt-2 capitalize">
                                            <span className="text-gray-700 font-semibold capitalize">
                                                Address:{" "}
                                            </span>
                                            {
                                                players[currentPlayerIndex]
                                                    ?.address
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Team selection dropdown */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Select Team:
                                </label>
                                <select
                                    value={selectedTeam}
                                    onChange={handleTeamChange}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Choose a team</option>
                                    {team.map((t) => (
                                        <option key={t.id} value={t.name}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Assign player to team button */}
                            <div className="flex justify-between">
                                <button
                                    onClick={handleAssignPlayer}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                                >
                                    Sold Player
                                </button>

                                {/* Skip button to move to the next player */}
                                <button
                                    onClick={handleSkip}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-8"
                                >
                                    Skip
                                </button>
                            </div>
                        </div>
                    )}

                    {/* If no players are available */}
                    {players.length === 0 && <p>Loading players...</p>}

                    {/* Modal to show assigned player and team */}
                    {isModalOpen && (
                        <Modal
                            team={assignedDetails?.team}
                            player={assignedDetails?.player}
                            setLoading={setLoading}
                            loading={loading}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
