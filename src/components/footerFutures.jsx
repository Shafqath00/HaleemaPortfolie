import React from 'react';
import { Quote } from 'lucide-react';

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
      bgColor: '#d2e8c8',
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
      bgColor: '#d2e8c8',
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
      bgColor: '#d2e8c8',
      image: {
        bg: '/assets/img/gjwq6YF8C5O9i1s3wusPqbBs.png',
        logo: '/assets/img/24HSUW6CbPbMze3cAfl2h94ET8.png',
        overlay: null
      },
      reverse: true
    }
  ];

  const TestimonialCard = ({ testimonial, index }) => (
    <div 
      className={`flex ${testimonial.reverse ? 'flex-col-reverse' : 'flex-col'} flex-1 h-full  gap-2.5 ${index >= 2 ? 'hidden lg:flex' : ''}`}
    >
      {/* Text Card */}
      <div 
        className="flex-1 flex flex-col justify-between p-3 md:p-6 rounded-3xl"
        style={{ backgroundColor: testimonial.bgColor }}
      >
        <div>
          {testimonial.type === 'stat' ? (
            <>
              <p className="font-semibold leading-none" style={{ color: testimonial.color }}>
                <span className={testimonial.statSize} style={{ color: testimonial.color }}>
                  {testimonial.stat}
                </span>
                {testimonial.unit && <span className="text-4xl">{testimonial.unit}</span>}
              </p>
              <p 
                className="text-2xl md:text-3xl leading-normal mt-2"
                style={{ color: testimonial.color }}
              >
                {testimonial.description}
              </p>
            </>
          ) : (
            <p 
              className="text-xl md:text-2xl font-medium leading-normal"
              style={{ color: testimonial.color }}
            >
              {testimonial.text}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div>
            <Quote size={30} style={{ color: testimonial.color }} />
          </div>
          <div>
            <p 
              className="text-sm font-bold leading-normal m-0"
              style={{ color: testimonial.color }}
            >
              {testimonial.author}
            </p>
            <p 
              className="text-sm leading-normal m-0"
              style={{ color: testimonial.color }}
            >
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>

      {/* Image Card */}
      <div className="h-[300px] relative flex items-center rounded-3xl overflow-hidden">
        <img 
          src={testimonial.image.bg}
          alt="Background"
          className="absolute top-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/d2e8c8/666?text=Image';
          }}
        />
        {testimonial.image.overlay && (
          <div 
            className="absolute w-full h-full"
            style={{ background: testimonial.image.overlay }}
          ></div>
        )}
        <div className="relative p-6 w-full h-full flex items-center justify-center">
          <img 
            src={testimonial.image.logo}
            alt="Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x100/ffffff/666?text=Logo';
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="w-full rounded-[36px] md:p-8 p-5"
    //   style={{
    //     background: 'linear-gradient(180deg, rgba(249, 247, 246, 0) 29.87%, rgb(18, 18, 18) 100%)'
    //   }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-12 md:mb-16">
          <h2 
            className="text-center text-3xl md:text-4xl lg:text-5xl max-w-[500px] text-white leading-tight"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Relied upon by a Fresh Generation of Companies
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-2.5 lg:h-[700px]">
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