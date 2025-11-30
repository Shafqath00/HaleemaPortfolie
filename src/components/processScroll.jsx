import React, { useState, useEffect, useRef } from 'react';
import { Search, Lightbulb, Code, Send } from 'lucide-react';
import { motion, useInView } from "framer-motion";

const StepItem = ({ step, index, setActiveImage, stepRef }) => {
  const Icon = step.icon;
  const descRef = useRef(null);
  const isInView = useInView(descRef, { once: true, margin: '-20% 0px' });

  return (
    <div
      ref={stepRef}
      className="cursor-pointer transition-all duration-300 hover:translate-x-2 py-[150px]"
      onMouseEnter={() => setActiveImage(step.image)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center gap-2 py-2"
          style={{ borderColor: step.color }}
        >
          <Icon size={20} style={{ color: step.color }} strokeWidth={2} />
          <p className="text-sm" style={{ color: 'rgb(219 219 219 / 70%)' }}>
            {step.label}
          </p>
        </div>
      </div>
      <motion.div
        ref={descRef}
        initial={{ x: -80, opacity: 0 }}
        animate={{
          x: isInView ? 0 : -80,
          opacity: isInView ? 1 : 0
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-2xl font-light leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
};

const MobileStepItem = ({ step, index }) => {
  const Icon = step.icon;
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: '-20% 0px' });

  return (
    <motion.div
      ref={itemRef}
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: isInView ? 0 : 50,
        opacity: isInView ? 1 : 0
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex items-center gap-2 border rounded-full px-4 py-2"
            style={{ borderColor: step.color }}
          >
            <Icon size={20} style={{ color: step.color }} strokeWidth={2} />
            <p className="text-sm" style={{ color: 'rgb(219 219 219 / 70%)' }}>
              {step.label}
            </p>
          </div>
        </div>
        <p className="text-2xl font-light leading-normal mb-6">
          {step.description}
        </p>
      </div>
      <div className="rounded-2xl overflow-hidden bg-zinc-900">
        <img
          src={step.image}
          alt={`${step.label} visualization`}
          className="w-full h-auto"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400/1a1a1a/666?text=Process+Image';
          }}
        />
      </div>
    </motion.div>
  );
};

export default function ProcessSection() {
  const [activeImage, setActiveImage] = useState('/assets/img/3.png');
  const stepRefs = useRef([]);

  const steps = [
    {
      icon: Search,
      color: 'rgb(194, 137, 81)',
      label: 'Discover',
      description: 'Brainstorming sessions in order to take their needs and company goals into account.',
      image: '/assets/img/3.png'
    },
    {
      icon: Lightbulb,
      color: 'rgb(111, 153, 84)',
      label: 'Define',
      description: 'Gather additional information about the ideal client, market opportunities and design sprint.',
      image: '/assets/img/box2.png'
    },
    {
      icon: Code,
      color: 'rgb(148, 161, 170)',
      label: 'Develop',
      description: 'Define the user experience and analyze your designs will inform behavior and effect the experience of the user.',
      image: '/assets/img/box-1.png'
    },
    {
      icon: Send,
      color: 'rgb(194, 137, 81)',
      label: 'Deliver',
      description: 'Determine design patterns, elements of template pages and work with developers to test design functionality.',
      image: '/assets/img/box2.png'
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = stepRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setActiveImage(steps[index].image);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="w-full text-white md:py-24 py-12 ">
      <div className="max-w-7xl mx-auto">
        {/* Desktop View */}
        <div className="hidden lg:flex gap-12">
          {/* Steps Column */}
          <div className="flex-1 space-y-8">
            {steps.map((step, index) => (
              <StepItem
                key={index}
                step={step}
                index={index}
                setActiveImage={setActiveImage}
                stepRef={(el) => (stepRefs.current[index] = el)}
              />
            ))}
          </div>

          {/* Image Column */}
          <div className="flex-1 sticky top-24 h-fit">
            <div className="rounded-2xl overflow-hidden bg-zinc-900">
              <img
                src={activeImage}
                alt="Process visualization"
                className="w-full h-auto transition-opacity duration-500"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400/1a1a1a/666?text=Process+Image';
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-16">
          {steps.map((step, index) => (
            <MobileStepItem key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}