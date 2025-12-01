import React, { useRef, useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function FooterFutures() {
  const testimonials = [
    {
      type: 'stat',
      stat: '99',
      statSize: 'text-8xl',
      unit: '%',
      description: 'reduction in hiring costs',
      author: 'Nolan Vaccaro',
      role: 'Director, Continental',
      color: 'rgb(111, 153, 84)',
      bgColor: '#d2e8c8',
      image: {
        bg: '/assets/img/car-bg.png',
        logo: '/assets/img/VpaNNfUNJofY8MF7AAUcLBBtII.png',
        overlay: '#6f995480'
      }
    },
    {
      type: 'quote',
      text: 'Finding, hiring and managing remote tech talent with Athos has never been faster, easier or more flexible.',
      author: 'Carla Dorwart',
      role: 'CEO, Levi9',
      color: 'rgb(152, 125, 165)',
      bgColor: '#e8dff0',
      image: {
        bg: '/assets/img/wXTso75pkWvjKNBMxtqSxGsHdKo.png',
        logo: '/assets/img/q4WzLAAggXSPHmwQxe6IQo5mzA.png',
        overlay: '#987da566'
      },
      reverse: true
    },
    {
      type: 'quote',
      text: 'Athos has allowed us to deliver on relevant projects on time and strengthened our team.',
      author: 'Nolan Vaccaro',
      role: 'Director, Continental',
      color: 'rgb(148, 161, 170)',
      bgColor: '#dfe4e8',
      image: {
        bg: '/assets/img/EvQyPqEUdnq6qvLMpQrqyLFT6os.png',
        logo: '/assets/img/fH80K0VzvA2VU873CFYTnlRd0.png',
        overlay: '#94a1aa66'
      }
    },
    {
      type: 'stat',
      stat: '7x',
      statSize: 'text-7xl',
      description: 'Faster than traditional hiring',
      author: 'Nolan Vaccaro',
      role: 'Director, Continental',
      color: 'rgb(194, 137, 81)',
      bgColor: '#f5e6d3',
      image: {
        bg: '/assets/img/gjwq6YF8C5O9i1s3wusPqbBs.png',
        logo: '/assets/img/24HSUW6CbPbMze3cAfl2h94ET8.png',
        overlay: null
      },
      reverse: true
    }
  ];

  const TestimonialCard = ({ testimonial, index }) => {
    const cardRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const isInView = useInView(cardRef, { once: true, margin: "-10%" });

    // --- 1. DETECT SCREEN SIZE ---
    useEffect(() => {
      const checkScreenSize = () => {
        // 1024px matches the 'lg' breakpoint used in your className hidden logic
        setIsMobile(window.innerWidth < 1024);
      };

      checkScreenSize(); // Run immediately
      window.addEventListener('resize', checkScreenSize); // Run on resize

      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // --- 2. SETUP ANIMATIONS ---
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "center center"]
    });

    const direction = index % 2 === 0 ? 1 : -1;

    // These are the calculated animation values
    const animatedY = useTransform(scrollYProgress, [0, 1], [100 * direction, 0]);
    const animatedOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

    // Mobile entrance variants
    const mobileVariants = {
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
      <motion.div
        ref={cardRef}
        style={{
          y: isMobile ? undefined : animatedY,
          opacity: isMobile ? undefined : animatedOpacity,
          willChange: "transform, opacity",
        }}
        initial={isMobile ? "hidden" : undefined}
        animate={isMobile ? (isInView ? "visible" : "hidden") : undefined}
        variants={isMobile ? mobileVariants : undefined}
        className={`flex ${testimonial.reverse ? "flex-col-reverse" : "flex-col"}  flex-1 gap-3 ${index >= 2 ? "hidden lg:flex" : ""
          }`}
      >
        {/* ---------- TEXT CARD ---------- */}
        <motion.div
          className="flex-1 flex flex-col justify-between p-6 md:p-8 rounded-3xl shadow-md transition-transform duration-300 hover:scale-[1.015]"
          style={{ backgroundColor: testimonial.bgColor }}
        >
          <div>
            {testimonial.type === "stat" ? (
              <>
                <p className="font-bold leading-none" style={{ color: testimonial.color }}>
                  <span className={`${testimonial.statSize} font-extrabold`}>
                    {testimonial.stat}
                  </span>
                  {testimonial.unit && (
                    <span className="text-5xl font-bold">{testimonial.unit}</span>
                  )}
                </p>
                <p className="text-2xl md:text-3xl font-semibold mt-3" style={{ color: testimonial.color }}>
                  {testimonial.description}
                </p>
              </>
            ) : (
              <p className="text-xl md:text-2xl font-medium leading-relaxed" style={{ color: testimonial.color }}>
                "{testimonial.text}"
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 mt-6 pt-4 border-t-2" style={{ borderColor: `${testimonial.color}33` }}>
            <div className="p-2 rounded-full bg-white/50">
              <Quote size={28} style={{ color: testimonial.color }} strokeWidth={2.2} />
            </div>
            <div>
              <p className="font-bold leading-tight" style={{ color: testimonial.color }}>
                {testimonial.author}
              </p>
              <p className="text-sm leading-tight opacity-80 mt-1" style={{ color: testimonial.color }}>
                {testimonial.role}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ---------- IMAGE CARD ---------- */}
        <motion.div
          className="h-[300px] relative flex items-center rounded-3xl overflow-hidden shadow-md"
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={testimonial.image.bg}
            alt="background"
            className="absolute top-0 w-full h-full object-cover"
          />

          {testimonial.image.overlay && (
            <div className="absolute w-full h-full" style={{ background: testimonial.image.overlay }} />
          )}

          <div className="relative p-8 w-full h-full flex items-center justify-center">
            <motion.img
              src={testimonial.image.logo}
              alt="logo"
              className="w-full h-full object-contain drop-shadow-xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });

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
    <div className="w-full rounded-[36px] md:p-12 p-6 relative overflow-hidden">
      <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex justify-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-center text-2xl md:text-5xl max-w-[600px] text-white "
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Relied upon by a Fresh Generation of Companies
          </motion.h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:h-[750px]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}