import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cardsData = [
  {
    bgColor: "#0f151f",
    title: "Modernizing a Subscription Management Platform",
    description: "With a user-centered approach, the goal was to create an intuitive interface for effortless financial management while incorporating gamification elements.",
    bgImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    stats: [
      { label: "Engagement", value: "12 min" },
      { label: "User Satisfaction", value: "4.5*" }
    ],
    color: "#82c95e"
  },
  {
    bgColor: "#0f151f",
    title: "Reimagining Online Shopping Experience",
    description: "Reimagining the online shopping journey with seamless navigation, personalized recommendations, and a streamlined checkout process.",
    bgImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    stats: [
      { label: "Conversion Rate", value: "+25%" },
      { label: "Avg Order Value", value: "$85" }
    ],
    color: "#d48740"
  },
  {
    bgColor: "#0f151f",
    title: "Healthcare Data Monitoring Dashboard",
    description: "Designing a comprehensive platform for healthcare professionals to monitor patient data, track metrics, and make informed decisions.",
    bgImg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    stats: [
      { label: "Efficiency", value: "+40%" },
      { label: "Error Reduction", value: "95%" }
    ],
    color: "#ba8ad6"
  },
  {
    bgColor: "#0f151f",
    title: "Secure Mobile Banking Application",
    description: "Creating a secure and intuitive mobile experience that empowers users to manage their finances on-the-go with confidence.",
    bgImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    stats: [
      { label: "Active Users", value: "1M+" },
      { label: "App Store Rating", value: "4.8" }
    ],
    color: "#82c95e"
  },
];

export default function ScrollingStackCards() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div className="min-h-[400vh] my-20" ref={container}>
      {cardsData.map((card, index) => {
        // Calculate target scale logic
        const targetScale = 1 - ((cardsData.length - index) * 0.05);
        
        return (
          <StackCard
            key={index}
            index={index}
            card={card}
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

function StackCard({ index, card, progress, range, targetScale }) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // Added 'perspective' to parent to help 3D transforms
    <div className="flex items-center justify-center sticky top-20 perspective-1000">
      <motion.div
        ref={container}
        // PERFORMANCE FIXES:
        // 1. will-change-transform: Tells browser this element changes shape
        // 2. transform-gpu: Forces hardware acceleration
        className="relative max-w-5xl rounded-4xl p-8 md:p-10 flex flex-col md:flex-row gap-12 overflow-hidden shadow-2xl will-change-transform transform-gpu"
        style={{
          backgroundColor: card.bgColor,
          scale,
          // Use calc for top to avoid layout shifts, but top is not animated so this is fine
          top: `calc(-5vh + ${index * 25}px)`, 
          transformOrigin: 'top',
        }}
      >
        {/* PERFORMANCE FIX: 
           Heavy blurs are expensive on mobile. 
           Changed to 'hidden md:block' to only show on desktop.
           If you MUST have it on mobile, reduce blur-3xl to blur-lg.
        */}
        <div 
            className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] blur-3xl opacity-15 rounded-full pointer-events-none" 
            style={{ backgroundColor: card.color }} 
        />

        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-between z-10">
          <div>
            <h2 className="text-2xl md:text-3xl text-[#dbdbdb] mb-6">
              {card.title}
            </h2>
            <p className="text-gray-400 mb-8 max-w-[400px]">
              {card.description}
            </p>
          </div>

          <div>
            <button className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
              <span className="font-medium">View case study</span>
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-8 z-10">
          {/* Image Container */}
          <div className="relative max-h-[250px] rounded-lg overflow-hidden">
            <div className="w-full h-full">
              <img
                src={card.bgImg}
                alt={card.title}
                // PERFORMANCE FIX: Lazy loading
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            {card.stats.map((stat, i) => (
              <div key={i}>
                <div className="inline-block py-1 rounded text-[#dbdbdb] text-lg ">
                  {stat.label}
                </div>
                <div className="text-4xl text-[#dbdbdb]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}