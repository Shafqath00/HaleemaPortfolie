import LogoLoop from "./logoloop";
export default function Hero() {
    return (
        <div className="flex flex-col items-center w-full h-full px-6 py-10 text-white">
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

                <div className="flex items-center gap-4">
                    {/* <a href="#" className="rounded-full border border-white bg-black text-white font-semibold px-4 py-2 hover:bg-transparent hover:text-white transition">
                        Get in Touch
                    </a> */}

                    {/* <button className="rounded-full border border-white p-2 hover:bg-white hover:text-black transition">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                            <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
                        </svg>
                    </button> */}
                </div>
            </div>

            {/* Hero Section */}
            <div className="flex flex-col justify-center items-center text-center max-w-[700px] flex-grow my-15">
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
                <h1
                    className="text-2xl font-satoshi md:text-4xl font-extrabold leading-tight mb-4 max-w-[550px] text-transparent bg-clip-text"
                    style={{
                        background:
                            "radial-gradient(61% 200% at 39.7% 21.9%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.32) 100%)",
                        WebkitBackgroundClip: "text"
                    }}
                >
                    Haleema Mohamed Yasin Turning Clicks into Customers
                </h1>



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
