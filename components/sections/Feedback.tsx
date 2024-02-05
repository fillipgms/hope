import Image from "next/image";
import React from "react";

import profile from "@/public/images/profile.jpg";
import banner from "@/public/images/banner.jpg";

const Feedback = () => {
    return (
        <section className="pt-16 pb-16 px-6 ">
            <h2 className="font-medium text-2xl pb-4">Feedback</h2>
            <div className="grid lg:grid-cols-[300px,1fr] gap-4">
                <div className="border border-gray-300 rounded-2xl flex justify-center items-center p-6 lg:p-0 flex-col">
                    <Image
                        src={profile}
                        alt="profile picture"
                        className="rounded-full w-1/3"
                    />
                    <h4 className="text-lg font-medium">Cassia Mendes</h4>

                    <p className="max-w-[200px] text-gray-500 text-center">
                        &#34;Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.&#34;
                    </p>
                </div>
                <div
                    className="bg-cover h-[500px] rounded-2xl flex justify-center items-center bg-center"
                    style={{
                        backgroundImage: `url(${banner.src})`,
                    }}
                >
                    <div className="bg-[#ffffffab] min-w-[270px] sm:min-w-[300px] md:min-w-[500px] rounded-xl py-8 sm:px-8 px-2 grid place-items-center gap-3">
                        <h2 className="capitalize font-extrabold text-center text-2xl text-[#272727]">
                            Winter Feels <br /> A Melhor para sua pele
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;
