import FooterBox from "../components/footerBox";

export default function FooterPage() {
    return (
        <div className="relative z-10 flex justify-center items-center py-5 overflow-hidden" style={{ backgroundColor: "rgb(42, 41, 40)" }}>
            <div className="absolute inset-0  z-10 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] bg-[length:128px] bg-repeat opacity-[0.075] pointer-events-none"></div>
            <div className="relative  w-full flex justify-center">
                <FooterBox />
            </div>
        </div>
    );
}
