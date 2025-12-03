import TriangleBackground from "../components/background";
import Hero from "../components/hero";
import LogoLoop from "../components/logoloop";
import ScrollingStackCards from "../components/stack2";

export default function Home() {
    return (
        <div className="">
            <div className="fixed w-full h-full bg-[#1a1a1a] flex justify-center items-center -z-1">
                <TriangleBackground />
            </div>
            {/* Content */}
            <div className="flex flex-col items-center w-full ">
                <Hero />
                <LogoLoop />
                <ScrollingStackCards />
            </div>
        </div>
    );
}
