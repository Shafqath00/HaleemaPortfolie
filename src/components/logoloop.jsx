import { motion } from "framer-motion";

const logos = [
  "/assets/img/icons/binge-ads.png",
  "/assets/img/icons/google-ads.png",
  "/assets/img/icons/google-analytics.png",
  "/assets/img/icons/canvas.png",
  "/assets/img/icons/capcut-2.png",
  "/assets/img/icons/hootsuite.png",
  "/assets/img/icons/canvas.png",
  "/assets/img/icons/hubspots-2.png"
];

export default function LogoLoop() {
  return (
    <div className="max-w-[1140px] w-full relative overflow-hidden">

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10" />

        <div className="overflow-hidden">
          <motion.div
            className="flex  md:gap-32 gap-12 items-center"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 group">
                <div className="relative rounded-full p-6 w-[80px] h-[80px] shadow-xl bg-black overflow-hidden">
                  <div className="absolute inset-0 rounded-full group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={logo}
                      alt="brand"
                      className="max-w-[50px] max-h-[50px] object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
