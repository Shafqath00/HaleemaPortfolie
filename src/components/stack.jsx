import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { ArrowUpRight, BarChart3, Globe, Zap } from 'lucide-react';

export default function Stack() {
    return (
        <div className="w-full py-20">
            <div className="max-w-[1140px] mx-auto px-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Expertise</h2>
                <p className="text-gray-400 text-lg max-w-2xl">
                    Delivering high-impact digital solutions through strategic marketing and data-driven insights.
                </p>
            </div>

            <ScrollStack
                useWindowScroll={true}
                className="max-w-[1140px] mx-auto px-6"
                itemDistance={100}
                itemStackDistance={20}
            >
                {/* Card 1: Digital Marketing */}
                <ScrollStackItem itemClassName="h-[500px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden group">
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                <Globe className="w-8 h-8 text-blue-400" />
                            </div>
                            <span className="text-5xl font-bold text-white/5">01</span>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Digital Marketing</h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                Comprehensive strategies across Google Ads, Meta, and emerging platforms to drive targeted traffic and maximize ROI.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-white font-medium mt-8 group-hover:translate-x-2 transition-transform cursor-pointer">
                            <span>Learn more</span>
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
                </ScrollStackItem>

                {/* Card 2: Data Analytics */}
                <ScrollStackItem itemClassName="h-[500px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden group">
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                                <BarChart3 className="w-8 h-8 text-purple-400" />
                            </div>
                            <span className="text-5xl font-bold text-white/5">02</span>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Data Analytics</h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                Turning raw data into actionable insights. Advanced tracking setup, conversion optimization, and custom reporting dashboards.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-white font-medium mt-8 group-hover:translate-x-2 transition-transform cursor-pointer">
                            <span>View case studies</span>
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
                </ScrollStackItem>

                {/* Card 3: SEO Optimization */}
                <ScrollStackItem itemClassName="h-[500px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden group">
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                <Zap className="w-8 h-8 text-emerald-400" />
                            </div>
                            <span className="text-5xl font-bold text-white/5">03</span>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">SEO Optimization</h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                Technical and content-driven SEO strategies to improve organic visibility and dominate search engine results pages.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-white font-medium mt-8 group-hover:translate-x-2 transition-transform cursor-pointer">
                            <span>Explore services</span>
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
                </ScrollStackItem>
            </ScrollStack>
        </div>
    );
}