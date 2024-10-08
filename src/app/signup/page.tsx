"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    const [data, setData] = useState({
        password: "",
        name: "",
        contactNumber: "",
        address: "",
        email: "",
        age: "",
        battingOrder: "",
        bowlingType: "NONE",
        transactionNumber: "",
        auctionStatus: "AVAILABLE",
    });

    const [files, setFiles] = useState<File[]>([]);

    const [error, setError] = useState("");

    // Handle input change for text fields
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Handle file input changes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (files) {
            // Convert FileList to an array
            const newFiles = Array.from(files);
            // Update state with existing images plus the new ones
            setFiles((prevImages) => [...prevImages, ...newFiles]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = {
            password: data.password,
            player: {
                name: data.name,
                contactNumber: data.contactNumber,
                email: data.email,
                address: data.address,
                age: Number(data.age), // Ensure age is a number
                battingOrder: Number(data.battingOrder), // Ensure battingOrder is a number
                bowlingType: data.bowlingType,
                transactionNumber: data.transactionNumber,
                auctionStatus: data.auctionStatus,
                // Removed images from here
            },
        };

        const formData = new FormData();

        // Append JSON data
        formData.append("data", JSON.stringify(value));

        // Append files
        files.forEach((file) => {
            formData.append("files", file);
        });

        console.log(formData);

        try {
            const response = await axios.post(
                "https://mpl-auction-production.up.railway.app/api/v1/user/create-player",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file uploads
                    },
                }
            );
            console.log("Response:", response.data);
            if (response.data.success === true) {
                toast.success("Successfully registered");
                window.location.href = "/login";
            }
        } catch (err) {
            console.error("Error during signup:", err);
            setError("An error occurred during signup.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center w-full bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-fit space-y-4"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Player Registration
                </h2>

                {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name (নাম)</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="md:flex md:gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Contact Number (মোবাইল নাম্বার)
                            </span>
                        </label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={data.contactNumber}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Age (বয়স)</span>
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={data.age}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Address (ঠিকানা)</span>
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="md:flex md:gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email (ইমেইল)</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Password (পাসওয়ার্ড)
                            </span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                <div className="md:flex justify-between items-center gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Batting Order (ব্যাটিং অর্ডার)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="battingOrder"
                            value={data.battingOrder}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Bowling Type (বোলিং টাইপ)
                            </span>
                        </label>
                        <select
                            name="bowlingType"
                            value={data.bowlingType}
                            onChange={handleChange}
                            required
                            className="select select-bordered w-full"
                        >
                            <option value="NONE">None</option>
                            <option value="FAST">Fast</option>
                            <option value="SPIN">Spin</option>
                            <option value="MEDIUM">Medium</option>
                        </select>
                    </div>
                </div>

                <div className="p-5 border border-gray-400 text-red-400 text-center font-semibold">
                    <h2> শুধু মাত্র বিকাশ প্রযোজ্য।</h2>
                    <h2>বিকাশ সেন্ড মানি করুন ০১৬৩৮৭৪৪১৫১</h2>
                    <h2>রেজিস্ট্রেশন ফীঃ ৫১০ টাকা</h2>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">
                            Transaction Number (বিকাশ-সেন্ডমানি করার পর আপনার
                            বিকাশ নাম্বার টি লিখুন){" "}
                        </span>
                    </label>
                    <input
                        type="text"
                        name="transactionNumber"
                        value={data.transactionNumber}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Image Uploaders */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">
                            Profile Picture
                        </span>
                    </label>
                    <input
                        type="file"
                        name="files"
                        required
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">
                            CricHeros Bating Profile (যদি থাকে)
                        </span>
                    </label>
                    <input
                        type="file"
                        name="files"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">
                            CricHeros Bowling Profile (যদি থাকে)
                        </span>
                    </label>
                    <input
                        type="file"
                        name="files"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                    />
                </div> */}

                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
