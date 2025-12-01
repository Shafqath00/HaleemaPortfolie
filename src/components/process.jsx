import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Process() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    return (
        <div ref={ref} className="w-full flex justify-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-white text-center flex flex-col items-center px-4"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
                >
                    Process
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="max-w-[600px] mx-auto text-lg md:text-xl text-gray-300 leading-relaxed"
                >
                    Your compass to innovation and design excellence. From exploration to execution, this dynamic framework fuels creativity and precision, ensuring your product journey aligns seamlessly with user desires.
                </motion.p>
            </motion.div>
        </div>
    );
}