import React from 'react';

export default function ProcessHero() {
    const services = [
        'Product Design',
        'Brand Identity',
        'Web Development'
    ];

    return (
        <div className="w-full text-white py-12 ">
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    {/* Hero Content */}
                    <div className="flex flex-col lg:flex-row lg:justify-between mb-12">
                        {/* Left Column - Text Content */}
                        <div className="overflow-hidden md:hidden mb-4">
                            <div className="flex gap-6 xl:gap-8">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2.5 min-w-fit"
                                    >
                                        <p className="text-lg xl:text-xl whitespace-nowrap">
                                            {service}
                                        </p>
                                        <div className="bg-black h-[1px] w-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 w-full lg:max-w-[50%] mb-8 lg:mb-0">
                            <h1
                                className="text-4xl "
                            >
                                Product design for easy community access
                            </h1>

                            <p className="text-lg md:text-xl leading-relaxed ">
                                Helping startups and brands to craft expressive and engaging
                                solutions for their software needs.
                            </p>

                            <div className="max-w-[230px]">
                                <img
                                    src="/assets/img/hiremeoncontra-light@2x (1).png"
                                    alt="Hire me on Contra"
                                    className="w-full h-auto"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/230x60/1a1a1a/666?text=Hire+Me';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right Column - Services (Desktop Only) */}
                        <div className="hidden lg:flex absolute right-0 top-5 w-auto justify-center">
                            <div className="flex gap-6 xl:gap-8">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2.5 min-w-fit"
                                    >
                                        <p className="text-lg xl:text-xl whitespace-nowrap">
                                            {service}
                                        </p>
                                        <div className="bg-black h-[1px] w-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image Boxes Section */}
                    <div className="relative flex justify-between mt-12 lg:mt-16 h-[320px] md:h-[375px]">
                        {/* Left Green Box */}
                        <div
                            className="w-[45%] md:w-[400px] h-full rounded-[32px] hidden md:block md:rounded-[64px]"
                            style={{
                                background: 'linear-gradient(234deg, rgb(210, 232, 200) 0%, rgb(180, 211, 165) 100%)'
                            }}
                        ></div>
                        {/* Right Image Box */}
                        <div
                            className="absolute bottom-0 right-0 w-[100%] md:w-[500px] h-[320px] md:h-[515px] rounded-[32px] md:rounded-[64px] overflow-hidden p-6 pb-0 md:p-10 md:pb-0"
                            style={{
                                background: 'linear-gradient(234deg, rgb(210, 232, 200) 0%, rgb(180, 211, 165) 100%)'
                            }}
                        >
                            <div className="rounded-t-[20px]  md:rounded-t-[30px] overflow-hidden h-full">
                                <img
                                    src="/assets/img/i3.png"
                                    alt="Project showcase"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/500x515/b4d3a5/666?text=Project+Image';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Services - Mobile View */}
                    {/* <div className="lg:hidden mt-12 flex flex-wrap gap-4 justify-center">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex flex-col gap-2 flex-1 min-w-[120px]"
              >
                <p className="text-base md:text-lg text-center">
                  {service}
                </p>
                <div className="bg-white/30 h-[1px] w-full"></div>
              </div>
            ))}
          </div> */}
                </div>
            </div>
        </div>
    );
}