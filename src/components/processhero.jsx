import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

export default function ProcessHero() {
    const services = ['Product Design', 'Brand Identity', 'Web Development'];

    // Refs for animations
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    // Detect when they enter the viewport
    const leftInView = useInView(leftRef, { once: false, margin: "-20% 0px" });
    const rightInView = useInView(rightRef, { once: false, margin: "-20% 0px" });

    return (
        <div className="w-full text-white py-12">
            <div className="max-w-7xl mx-auto">
                <div className="relative">

                    {/* HERO SECTION */}
                    <div className="flex flex-col lg:flex-row lg:justify-between mb-0 md:mb-12">

                        {/* LEFT CONTENT — Slides from left */}
                        <motion.div
                            // ref={leftRef}
                            // initial={{ x: -80, opacity: 0 }}
                            // animate={{
                            //     x: leftInView ? 0 : -80,
                            //     opacity: leftInView ? 1 : 0
                            // }}
                            // transition={{ duration: 0.7, ease: "easeOut" }}
                            className="flex flex-col gap-6 w-full lg:max-w-[50%] mb-8 lg:mb-0"
                        >
                            <h1 className="text-4xl">
                                Product design for easy community access
                            </h1>

                            <p className="text-lg md:text-xl leading-relaxed">
                                Helping startups and brands to craft expressive and engaging
                                solutions for their software needs.
                            </p>

                            <div className="max-w-[230px]">
                                <img
                                    src="/assets/img/hiremeoncontra-light@2x (1).png"
                                    alt="Hire me on Contra"
                                    className="w-full h-auto"
                                    onError={(e) => e.target.src = "https://via.placeholder.com/230x60/1a1a1a/666?text=Hire+Me"}
                                />
                            </div>
                        </motion.div>

                        {/* SERVICES (Desktop Only) */}
                        <div className="hidden lg:flex absolute right-0 top-5 w-auto justify-center">
                            <div className="flex gap-6 xl:gap-8">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2.5 min-w-fit"
                                    >
                                        <p className="text-lg xl:text-xl whitespace-nowrap">
                                            {service}
                                        </p>
                                        <div className="bg-black h-[1px] w-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* IMAGE SECTION — Slides from right */}
                    <div className="relative flex justify-between mt-0 md:mt-12 lg:mt-16 h-[320px] md:h-[375px]">
                        {/* LEFT BOX */}
                        <motion.div
                            ref={leftRef}
                            initial={{ x: -80, opacity: 0 }}
                            animate={{
                                x: leftInView ? 0 : -80,
                                opacity: leftInView ? 1 : 0
                            }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="w-[45%] md:max-w-[500px] h-full rounded-[32px] hidden md:block md:rounded-[64px]"
                            style={{
                                background:
                                    "linear-gradient(234deg, rgb(210, 232, 200) 0%, rgb(180, 211, 165) 100%)",
                            }}
                        ></motion.div>

                        {/* RIGHT IMAGE BOX */}
                        <motion.div>
                            <div
                                className="absolute bottom-0 right-0 w-[100%] md:max-w-[650px] h-[320px] md:h-[515px] rounded-[32px] md:rounded-[64px] overflow-hidden p-6 pb-0 md:p-10 md:pb-0"
                                style={{
                                    background:
                                        "linear-gradient(234deg, rgb(210, 232, 200) 0%, rgb(180, 211, 165) 100%)",
                                }}
                            >
                                <div className="rounded-t-[20px] md:rounded-t-[30px] overflow-hidden h-full">
                                    <img
                                        src="/assets/img/i3.png"
                                        alt="Project showcase"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
