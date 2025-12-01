import TriangleBackground from "../components/background";
import Hero from "../components/hero";
import LogoLoop from "../components/logoloop";
import ScrollingStackCards from "../components/stack2";

export default function Home() {
    return (
        <div className="relative w-full min-h-screen bg-[#111111]">
            <div className="fixed inset-0  z-0">
                <TriangleBackground />
            </div>
            {/* Content */}
            <div className="relative z-10  flex flex-col items-center w-full">
                <Hero />
                <LogoLoop />
                <ScrollingStackCards />
            </div>
        </div>
    );
}
