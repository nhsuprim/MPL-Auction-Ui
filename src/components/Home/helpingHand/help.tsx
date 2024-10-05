import Image from "next/image";
import React from "react";
import suprim from "../../../assets/images/suprim.jpg";
import saiful from "../../../assets/images/saiful.jpg";
import juwel from "../../../assets/images/juwel.jpg";
import sohag from "../../../assets/images/sohag.jpeg";
import miko from "../../../assets/images/miko.jpg";
import limon from "../../../assets/images/limon.jpg";
import tarif from "../../../assets/images/tarif.jpg";
import ujjal from "../../../assets/images/ujjal.jpg";
import mithun from "../../../assets/images/mithun.jpg";
import tusan from "../../../assets/images/tusan.jpg";

const Help = () => {
    return (
        <div className="text-center py-10">
            <h1 className="text-5xl text-blue-400 mb-8">সার্বিক সহযোগিতায়</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-center">
                {/* Suprim */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={suprim}
                            alt="Suprim"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Suprim</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={sohag}
                            alt="sohag"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Shohag</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={miko}
                            alt="miko"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Miko</p>
                </div>
                {/* Saiful */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={saiful}
                            alt="Saiful"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Saiful</p>
                </div>

                {/* Juwel */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={juwel}
                            alt="Juwel"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Juwel</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={limon}
                            alt="limon"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Limon</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={ujjal}
                            alt="ujjal"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Ujjal</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={tarif}
                            alt="tarif"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Tarif</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={mithun}
                            alt="mithun"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Mithun</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="relative w-[200px] h-[200px]">
                        <Image
                            src={tusan}
                            alt="tusan"
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Tusan</p>
                </div>
            </div>
        </div>
    );
};

export default Help;
