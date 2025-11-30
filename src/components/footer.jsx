import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
    const [isHovered, setIsHovered] = useState(false);

    const socialLinks = [
        { name: "LinkedIn", icon: "linkedin", url: "#" },
        { name: "Twitter", icon: "x-twitter", url: "#" },
        { name: "Dribbble", icon: "dribbble", url: "#" },
        { name: "Behance", icon: "behance", url: "#" },
    ];

    const images = [
        "assets/img/i1.png",
        "assets/img/i2.png",
        "assets/img/i3.png",
    ];

    // handlers include touch support for mobile
    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    return (
        <div className="w-full">
            <div
                className="p-5 md:p-8 relative overflow-hidden"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onTouchStart={handleEnter}
                onTouchEnd={handleLeave}
            >
                <div className="flex flex-col gap-10 relative z-10 items-center">
                    {/* Animated Image Container */}
                    <div className="relative  w-full max-w-5xl  rounded-[36px] md:rounded-full overflow-hidden">

                        {/* animated columns (lowest layer) */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 flex justify-between gap-4 ">
                                <AnimatedColumn images={images} direction="up" isAnimating={isHovered} />
                                <AnimatedColumn images={images} direction="down" isAnimating={isHovered} />
                                <AnimatedColumn images={images} direction="up" isAnimating={isHovered} />
                            </div>
                        </div>
------------
                        {/* BLACK OVERLAY — FIXED */}
                        <div
                            className={`absolute inset-0 z-20 transition-opacity duration-700 ${isHovered ? "opacity-0" : ""
                                } bg-[#343739]`}
                        />

                        {/* CONTENT (top) */}
                        <div className="relative z-30 flex items-center justify-center py-30 px-4">
                            <div className="flex flex-col gap-5 items-center text-white text-center">
                                <div className="flex gap-2.5 items-center">
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-sm">Goran Babarogic - Framer Expert</p>
                                </div>

                                <p className="text-4xl md:text-5xl font-bold leading-tight">
                                    Upgrade your web presence with Framer
                                </p>

                                <div className="max-w-[230px]">
                                    <img
                                        src="/assets/img/hiremeoncontra-light@2x (1).png"
                                        alt="Hire me on Contra"
                                        className="w-full h-auto"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/230x60/1a1a1a/666?text=Hire+Me';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Social Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-2 text-white text-xl w-full max-w-6xl">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className="flex items-center justify-between p-4 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer"
                                aria-label={link.name}
                            >
                                <div className="flex items-center gap-2.5">
                                    <i className={`fa-brands fa-${link.icon}`}></i>
                                    <p>{link.name}</p>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#FFFFFF"
                                    className="transform group-hover:translate-x-1 transition-transform"
                                >
                                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                                </svg>
                            </a>
                        ))}
                    </div>

                    <p className="text-white text-center mt-8">
                        Nicey © 2025. Designed by JellyLabs
                    </p>
                </div>
            </div>

            {/* Font Awesome CDN */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
        </div>
    );
}

function AnimatedColumn({ images, direction = "up", isAnimating = false }) {
    // Duplicate images so the column can loop seamlessly
    const duplicatedImages = [...images, ...images, ...images];

    // heights used to compute a sensible translate distance (matches img height + gap)
    const imgHeightPx = 256; // matches h-64 Tailwind class
    const gapPx = 16; // approx for gap-4
    const singleSetHeight = images.length * (imgHeightPx + gapPx);

    // motion variants
    const animateProps = isAnimating
        ? {
            y: direction === "up" ? [-singleSetHeight, 0] : [0, -singleSetHeight],
        }
        : { y: 0 };

    return (
        <div className="flex-1 overflow-hidden relative h-full">
            <motion.div
                className="flex flex-col gap-4"
                animate={animateProps}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicatedImages.map((src, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                ))}
            </motion.div>
        </div>
    );
}
