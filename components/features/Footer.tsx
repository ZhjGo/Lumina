"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface HitokotoData {
    hitokoto: string;
    from: string;
    from_who: string | null;
}

export function Footer() {
    const [quote, setQuote] = useState<HitokotoData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://v1.hitokoto.cn?c=d&c=i&c=k") // Categories: Literature, Poetry, Philosophy
            .then((res) => res.json())
            .then((data) => {
                setQuote(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <footer className="min-h-[60vh] flex flex-col justify-center items-center relative text-center px-6 pb-32">

            {/* Divider */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12 rounded-full" />

            {/* Quote Section */}
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative px-6 py-10 md:p-16"
                >
                    <Quote className="absolute top-0 left-0 w-6 h-6 md:w-12 md:h-12 text-white/40 -scale-x-100 drop-shadow-lg" />

                    {loading ? (
                        <div className="h-20 md:h-24 w-48 md:w-64 mx-auto bg-white/5 animate-pulse rounded-xl" />
                    ) : (
                        <>
                            <p className="text-xl md:text-3xl font-light leading-relaxed text-white/90 font-serif tracking-wide mb-6 md:mb-8 drop-shadow-lg">
                                "{quote?.hitokoto || "生活明朗，万物可爱。"}"
                            </p>
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-base md:text-lg text-white/60 font-medium">
                                    —— {quote?.from_who ? `${quote.from_who} ` : ""}《{quote?.from || "佚名"}》
                                </p>
                            </div>
                        </>
                    )}

                    <Quote className="absolute bottom-0 right-0 w-6 h-6 md:w-12 md:h-12 text-white/40 drop-shadow-lg" />
                </motion.div>
            </div>

            {/* Copyright / Info */}
            <div className="absolute bottom-12 text-white/20 text-xs tracking-widest uppercase flex flex-col gap-2 items-center">
                <p>© 2024 NAV PRO. DESIGNED FOR IMMERSION.</p>
            </div>
        </footer>
    );
}
