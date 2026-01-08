"use client";

import { useMemo } from "react";
import { ClayCard } from "@/components/ui/ClayCard";
import { SmartFavicon } from "@/components/ui/SmartFavicon";
import { Category, linkData } from "@/data/links";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function CategoryGrid() {
    const filteredData = linkData;

    return (
        <div className="space-y-12 w-full">
            <AnimatePresence>
                {filteredData.map((category) => (
                    <motion.section
                        key={category.id}
                        id={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="scroll-mt-32" // Increased scroll margin for better positioning
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-4 h-8 rounded-full ${category.color} shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />
                            <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                                {category.name}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.items.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div className="h-full flex flex-col justify-between p-6 rounded-3xl bg-gray-900/30 backdrop-blur-2xl border border-white/10 shadow-xl transition-all duration-500 hover:bg-gray-900/50 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:-translate-y-1 will-change-transform group-hover:scale-[1.02]">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1.5 overflow-hidden border border-white/10 shadow-inner">
                                                        <SmartFavicon
                                                            url={item.url}
                                                            title={item.title}
                                                            customIcon={item.icon}
                                                        />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors tracking-wide">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white/80 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </div>
                                            <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.section>
                ))}
            </AnimatePresence>


        </div>
    );
}
