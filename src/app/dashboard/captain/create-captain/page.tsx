"use client";
import Dashboard from "@/components/dashboard/dashboard";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
    const [data, setData] = useState({
        password: "",
        name: "",
        contactNumber: "",
        email: "",
    });
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [file, setFile] = useState<File | null>(null); // Handle single file upload

    const [error, setError] = useState("");

    const router = useRouter();

    // Handle input change for text fields
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Handle file input changes (single file upload)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (files && files.length > 0) {
            setFile(files[0]); // Only set the first file
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = {
            password: data.password,
            captain: {
                name: data.name,
                contactNumber: data.contactNumber,
                email: data.email,
            },
        };

        const formData = new FormData();

        // Append JSON data
        formData.append("data", JSON.stringify(value));

        // Append the single file
        if (file) {
            formData.append("file", file); // Ensure this matches the name in Multer
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const token = localStorage.getItem("accessToken");

            const response = await axios.post(
                `${apiUrl}/user/create-captain`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file uploads
                        Authorization: `${token}`, // Include the token here
                    },
                }
            );

            if (response.data.success === true) {
                toast.success("Successfully registered");
                router.push("/dashboard/captain");
            } else {
                toast.error("Failed to register");
            }
        } catch (err) {
            console.error("Error during signup:", err);
            setError("An error occurred during signup.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex">
                <div className="w-1/4">
                    <Dashboard />
                </div>
                <div className="w-3/4 ml-8 p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Create Captain</h1>
                    {error && (
                        <p className="text-red-500 font-medium">{error}</p>
                    )}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="contactNumber"
                            >
                                Contact Number
                            </label>
                            <input
                                type="text"
                                id="contactNumber"
                                name="contactNumber"
                                value={data.contactNumber}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="file"
                            >
                                Upload Captain's Image
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFileChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                accept="image/*"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
