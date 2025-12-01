import LogoLoop from "./logoloop";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
export default function Hero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="flex flex-col items-center w-full h-full md:min-h-screen px-6 py-10 text-white">
            {/* Navbar */}
            <div className="flex justify-between items-center w-full max-w-[1140px]">
                <nav>
                    <ul className="hidden md:flex gap-6 text-gray-300 font-medium text-sm">
                        <li className="hover:text-white transition"><a href="#">Home</a></li>
                        <li className="hover:text-white transition"><a href="#">Work</a></li>
                        <li className="hover:text-white transition"><a href="#">Experience</a></li>
                        <li className="hover:text-white transition"><a href="#">Blog</a></li>
                        <li className="hover:text-white transition"><a href="#">FQA</a></li>
                    </ul>
                </nav>

                <div className="flex items-center justify-between w-full gap-4">
                    {/* <div>
                        <button className="bg-black text-white font-medium text-base px-6 py-3 rounded-full relative z-[2]">Contact</button>
                    </div> */}
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white z-50 relative"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden"
                    >
                        <ul className="flex flex-col gap-8 text-center text-2xl font-medium text-gray-300">
                            <li className="hover:text-white transition"><a href="#" onClick={toggleMenu}>Home</a></li>
                            <li className="hover:text-white transition"><a href="#" onClick={toggleMenu}>Work</a></li>
                            <li className="hover:text-white transition"><a href="#" onClick={toggleMenu}>Experience</a></li>
                            <li className="hover:text-white transition"><a href="#" onClick={toggleMenu}>Blog</a></li>
                            <li className="hover:text-white transition"><a href="#" onClick={toggleMenu}>FQA</a></li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <div className="flex flex-col justify-center items-center text-center max-w-[700px] mt-20 md:mt-0 flex-grow">
                {/* Profile */}
                <div className="relative mb-6">
                    <div className="rounded-full overflow-hidden w-28 h-28 border-white shadow-lg">
                        <img src="/assets/img/icons/person-img.jpg" alt="person-img" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-max px-2 py-1 text-sm bg-white text-black rounded-lg shadow-md">
                        <img src="/assets/img/icons/Twitter_Verified_Badge.svg" alt="twitter-badge" className="w-5" />
                        <p className="font-medium">Verified Expert</p>
                    </div>
                </div>

                {/* Title & Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-3xl font-satoshi md:text-4xl font-extrabold leading-tight mb-4 max-w-[550px] text-transparent bg-clip-text"
                    style={{
                        background:
                            "radial-gradient(61% 200% at 39.7% 21.9%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.32) 100%)",
                        WebkitBackgroundClip: "text"
                    }}
                >
                    Haleema Mohamed Yasin Turning Clicks into Customers
                </motion.h1>



                <p className="text-gray-300 font-satoshi text-sm md:text-base mb-6 max-w-[550px]">
                    ROI-obsessed Digital Marketing Executive • 5+ years growing brands with Google & Meta Ads, SEO and data analytics.
                </p>

                <div className="relative inline-block rounded-full overflow-hidden p-[2px] z-0">
                    {/* Glow border */}
                    <div
                        className="absolute inset-0 rounded-full blur-md z-[1]"
                        style={{
                            background: "conic-gradient(from 0deg, rgb(125,203,255) 0%, rgba(132,206,255,0) 100%)",
                            animation: "rotateGlow 3s linear infinite"
                        }}
                    ></div>

                    {/* Button */}
                    <button className="bg-black text-white font-medium text-base px-6 py-3 rounded-full relative z-[2]">
                        Get in Touch
                    </button>

                    {/* Keyframes (inline) */}
                    <style>
                        {`
                        @keyframes rotateGlow {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                        `}
                    </style>
                </div>

            </div>
        </div>
    );
}
