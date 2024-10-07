import Image from "next/image";
import mplLogo from "../../../assets/images/MPL-12-Logo.png";
import Link from "next/link";
import "animate.css";

const Introduct = () => {
    return (
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg mx-auto text-gray-800">
            <div className="flex justify-center items-center gap-2 pb-6">
                <Image
                    src={mplLogo}
                    alt="MPL Logo"
                    width={120}
                    height={120}
                    className=""
                />
                <h1 className="text-center text-lg sm:text-xl lg:text-5xl font-bold text-gray-700">
                    MIRHAZIRBAG PREMIER LEAGUE SEASON - 12
                </h1>
            </div>

            <h1 className="animate__animated animate__flash animate__slow 2s animate__infinite text-center mb-6">
                <Link href="/signup">
                    <span className="text-white bg-gradient-to-r from-red-500 to-red-800 hover:from-red-400 hover:to-red-600 px-4 py-2 rounded-full text-lg font-semibold shadow-lg transition-all">
                        রেজিস্ট্রেশন করুন
                    </span>
                </Link>
            </h1>

            <p className="text-lg leading-relaxed mb-4 text-gray-700 text-justify">
                অতি আনন্দের সাথে জানানো যাচ্ছে যে, মিরহাজিরবাগ প্রিমিয়ার লীগ
                (MPL) এর দ্বাদশ সিজন শীঘ্রই শুরু হতে যাচ্ছে। এই বছর, আমাদের
                মধ্যে নতুন উদ্দীপনা নিয়ে প্রিয় খেলাটির জন্য প্রস্তুতি নিচ্ছি।
                আগামী ২৫শে অক্টোবর, প্রচলিত নিয়মানুযায়ী নিলামের মাধ্যমে আমাদের
                প্রতিভাবান খেলোয়াড়দের নিয়ে টিম গঠন করা হবে। এই আকর্ষণীয়
                নিলামটি সরাসরি লাইভ দেখানো হবে, যাতে সকল প্রিয় দর্শক ও
                খেলোয়াড়রা অংশগ্রহণ করতে পারেন।
            </p>

            <p className="text-lg leading-relaxed mb-4 text-gray-700">
                আমাদের এই টুর্নামেন্টে অংশগ্রহণ করবে ৬টি দল, যা আগামী সিজনটিকে
                আরও আকর্ষণীয় এবং প্রতিযোগিতামূলক করে তুলবে। দলগুলো দেখুন:{" "}
                <Link href="/team">
                    <span className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-full font-semibold transition-all">
                        দলগুলো
                    </span>
                </Link>
            </p>

            <p className="text-xl leading-relaxed text-red-500 font-semibold mb-4">
                আমাদের উদ্বোধনী খেলা অনুষ্ঠিত হবে আগামী ৮ই নভেম্বর, শুক্রবার, ইন
                শা আল্লাহ।
            </p>

            <p className="text-xl leading-relaxed text-red-500 font-semibold mb-4">
                ফর্ম সংগ্রহের শেষ দিন ২২শে অক্টোবর ২০২৪।
            </p>

            <p className="text-xl leading-relaxed text-red-500 font-semibold mb-6">
                এবারের ফর্ম-ফি নির্ধারণ করা হয়েছে ৫১০ টাকা (জার্সি সহকারে)।
            </p>

            <p className="font-semibold text-lg mb-4 text-gray-700">
                প্রতিটি ম্যাচের লাইভ আপডেট দেওয়া হবে{" "}
                <strong>CricHeros App</strong>-এ।
            </p>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
                ফর্ম সংগ্রহের জন্য ক্লিক করুন{" "}
                <Link href="/signup">
                    <span className="text-white bg-gradient-to-r from-red-500 to-red-800 hover:from-red-400 hover:to-red-600 px-4 py-1 rounded-full shadow-lg transition-all">
                        রেজিস্ট্রেশন
                    </span>
                </Link>
            </p>

            <p className="text-lg leading-relaxed text-gray-700 text-justify">
                বিঃদ্রঃ ফর্ম কিনে রেজিস্ট্রেশন করা ছাড়া নিলামে নাম উঠবে না এবং
                খেলায় অংশগ্রহণ করা যাবে না। আমাদের এই বিশেষ উদ্যোগে সহায়তা ও
                সমর্থন দেয়ার জন্য ধন্যবাদ। আসুন আমরা একসাথে একটি সুন্দর ও
                স্মরণীয় টুর্নামেন্ট আয়োজন করি।
            </p>
        </div>
    );
};

export default Introduct;
