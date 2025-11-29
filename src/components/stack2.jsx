import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cardsData = [
    { bgColor: "#82c95e", color: "#0f151f", bgImg: "/assets/img/bg-1.jpg" },
    { bgColor: "#d48740", color: "#0f151f", bgImg: "/assets/img/bg-2.jpg" },
    { bgColor: "#ba8ad6", color: "#0f151f", bgImg: "/assets/img/bg-3.jpg" }
];

export default function ScrollingStackCards() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-5xl mx-auto px-4 space-y-20">
                {cardsData.map((card, index) => (
                    <StackCard key={index} index={index} card={card} />
                ))}
            </div>
        </div>
    );
}

function StackCard({ index, card }) {
    const ref = useRef(null);

    // Smoother scroll offsets 
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "start 40%"]
    });

    // GPU-friendly transforms
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

    return (
        <motion.div
            ref={ref}
            className="sticky top-20 pointer-events-none will-change-transform"
            style={{
                paddingTop: index * 50,
                scale,
                y,
                opacity,
                transformPerspective: 1000
            }}
        >
            <div
                className="rounded-3xl overflow-hidden shadow-xl relative pointer-events-auto"
                style={{ background: card.color }}
            >
                {/* Soft glow (NOT inside scroll transforms) */}
                <div
                    className="absolute inset-0 opacity-20 blur-2xl"
                    style={{
                        backgroundColor: card.bgColor,
                    }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col md:flex-row md:p-10 p-6 text-white z-10">
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h2 className="md:text-3xl text-2xl font-bold mb-6">
                                Modernizing a Subscription Management Platform
                            </h2>
                            <p className="md:text-lg text-base opacity-90 mb-8">
                                With user-centered approach, the goal was to create an intuitive
                                interface for effortless financial management while incorporating
                                gamification.
                            </p>
                        </div>
                        <button className="bg-white text-gray-900 px-8 py-3 rounded-full">
                            View case study
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-between mt-8 md:ml-8">
                        <div
                            className="rounded-xl mb-6 shadow-xl bg-cover bg-center md:h-[300px] h-[200px] bg-no-repeat"
                            style={{ backgroundImage: `url(${card.bgImg})` }}
                        />
                        <div className="flex gap-6">
                            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4">
                                <p className="text-sm opacity-70 mb-1">Engagement</p>
                                <p className="text-2xl font-bold">12 min</p>
                            </div>
                            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4">
                                <p className="text-sm opacity-70 mb-1">User Satisfaction</p>
                                <p className="text-2xl font-bold">4.5★</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
