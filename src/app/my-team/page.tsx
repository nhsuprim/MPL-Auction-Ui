"use client";
import { Team } from "@/interfaces/types";
import { getUserInfo } from "@/Server/auth.service";
import axios from "axios";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateTeamPage = () => {
    const [team, setTeam] = useState<Team[]>([]);
    const [captainData, setCaptainData] = useState<Team | null>(null); // More specific type
    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const user = getUserInfo();

    const getData = async () => {
        try {
            const response = await fetch(`${apiUrl}/team`);
            const data = await response.json();
            setTeam(data.data);

            const captainTeam = data.data.find(
                (d: any) => d.captain?.email === user.email
            );
            setCaptainData(captainTeam || null);
        } catch (error) {
            console.error("Error fetching team data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const [data, setData] = useState({
        name: "",
        balance: 2000,
    });

    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({ name: data.name, balance: data.balance })
        );
        if (file) {
            formData.append("file", file);
        }

        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `${apiUrl}/captain/create-team`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${token}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success("Team successfully created!");
                getData(); // Refresh the data after team creation
            } else {
                toast.error("Failed to create team.");
            }
        } catch (err) {
            console.error("Error during team creation:", err);
            setError("An error occurred during team creation.");
            toast.error("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    {captainData ? "Team Details" : "Create Your Team"}
                </h1>

                {captainData ? (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">
                            Captain:{" "}
                            <span className="text-gray-700 font-semibold ">
                                {captainData?.captain?.name}
                            </span>
                        </h2>
                        <p className="text-lg font-bold mb-2">
                            Team Name:{" "}
                            <span className="font-semibold text-gray-700">
                                {captainData.name}
                            </span>
                        </p>
                        <p className="text-lg font-bold mb-4 ">
                            Balance:{" "}
                            <span className="font-semibold text-red-500 ">
                                ${captainData.balance}
                            </span>
                        </p>

                        <h3 className="text-xl font-bold mb-3">
                            Players:{" "}
                            <span className="italic font-semibold  text-gray-600">
                                {captainData?.players.length} players
                            </span>
                        </h3>
                        <ul>
                            {captainData?.players?.map((player: any) => (
                                <li
                                    key={player.id}
                                    className="p-4 bg-gray-100 rounded-lg mb-3"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex justify-center items-center gap-4">
                                            <Image
                                                src={player.images[0]}
                                                alt=""
                                                width={50}
                                                height={50}
                                                className="rounded-lg shadow-lg"
                                            />

                                            <div>
                                                <span className="text-lg font-semibold text-gray-800">
                                                    {player.name}
                                                </span>
                                                <p className="text-gray-600 mt-1">
                                                    Contact:{" "}
                                                    {player.contactNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
                                                {player.playerCost} tk
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Team Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                placeholder="Enter team name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="file"
                            >
                                Upload Team Logo
                            </label>
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                className="w-full border border-gray-300 rounded py-2 px-3 text-gray-500 focus:outline-none"
                                accept="image/*"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs italic mb-4">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Team
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateTeamPage;
