"use client";

import { Footer } from "@/components/features/Footer";
import { SmartSearchBar } from "@/components/features/SearchBar";
import { CategoryGrid } from "@/components/features/CategoryGrid";
import { CategoryNav } from "@/components/features/CategoryNav";
import { DigitalClock } from "@/components/ui/DigitalClock";
import { motion, AnimatePresence } from "framer-motion";
import { wallpapers } from "@/data/wallpapers";
import { useState } from "react";
import { Fan, Github, Search, Download } from "lucide-react";
import Image from "next/image";

interface HomeContentProps {
    initialBg: string;
}

export function HomeContent({ initialBg }: HomeContentProps) {
    const [currentBg, setCurrentBg] = useState(initialBg);
    const [isLoading, setIsLoading] = useState(false);
    const [quoteKey, setQuoteKey] = useState(0);

    // Helper to generate optimized URLs
    const getOptimizedUrl = (url: string, width: number, quality: number = 80) => {
        return `${url}?auto=format&fit=crop&q=${quality}&w=${width}`;
    };

    const handleSwitchWallpaper = () => {
        if (isLoading) return;
        setIsLoading(true);

        let randomBg = currentBg;
        while (randomBg === currentBg) {
            randomBg = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        }

        // Check window width to decide which image to preload (simple optimization)
        const width = window.innerWidth > 1080 ? 1920 : 1080;
        const targetUrl = getOptimizedUrl(randomBg, width);

        const img = new window.Image();
        img.src = targetUrl; // Preload optimized version
        img.onload = () => {
            setCurrentBg(randomBg); // We store the base URL in state
            setQuoteKey(prev => prev + 1); // Refresh quote
            setIsLoading(false);
        };
    };

    return (
        <main className="min-h-screen overflow-x-hidden relative">
            {/* Immersive Background System */}
            <div className="fixed inset-0 z-[-1] bg-black">
                {/* Layer 0: Static Base Layer (SSR Friendly) - Responsive LCP Optimization */}
                <img
                    src={getOptimizedUrl(initialBg, 1920)}
                    srcSet={`
                        ${getOptimizedUrl(initialBg, 640, 60)} 640w, 
                        ${getOptimizedUrl(initialBg, 1024, 75)} 1024w,
                        ${getOptimizedUrl(initialBg, 1920, 80)} 1920w,
                        ${getOptimizedUrl(initialBg, 2560, 85)} 2560w
                    `}
                    sizes="100vw"
                    alt="Base Background"
                    // @ts-ignore - fetchPriority is valid HTML but React types might lag
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Layer 1: Animated Transition Layer */}
                <AnimatePresence mode="popLayout">
                    {currentBg !== initialBg && (
                        <motion.div
                            key={currentBg}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {/* We use specific width for transition image to be safe */}
                            <img
                                src={getOptimizedUrl(currentBg, 1920)}
                                className="absolute inset-0 w-full h-full object-cover"
                                alt="Immersive Background"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Right Top Buttons */}
            {/* Extension Download */}
            <motion.a
                href="https://github.com/ZhjGo/Lumina/releases"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed top-8 right-56 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors shadow-lg"
                title="下载扩展"
            >
                <Download className="w-5 h-5" />
            </motion.a>

            {/* GitHub Link */}
            <motion.a
                href="https://github.com/ZhjGo/Lumina"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed top-8 right-40 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors shadow-lg"
                title="GitHub 开源"
            >
                <Github className="w-5 h-5" />
            </motion.a>

            {/* Wallpaper Switch Button */}
            <motion.button
                onClick={handleSwitchWallpaper}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
                className="fixed top-8 right-24 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors shadow-lg"
                title="切换壁纸"
            >
                <Fan className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
            </motion.button>

            {/* Hero Section */}
            <section className="min-h-[45vh] md:min-h-[60vh] flex flex-col justify-center items-center px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center w-full"
                >
                    <div className="mb-6 md:mb-10">
                        <DigitalClock />
                    </div>

                    <div className="w-full max-w-2xl">
                        <SmartSearchBar />
                    </div>
                </motion.div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                    <div className="text-white/30 text-center text-sm mb-8 md:mb-12 animate-pulse">
                        下滑查看更多内容
                    </div>

                    <CategoryGrid />
                </motion.div>
            </div>

            {/* Smart Footer (Serves as scroll buffer & content) */}
            <Footer refreshTrigger={quoteKey} />

            {/* Fixed Bottom Dock */}
            <CategoryNav />
        </main>
    );
}
