import React, { useEffect, useRef, useState } from 'react';

const ScrollingStackCards = () => {
    const cardsContainerRef = useRef(null);
    const cardsRef = useRef([]);
    const [isMobile, setIsMobile] = useState(false);

    const cardsData = [
        { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#0f151f', bgColor: '#82c95e',bgImg:"/assets/img/bg-1.jpg" },
        { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#0f151f', bgColor: '#d48740',bgImg:"/assets/img/bg-2.jpg" },
        { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#0f151f', bgColor: '#ba8ad6',bgImg:"/assets/img/bg-3.jpg" }
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const cardHeight = isMobile ? 700 : 600;
        const offsetBottom = window.innerHeight - cardHeight;

        const handleScroll = () => {
            cardsRef.current.forEach((card, index) => {
                if (!card || index === cardsRef.current.length - 1) return;

                const nextCard = cardsRef.current[index + 1];
                if (!nextCard) return;

                const offsetTop = 20 + index * 20;
                const nextCardRect = nextCard.getBoundingClientRect();

                // Calculate the scroll percentage
                const start = offsetTop;
                const end = offsetBottom;
                const current = nextCardRect.top;

                let percentageY = (current - start) / (end - start);
                percentageY = Math.max(0, Math.min(1, percentageY));

                // Calculate scale and brightness
                const toScale = 1 - (cardsRef.current.length - 1 - index) * 0.1;
                const scale = 1 + (toScale - 1) * (1 - percentageY);
                const brightness = 1 + (0.6 - 1) * (1 - percentageY);

                const cardInner = card.querySelector('.card__inner');
                if (cardInner) {
                    cardInner.style.transform = `scale(${scale})`;
                    cardInner.style.filter = `brightness(${brightness})`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    return (
        <div className="min-h-scree py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div ref={cardsContainerRef} className="cards-container relative">
                    {cardsData.map((cardData, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="card sticky"
                            style={{
                                top: '20px',
                                paddingTop: `${20 + index * 20}px`,
                                marginBottom: index === cardsData.length - 1 ? '0' : '20px'
                            }}
                        >
                            <div className="card__inner duration-300 ease-out font-satoshi" >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ height: isMobile ? '700px' : '600px' }}>
                                    {/* Background */}
                                    <div
                                        className="absolute inset-0 "
                                        style={{ backgroundColor: cardData.color }}
                                    />

                                    {/* Content */}
                                    <div className="relative h-full overflow-hidden flex flex-col md:flex-row p-8 md:p-12">
                                        <div className={` w-[600px]  opacity-30 blur-3xl rounded-[100%] h-[600px] absolute right-0 top-0`} style={{ backgroundColor: cardData.bgColor }}>

                                        </div>
                                        {/* Left side - Text content */}
                                        <div className="flex-1 flex flex-col justify-between text-white z-10">
                                            <div>
                                                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                                    Modernizing a Subscription Management Platform
                                                </h2>
                                                <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-8">
                                                    With user-centered approach, the goal was to create an intuitive
                                                    interface for effortless financial management while
                                                    incorporating gamification.
                                                </p>
                                            </div>
                                            <div>
                                                <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                                                    View case study
                                                </button>
                                            </div>
                                        </div>

                                        {/* Right side - Image and stats */}
                                        <div className="flex-1 flex flex-col justify-end z-10 mt-8 md:mt-0 md:ml-8">
                                            <div
                                                className="rounded-xl mb-6 shadow-xl bg-cover bg-center bg-no-repeat"
                                                style={{
                                                    backgroundImage: `url(${cardData.bgImg})`,
                                                    height: '300px'
                                                }}
                                            >
                                            </div>

                                            {/* Stats */}
                                            <div className="flex gap-6 text-white">
                                                <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                    <p className="text-sm opacity-70 mb-1">Engagement</p>
                                                    <p className="text-2xl font-bold">12 min</p>
                                                </div>
                                                <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                    <p className="text-sm opacity-70 mb-1">User Satisfaction</p>
                                                    <p className="text-2xl font-bold">4.5★</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Extra space for scrolling */}
                {/* <div style={{ height: '100vh' }} /> */}
            </div>
        </div>
    );
};

export default ScrollingStackCards;