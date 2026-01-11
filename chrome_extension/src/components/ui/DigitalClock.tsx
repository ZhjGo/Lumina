import { useEffect, useState } from "react";

export function DigitalClock() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
            setDate(
                now.toLocaleDateString("zh-CN", {
                    month: "long",
                    day: "numeric",
                    weekday: "long"
                })
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col items-center select-none w-full px-4">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-light text-white tracking-tight drop-shadow-2xl transition-all duration-300">
                {time}
            </h1>
            <p className="mt-2 text-sm sm:text-base md:text-xl text-white/80 font-medium tracking-widest uppercase opacity-90 drop-shadow-md transition-all duration-300">
                {date}
            </p>
        </div>
    );
}
