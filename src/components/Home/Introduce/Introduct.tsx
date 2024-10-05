import Image from "next/image";
import mplLogo from "../../../assets/images/MPL-12-Logo.png";
import Link from "next/link";
import "animate.css";

const Introduct = () => {
    return (
        <div className="text-justify pb-8">
            <div className="flex justify-center items-center">
                <Image src={mplLogo} alt="" width={100} height={100} />
                <h1 className="text-center text-xl sm:text-2xl lg:text-5xl  py-4 font-bold">
                    MIRHAZIRBAG PREMIER LEAGUE SEASON - 12
                </h1>
            </div>
            <h1 className="animate__animated animate__flash animate__slow	2s animate__infinite infinite text-center pb-8">
                <Link href="/signup">
                    <span className="text-red-800 bg-red-300 px-2 py-1 rounded-lg">
                        রেজিস্ট্রেশান করুন
                    </span>
                </Link>
            </h1>
            <p className="text-2xl leading-relaxed">
                অতি আনন্দের সাথে জানানো যাচ্ছে যে, মিরহাজিরবাগ প্রিমিয়ার লীগ
                (MPL) এর দ্বাদশ সিজন শীঘ্রই শুরু হতে যাচ্ছে। এই বছর, আমাদের
                মধ্যে নতুন উদ্দীপনা নিয়ে প্রিয় খেলাটির জন্য প্রস্তুতি নিচ্ছি।
                আগামী ২৫শে অক্টোবর, প্রচলিত নিয়মানুযায়ী নিলামের মাধ্যমে আমাদের
                প্রতিভাবান খেলোয়াড়দের নিয়ে টিম গঠন করা হবে। এই আকর্ষণীয়
                নিলামটি সরাসরি লাইভ দেখানো হবে, যাতে সকল প্রিয় দর্শক ও
                খেলোয়াড়রা অংশগ্রহণ করতে পারেন।
            </p>
            <p className="text-2xl leading-relaxed">
                আমাদের এই টুর্নামেন্টে অংশগ্রহণ করবে ৬টি দল, যা আগামী সিজনটিকে
                আরও আকর্ষণীয় এবং প্রতিযোগিতামূলক করে তুলবে। আমাদের দলগুলো হল:{" "}
                <Link href="/team">
                    <span className="text-red-800 bg-red-300 px-2 py-1 rounded-lg">
                        দলগুলো
                    </span>
                </Link>
            </p>

            <p className="text-2xl leading-relaxed pt-4">
                আমাদের উদ্বোধনী খেলা অনুষ্ঠিত হবে আগামী ৫ই নভেম্বর, শুক্রবার, ইন
                শা আল্লাহ। প্রতি শুক্রবার এই টুর্নামেন্টে উত্তেজনাপূর্ণ খেলা
                অনুষ্ঠিত হবে। যারা MPL-12 টুর্নামেন্টে অংশগ্রহণ করতে আগ্রহী,
                তাদেরকে ফর্ম সংগ্রহ করে রেজিস্ট্রেশন করার জন্য আন্তরিকভাবে
                অনুরোধ জানানো হচ্ছে।
            </p>
            <p className="text-2xl leading-relaxed pt-2">
                ফর্ম সংগ্রহের শেষ দিন ২২শে অক্টোবর ২০২৪। এবারের ফর্ম-ফি নির্ধারণ
                করা হয়েছে ৫১০ টাকা (জার্সি সহকারে)। প্রতিটি ম্যাচের লাইভ আপডেট
                দেওয়া হবে <strong>CricHeros App</strong>-এ।
            </p>
            <p className="text-2xl leading-relaxed">
                ফর্ম সংগ্রহের জন্য ক্লিক করুন{" "}
                <Link href="/signup">
                    <span className="text-red-800 bg-red-300 px-2 py-1 rounded-lg">
                        রেজিস্ট্রেশান
                    </span>
                </Link>
            </p>

            <p className="text-2xl leading-relaxed">
                ফর্ম কিনে রেজিস্ট্রেশন করা ছাড়া নিলামে নাম উঠবে না এবং খেলায়
                অংশগ্রহণ করা যাবে না। আমাদের এই বিশেষ উদ্যোগে সহায়তা ও সমর্থন
                দেয়ার জন্য ধন্যবাদ। আসুন আমরা একসাথে একটি সুন্দর ও স্মরণীয়
                টুর্নামেন্ট আয়োজন করি।
            </p>
        </div>
    );
};

export default Introduct;
