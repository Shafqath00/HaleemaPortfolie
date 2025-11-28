import FooterFutures from "./footerFutures";
import FAQAccordion from "./question";
import Footer from "./footer";
export default function FooterBox() {
    return (
        <div className="w-full max-w-[1140px] rounded-xl p-3 font-satoshi">
            <div className="bg-[linear-gradient(180deg,rgba(249,247,246,0)_29.8660844564%,rgb(18,18,18)_100%)]  rounded-[36px] mb-10">
                 <FooterFutures />
            </div>
            <div className="bg-[linear-gradient(180deg,rgb(18,18,18)_0%,rgba(247,244,242,0)_100%)] rounded-[36px]">
                 <FAQAccordion />
            </div>
            <div className="bg-[linear-gradient(180deg,rgba(249,247,246,0)_29.866084456443787%,rgb(18,18,18)_100%)] rounded-[36px]">
                <Footer />
            </div>
        </div>
    );
}