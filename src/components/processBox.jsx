import Process from "./process";
import ProcessSection from "./processScroll";
import ProcessHero from "./processhero";
import ProcessScore from "./processScore";
import PricingTestimonialSection from "./processPrice";
export default function ProcessBox() {
    return (
        <div className="bg-[linear-gradient(180deg,rgb(18,18,18)_0%,rgba(247,244,242,0)_100%)] font-satoshi  w-full max-w-[1140px] rounded-xl p-5 md:p-8">
            <Process />
            <ProcessSection />
            <ProcessHero />
            <ProcessScore />
            <PricingTestimonialSection />
        </div>
    );
}