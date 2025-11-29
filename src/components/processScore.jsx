import { useRef, useEffect } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const Counter = ({ value, prefix = "", suffix = "" }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
            }
        });
    }, [springValue, prefix, suffix]);

    return <span ref={ref} />;
};

export default function ProcessScore() {
    return (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            <div>
                <h1 className="text-2xl text-[#DBDBDBB3]">Years experience</h1>
                <p className="text-3xl text-white">
                    <Counter value={14} suffix="+" />
                </p>
            </div>

            <div>
                <h1 className="text-2xl text-[#DBDBDBB3]">Projects completed</h1>
                <p className="text-3xl text-white">
                    <Counter value={91} suffix="+" />
                </p>
            </div>

            <div>
                <h1 className="text-2xl text-[#DBDBDBB3]">Startup funding</h1>
                <p className="text-3xl text-white">
                    <Counter value={100} prefix="$" suffix="m" />
                </p>
            </div>

            <div>
                <h1 className="text-2xl text-[#DBDBDBB3]">Industries served</h1>
                <p className="text-3xl text-white">
                    <Counter value={10} suffix="+" />
                </p>
            </div>
        </div>
    );
}
