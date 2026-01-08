"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SmartSearchBar() {
    const [query, setQuery] = useState("");
    const [engine, setEngine] = useState<"baidu" | "sogou" | "bing">("baidu");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const engines = {
        baidu: { name: "百度", url: "https://www.baidu.com/s?wd=", color: "text-blue-600" },
        sogou: { name: "搜狗", url: "https://www.sogou.com/web?query=", color: "text-orange-500" },
        bing: { name: "必应", url: "https://cn.bing.com/search?q=", color: "text-teal-600" },
    };

    const handleSearch = () => {
        if (!query.trim()) return;
        window.open(engines[engine].url + encodeURIComponent(query), "_blank");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const selectEngine = (key: "baidu" | "sogou" | "bing") => {
        setEngine(key);
        setIsDropdownOpen(false);
    };

    return (
        <motion.div
            className="relative w-full max-w-2xl mx-auto z-50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <div className="relative group flex items-center">

                {/* Engine Selector */}
                <div className="absolute left-1.5 z-10">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-0.5 md:gap-1 px-2 md:px-3 py-1.5 md:py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/90 text-xs md:text-sm font-medium focus:outline-none"
                    >
                        <span>{engines[engine].name}</span>
                        <div className={`w-0 h-0 border-l-[3px] md:border-l-[4px] border-l-transparent border-r-[3px] md:border-r-[4px] border-r-transparent border-t-[4px] md:border-t-[5px] border-t-white/70 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-20 md:w-24 py-1 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden flex flex-col">
                            {(Object.keys(engines) as Array<keyof typeof engines>).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => selectEngine(key)}
                                    className={cn(
                                        "px-3 md:px-4 py-1.5 md:py-2 text-left text-xs md:text-sm text-white/90 hover:bg-white/20 transition-colors",
                                        engine === key && "bg-white/10 font-bold"
                                    )}
                                >
                                    {engines[key].name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`在 ${engines[engine].name} 中搜索...`}
                    className="w-full pl-16 md:pl-24 pr-10 md:pr-12 py-3 md:py-4 text-left text-base md:text-lg text-white bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl hover:bg-white/15 hover:border-white/30 focus:bg-white/20 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 placeholder:text-white/40 tracking-wider font-light"
                />

                <button
                    onClick={handleSearch}
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                    <Search className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>
        </motion.div>
    );
}
