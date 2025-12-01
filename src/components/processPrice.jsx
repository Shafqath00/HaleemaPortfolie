import React from 'react';
import { Check } from 'lucide-react';
import { useRef, useEffect } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

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

export default function PricingTestimonialSection() {
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

  const features = [
    'One request at a time',
    'Average 48 hour delivery',
    'Unlimited brands',
    'Framer development',
    'Unlimited stock photos',
    'Pause or cancel anytime'
  ];

  const testimonial = {
    text: "As a fellow UI/UX designer, I'm truly impressed by Athos 2.0's ability to create visually stunning and user-friendly interfaces. Their Framer development skills bring designs to life effortlessly. A true professional in the field!",
    author: {
      name: 'Maria Septimus',
      role: 'Lead Designer, Acme Corp',
      avatar: '/assets/img/QYDymjkQtjtkCpu4c9XbLjwbY.png'
    },
    badge: '/assets/img/fH80K0VzvA2VU873CFYTnlRd0.png'
  };

  return (
    <div className="w-full py-6 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="flex flex-col lg:flex-row justify-between gap-8 rounded-[40px] p-0 md:p-12 lg:p-20 bg-[] md:bg-[#25333D]">
          {/* Left Column - Testimonial */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="flex flex-col justify-between flex-1 lg:max-w-[50%] text-white">
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl mb-8"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                Hire me
              </motion.h2>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col gap-8 py-6">
              {/* Badge/Logo */}
              <div className="flex gap-2 items-center">
                <img
                  src={testimonial.badge}
                  alt="Badge"
                  className="w-[140px] h-auto"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/140x40/374a5a/fff?text=Badge';
                  }}
                />
              </div>

              {/* Testimonial Text */}
              <div>
                <p className="text-lg font-medium leading-relaxed">
                  {testimonial.text}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="overflow-hidden w-[42px] h-[42px] rounded-full flex-shrink-0">
                  <img
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/42/374a5a/fff?text=M';
                    }}
                  />
                </div>
                <div className="font-medium">
                  <p className="m-0">{testimonial.author.name}</p>
                  <p className="m-0 text-white/70 text-sm">{testimonial.author.role}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Pricing Card */}
          <div className="flex justify-center lg:justify-end items-center flex-1 lg:max-w-[50%]">
            <div className="w-full max-w-md">
              <div
                className="bg-black text-white p-6 md:p-8 flex flex-col gap-10 md:gap-12 rounded-[17px] w-full"
              >
                {/* Header */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium mb-2">
                    Membership
                  </h3>
                  <p className="text-white/70 font-medium text-sm md:text-base">
                    One request at a time. Pause or cancel anytime.
                  </p>
                </div>

                {/* Price */}
                <div className="flex flex-col items-center">
                  <p
                    className="text-4xl md:text-5xl"
                    style={{ fontFamily: 'Crimson Pro, serif' }}
                  >
                    <Counter value={4995} prefix="$" />
                  </p>
                  <p className="font-medium text-base md:text-lg">
                    /month billed yearly
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col gap-4">
                  <a
                    href="#"
                    className="block text-center py-3 px-6 rounded-[36px] text-white no-underline transition-transform hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(rgb(51, 54, 63) 0%, rgb(2, 2, 2) 100%)',
                      border: '1px solid black',
                      boxShadow: 'rgb(36, 38, 40) 0px 0px 0px 1px, rgba(27, 28, 29, 0.48) 0px 1px 2px 0px'
                    }}
                  >
                    Book an intro
                  </a>

                  {/* Features List */}
                  <div className="md:flex flex-col gap-3 hidden">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm md:text-base"
                      >
                        <Check size={20} className="flex-shrink-0" />
                        <p className="m-0">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}