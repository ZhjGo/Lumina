"use client";

import { Footer } from "@/components/features/Footer";
import { SmartSearchBar } from "@/components/features/SearchBar";
import { CategoryGrid } from "@/components/features/CategoryGrid";
import { CategoryNav } from "@/components/features/CategoryNav";
import { DigitalClock } from "@/components/ui/DigitalClock";
import { motion, AnimatePresence } from "framer-motion";
import { wallpapers } from "@/data/wallpapers";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Image from "next/image";

interface HomeContentProps {
    initialBg: string;
}

export function HomeContent({ initialBg }: HomeContentProps) {
    const [currentBg, setCurrentBg] = useState(initialBg);
    const [isLoading, setIsLoading] = useState(false);

    const handleSwitchWallpaper = () => {
        if (isLoading) return;
        setIsLoading(true);

        let randomBg = currentBg;
        // Ensure we get a different wallpaper
        while (randomBg === currentBg) {
            randomBg = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        }

        // Preload image
        const img = new window.Image();
        img.src = randomBg;
        img.onload = () => {
            setCurrentBg(randomBg);
            setIsLoading(false);
        };
    };

    return (
        <main className="min-h-screen overflow-x-hidden relative">
            {/* Immersive Background System */}
            <div className="fixed inset-0 z-[-1] bg-black">
                {/* Layer 0: Static Base Layer (SSR Friendly) */}
                {/* Crucial: This img tag is rendered by server and immediately visible. No animation opacity=0 issues. */}
                <img
                    src={initialBg}
                    alt="Base Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Layer 1: Animated Transition Layer */}
                {/* Only renders when we switch wallpapers to fade the new one in on top of the base */}
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
                            <Image
                                src={currentBg}
                                alt="Immersive Background"
                                fill
                                priority
                                unoptimized
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Wallpaper Switcher Button */}
            <motion.button
                onClick={handleSwitchWallpaper}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
                className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors shadow-lg"
                title="切换壁纸"
            >
                <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
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
            <Footer />

            {/* Fixed Bottom Dock */}
            <CategoryNav />
        </main>
    );
}
