import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartFaviconProps {
    url: string;
    title: string;
    className?: string;
    customIcon?: string;
}

export function SmartFavicon({ url, title, className, customIcon }: SmartFaviconProps) {
    const [sourceIndex, setSourceIndex] = useState(0);
    const [error, setError] = useState(false);

    // Get hostname safely
    const getHostname = (url: string) => {
        try {
            return new URL(url).hostname;
        } catch {
            return "";
        }
    };

    const hostname = getHostname(url);

    // Favicon sources priority list
    const sources = [
        // Source 0: Custom Override (if provided)
        ...(customIcon ? [() => customIcon] : []),

        // Source 1: Xinac API (User recommended, high reliability for CN sites)
        // Prioritized as per user request for pan666.net and others
        () => `https://api.xinac.net/icon/?url=${encodeURIComponent(url)}`,

        // Source 2: Direct /favicon.ico (Native speed, most accurate if exists)
        // Works for most sites even with CORS (img tag opacity is fine)
        () => {
            try {
                return new URL('/favicon.ico', url).toString();
            } catch {
                return "";
            }
        },

        // Source 3: IoWen API (Best for CN sites)
        () => `https://api.iowen.cn/favicon/${hostname}.png`,

        // Source 4: Clearbit Logo API (Global, high quality, strict 404)
        () => `https://logo.clearbit.com/${hostname}`,

        // Source 5: Favicon.im (Fast global CDN)
        () => `https://favicon.im/${hostname}?larger=true`,

        // Source 6: Google S2 (The gold standard)
        () => `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`,

        // Source 6: DuckDuckGo (Fallback)
        () => `https://icons.duckduckgo.com/ip3/${hostname}.ico`,
    ];

    const currentSrc = sourceIndex < sources.length ? sources[sourceIndex]() : null;

    useEffect(() => {
        // Reset state when url changes
        setSourceIndex(0);
        setError(false);
    }, [url]);

    const handleError = () => {
        if (sourceIndex < sources.length - 1) {
            setSourceIndex((prev) => prev + 1);
        } else {
            setError(true);
        }
    };

    if (error || !hostname) {
        return (
            <div className={cn("flex items-center justify-center bg-white/5 text-white/40", className)}>
                <Globe className="w-1/2 h-1/2 opacity-50" />
            </div>
        );
    }

    return (
        <img
            src={currentSrc || ""}
            alt={`${title} icon`}
            className={cn("w-full h-full object-contain filter drop-shadow-sm transition-opacity duration-300", className)}
            onError={handleError}
            loading="lazy"
        />
    );
}
