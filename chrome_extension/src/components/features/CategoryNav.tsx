import { Category } from "@/data/links";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CategoryNavProps {
    categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
    const [activeId, setActiveId] = useState<string>(categories[0]?.id || "");
    const isManualScrolling = useRef(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const observer = new IntersectionObserver(
            (entries) => {
                // If we are scrolling manually (clicking a link), ignore observer updates
                if (isManualScrolling.current) return;

                // Sort intersecting entries by intersection ratio to find the most visible one
                const visibleEntries = entries.filter(entry => entry.isIntersecting);

                if (visibleEntries.length > 0) {
                    // Sort by ratio desc to find the one taking up most of the view
                    const mostVisible = visibleEntries.reduce((prev, current) => {
                        return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
                    });

                    // Debounce the state update
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        // Double check lock before setting state
                        if (!isManualScrolling.current) {
                            setActiveId(mostVisible.target.id);
                        }
                    }, 50);
                }
            },
            {
                // Focus detection on the center of the viewport (40% margin top/bottom)
                // This forces the observer to only care about what's in the middle 20% of screen
                rootMargin: "-40% 0px -40% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1]
            }
        );

        categories.forEach((category) => {
            const element = document.getElementById(category.id);
            if (element) observer.observe(element);
        });

        // Check for bottom of page to force-select last item
        const handleScroll = () => {
            if (isManualScrolling.current) return;

            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
            if (isBottom) {
                const lastId = categories[categories.length - 1]?.id;
                if (lastId) setActiveId(lastId);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeoutId);
        };
    }, [categories]);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Lock observer updates
            isManualScrolling.current = true;
            setActiveId(id);

            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            // Unlock after animation (approx 1s to be safe)
            setTimeout(() => {
                isManualScrolling.current = false;
            }, 1000);
        }
    };

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto md:max-w-[90%] pointer-events-none">
            <div className="pointer-events-auto relative">
                {/* Gradient fade on edges for scroll indication */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-10 rounded-l-2xl md:rounded-l-full" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-10 rounded-r-2xl md:rounded-r-full" />

                <div className="overflow-x-auto no-scrollbar bg-black/60 md:bg-black/40 backdrop-blur-2xl md:backdrop-blur-md border border-white/10 rounded-2xl md:rounded-full shadow-2xl transition-all duration-300 p-2 md:p-2">
                    <ul className="flex items-center gap-2 md:gap-1 px-2 md:px-0 min-w-max">
                        {categories.map((category) => (
                            <li key={category.id} className="relative z-10 flex-shrink-0">
                                <button
                                    onClick={() => scrollToCategory(category.id)}
                                    className={cn(
                                        "relative px-3 py-3 md:px-4 md:py-2.5 rounded-xl md:rounded-full transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap",
                                        activeId === category.id
                                            ? "text-white md:text-gray-900"
                                            : "text-white/40 hover:text-white/80"
                                    )}
                                >
                                    {/* Desktop Active Background */}
                                    {activeId === category.id && (
                                        <motion.div
                                            layoutId="activeCategoryBg"
                                            className="hidden md:block absolute inset-0 bg-white shadow-lg rounded-full -z-10"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}

                                    {/* Mobile Active Indicator (Dot) */}
                                    {activeId === category.id && (
                                        <motion.div
                                            layoutId="activeCategoryDot"
                                            className={cn(
                                                "md:hidden absolute bottom-1.5 w-1 h-1 rounded-full shadow-[0_0_8px_currentColor]",
                                                category.color.replace('bg-', 'text-') // Hack to use text color for shadow/bg if needed, or just use bg-white
                                            )}
                                            style={{ backgroundColor: 'currentColor' }}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}

                                    {/* Icon/Color Indicator */}
                                    <div
                                        className={cn(
                                            "w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 hidden md:block",
                                            category.color,
                                            activeId === category.id ? "ring-2 md:ring-black/10 scale-110" : "opacity-70"
                                        )}
                                    />

                                    <span className={cn(
                                        "text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300",
                                        activeId === category.id ? "scale-105 font-bold" : "scale-100"
                                    )}>
                                        {category.name}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
