"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import JSConfetti from "js-confetti";

const SuccessPage = () => {
    useEffect(() => {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            emojis: ["🎉", "🎊", "✨", "🎈", "🥳"],
        });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    🎉 অভিনন্দন! আপনার রেজিস্ট্রেশন সফল হয়েছে।
                </h1>
                <p className="text-gray-700">
                    ধন্যবাদ আপনার রেজিস্ট্রেশনের জন্য। আমরা আপনার সাথে শীঘ্রই
                    যোগাযোগ করবো।
                </p>
                <Link href="/">
                    <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                        হোমপেজে যান
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
