"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getUserInfo, storeUserInfo } from "@/Server/auth.service";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                "https://mpl-auction-production.up.railway.app/api/v1/auth/login",
                data
            );

            // console.log(token);
            // console.log("response", response.data);
            if (response.data.success === true) {
                const token = response?.data?.data?.accessToken;
                storeUserInfo({ accessToken: token });
                toast.success("Logged in successfully!");
                window.location.href = "/"; // Redirect to dashboard after successful login
            }
            // toast("Wow so easy!");
        } catch (error: any) {
            toast.error("Invalid Credentials");
        }
    };

    console.log(getUserInfo());

    return (
        <div className="flex min-h-screen justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-gray-600 text-xs">
                    Don't have an account?
                    <a
                        href="/signup"
                        className="text-blue-500 hover:text-blue-800"
                    >
                        {" "}
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
