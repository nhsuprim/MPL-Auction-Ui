"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import JSConfetti from "js-confetti";

const Modal = ({ team, player, onClose, setLoading, loading }: any) => {
    const [value, setValue] = useState("");
    const jsConfetti = new JSConfetti();

    const handleSubmit = async () => {
        const data = {
            teamId: team?.id,
            auctionStatus: "SOLD",
            playerCost: Number(value),
        };

        if (!team) {
            toast.error("Please select a team");
            return;
        }

        // Start loading

        console.log("Auction Data:", data);
        console.log("player:", player.id);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const token = localStorage.getItem("accessToken");
            const id = player.id;

            const response = await axios.patch(
                `${apiUrl}/player/sold/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json", // JSON format for request
                        Authorization: `${token}`, // Include token as Bearer token
                    },
                }
            );

            if (response.data.success) {
                toast.success("Player successfully registered as sold.");
                jsConfetti.addConfetti();
                setLoading(!loading);
                onClose();
            } else {
                toast.error(response.data.success.message);
            }
        } catch (err: any) {
            console.error(
                "Error during submission:",
                err.response.data.message
            );
            toast.error(err.response.data.message);
        }
    };

    return (
        <dialog open className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Assigned Player</h3>
                <p className="py-4">
                    {player?.name} has been assigned to team {team?.name}.
                </p>
                <div className="py-2">
                    <label>Player Value: </label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <p>Team: {team?.name}</p>
                <div className="modal-action">
                    <button className="btn" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
