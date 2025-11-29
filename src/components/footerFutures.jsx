import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
    
    // Track scroll progress for this specific card
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "end start"]
    });

    // Alternate direction: even indices go up, odd indices go down
    const direction = index % 2 === 0 ? 1 : -1;
    
    // Transform scroll progress to Y position with direction
    const y = useTransform(
      scrollYProgress,
      [0, 1],
      [150 * direction, -150 * direction]
    );
    
    // Add spring physics for smoother animation
    const smoothY = useSpring(y, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    // Opacity based on scroll position
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
      <motion.div 
        ref={cardRef}
        style={{ y: smoothY, opacity }}
        className={`flex ${testimonial.reverse ? 'flex-col-reverse' : 'flex-col'} flex-1 h-full gap-3 ${index >= 2 ? 'hidden lg:flex' : ''}`}
      >
        {/* Text Card */}
        <motion.div 
          className="flex-1 flex flex-col justify-between p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          style={{ backgroundColor: testimonial.bgColor }}
          whileHover={{ y: -5 }}
        >
          <div>
            {testimonial.type === 'stat' ? (
              <>
                <p className="font-bold leading-none" style={{ color: testimonial.color }}>
                  <span className={`${testimonial.statSize} font-extrabold`} style={{ color: testimonial.color }}>
                    {testimonial.stat}
                  </span>
                  {testimonial.unit && <span className="text-5xl font-bold">{testimonial.unit}</span>}
                </p>
                <p 
                  className="text-2xl md:text-3xl font-semibold leading-snug mt-3"
                  style={{ color: testimonial.color }}
                >
                  {testimonial.description}
                </p>
              </>
            ) : (
              <p 
                className="text-xl md:text-2xl font-medium leading-relaxed"
                style={{ color: testimonial.color }}
              >
                "{testimonial.text}"
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 mt-6 pt-4 border-t-2" style={{ borderColor: `${testimonial.color}33` }}>
            <div className="p-2 rounded-full bg-white bg-opacity-50">
              <Quote size={28} style={{ color: testimonial.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p 
                className="text-base font-bold leading-tight m-0"
                style={{ color: testimonial.color }}
              >
                {testimonial.author}
              </p>
              <p 
                className="text-sm leading-tight m-0 mt-1 opacity-80"
                style={{ color: testimonial.color }}
              >
                {testimonial.role}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Image Card */}
        <motion.div 
          className="h-[300px] relative flex items-center rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <img 
            src={testimonial.image.bg}
            alt="Background"
            className="absolute top-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300/d2e8c8/666?text=Image';
            }}
          />
          {testimonial.image.overlay && (
            <div 
              className="absolute w-full h-full backdrop-blur-[1px]"
              style={{ background: testimonial.image.overlay }}
            ></div>
          )}
          <div className="relative p-8 w-full h-full flex items-center justify-center">
            <motion.img 
              src={testimonial.image.logo}
              alt="Logo"
              className="w-full h-full object-contain drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x100/ffffff/666?text=Logo';
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div 
      className="w-full rounded-[36px] md:p-12 p-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="flex justify-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-center text-2xl md:text-5xl max-w-[600px] text-white "
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Relied upon by a Fresh Generation of Companies
          </h2>
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