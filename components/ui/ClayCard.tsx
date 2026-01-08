import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface ClayCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    variant?: "default" | "hoverable" | "flat";
}

export function ClayCard({
    children,
    className,
    variant = "default",
    ...props
}: ClayCardProps) {
    return (
        <motion.div
            className={cn(
                "clay-card p-6 transition-all duration-300",
                variant === "hoverable" && "hover:-translate-y-2 hover:shadow-2xl hover:bg-white/70 cu-p",
                className
            )}
            initial={variant === "hoverable" ? { opacity: 0, y: 20 } : undefined}
            animate={variant === "hoverable" ? { opacity: 1, y: 0 } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
}
