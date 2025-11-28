import { useLayoutEffect, useRef, useCallback, memo } from 'react';
import Lenis from 'lenis';
import { twMerge } from 'tailwind-merge';
import { ArrowUpRight, BarChart3, Globe, Zap } from 'lucide-react';

export const ScrollStackItem = memo(({ children, itemClassName = '' }) => (
  <div
    className={twMerge(
      "scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top",
      itemClassName
    )}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      transform: 'translateZ(0)',
      WebkitFontSmoothing: 'antialiased'
    }}>
    {children}
  </div>
));

ScrollStackItem.displayName = 'ScrollStackItem';

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const rafIdRef = useRef(null);
  const cachedValuesRef = useRef({});

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(element => {
    if (useWindowScroll) {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    } else {
      return element.offsetTop;
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    if (!cachedValuesRef.current.endElement) {
      cachedValuesRef.current.endElement = useWindowScroll
        ? document.querySelector('.scroll-stack-end')
        : scrollerRef.current?.querySelector('.scroll-stack-end');
    }
    const endElement = cachedValuesRef.current.endElement;
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    const cardOffsets = cardsRef.current.map(card => card ? getElementOffset(card) : 0);

    let topCardIndex = 0;
    if (blurAmount) {
      for (let j = 0; j < cardsRef.current.length; j++) {
        const jCardTop = cardOffsets[j];
        const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
        if (scrollTop >= jTriggerStart) {
          topCardIndex = j;
        }
      }
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsets[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        blur = Math.max(0, depthInStack * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: translateY,
        scale: scale,
        rotation: rotation,
        blur: blur
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${Math.round(newTransform.translateY * 100) / 100}px, 0) scale(${newTransform.scale.toFixed(4)}) rotate(${newTransform.rotation.toFixed(2)}deg)`;
        const filter = newTransform.blur > 0.1 ? `blur(${newTransform.blur.toFixed(1)}px)` : '';

        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
        
        rafIdRef.current = requestAnimationFrame(() => {
          card.style.transform = transform;
          if (filter !== card.style.filter) {
            card.style.filter = filter;
          }
        });

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    if (!isUpdatingRef.current) {
      updateCardTransforms();
    }
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.0,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
        infinite: false,
        wheelMultiplier: 0.8,
        lerp: 0.08,
        syncTouch: true,
        syncTouchLerp: 0.05
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.0,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
        infinite: false,
        wheelMultiplier: 0.8,
        lerp: 0.08,
        syncTouch: true,
        syncTouchLerp: 0.05
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(useWindowScroll
      ? document.querySelectorAll('.scroll-stack-card')
      : scroller.querySelectorAll('.scroll-stack-card'));

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.WebkitFontSmoothing = 'antialiased';
      card.style.perspective = '1000px';
    });

    setupLenis();
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      cachedValuesRef.current = {};
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  const containerStyles = useWindowScroll
    ? {
      overscrollBehavior: 'contain',
      WebkitOverflowScrolling: 'touch',
      WebkitFontSmoothing: 'antialiased'
    }
    : {
      overscrollBehavior: 'contain',
      WebkitOverflowScrolling: 'touch',
      scrollBehavior: 'smooth',
      WebkitFontSmoothing: 'antialiased'
    };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

// Demo Component
export default function Stack() {
    return (
        <div className="w-full min-h-screen">
            <div className="max-w-[1140px] mx-auto px-6 pt-20 pb-12">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    My Expertise
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
                    Delivering high-impact digital solutions through strategic marketing and data-driven insights.
                </p>
            </div>

            <ScrollStack
                useWindowScroll={true}
                className="max-w-[1140px] mx-auto px-6"
                itemDistance={120}
                itemStackDistance={20}
            >
                {/* Card 1: Digital Marketing */}
                <ScrollStackItem itemClassName="h-[500px] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1e] border border-white/10 rounded-[40px] overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-5 bg-blue-500/10 rounded-2xl border border-blue-500/30 backdrop-blur-sm group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                                <Globe className="w-10 h-10 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                            <span className="text-7xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-300">01</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                Digital Marketing
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl group-hover:text-gray-300 transition-colors">
                                Comprehensive strategies across Google Ads, Meta, and emerging platforms to drive targeted traffic and maximize ROI.
                            </p>
                            
                            <div className="flex flex-wrap gap-2 pt-4">
                                <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium">
                                    Google Ads
                                </span>
                                <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium">
                                    Meta Ads
                                </span>
                                <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium">
                                    PPC Strategy
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white font-semibold text-lg mt-8 group-hover:translate-x-2 transition-transform cursor-pointer group-hover:text-blue-400 duration-300">
                            <span>Learn more</span>
                            <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                    </div>

                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-blue-500/30 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </ScrollStackItem>

                {/* Card 2: Data Analytics */}
                <ScrollStackItem itemClassName="h-[500px] bg-gradient-to-br from-[#1a1a2e] via-[#1e1635] to-[#0f0f1e] border border-white/10 rounded-[40px] overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-5 bg-purple-500/10 rounded-2xl border border-purple-500/30 backdrop-blur-sm group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                                <BarChart3 className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <span className="text-7xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-300">02</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                                Data Analytics
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl group-hover:text-gray-300 transition-colors">
                                Turning raw data into actionable insights. Advanced tracking setup, conversion optimization, and custom reporting dashboards.
                            </p>
                            
                            <div className="flex flex-wrap gap-2 pt-4">
                                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium">
                                    GA4 Setup
                                </span>
                                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium">
                                    Conversion Tracking
                                </span>
                                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium">
                                    Dashboards
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white font-semibold text-lg mt-8 group-hover:translate-x-2 transition-transform cursor-pointer group-hover:text-purple-400 duration-300">
                            <span>View case studies</span>
                            <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                    </div>
                    
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-purple-500/30 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </ScrollStackItem>

                {/* Card 3: SEO Optimization */}
                <ScrollStackItem itemClassName="h-[500px] bg-gradient-to-br from-[#1a1a2e] via-[#0f2e1e] to-[#0f0f1e] border border-white/10 rounded-[40px] overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 backdrop-blur-sm group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                                <Zap className="w-10 h-10 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                            <span className="text-7xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-300">03</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                SEO Optimization
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl group-hover:text-gray-300 transition-colors">
                                Technical and content-driven SEO strategies to improve organic visibility and dominate search engine results pages.
                            </p>
                            
                            <div className="flex flex-wrap gap-2 pt-4">
                                <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium">
                                    Technical SEO
                                </span>
                                <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium">
                                    Content Strategy
                                </span>
                                <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium">
                                    Link Building
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white font-semibold text-lg mt-8 group-hover:translate-x-2 transition-transform cursor-pointer group-hover:text-emerald-400 duration-300">
                            <span>Explore services</span>
                            <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                    </div>
                    
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </ScrollStackItem>
            </ScrollStack>
        </div>
    );
}