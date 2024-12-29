import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface BackgroundGradientProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  children,
  className = "",
  containerClassName = "",
  animate = true,
}) => {
  const gradientStyle =
    "bg-[linear-gradient(45deg,#FF6B6B,#FFD700,#4CAF50,#1E90FF)]";

  const motionProps = animate
    ? {
        variants: {
          initial: { backgroundPosition: "0 50%", rotate: 0 },
          animate: {
            backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
            rotate: [0, 360],
          },
        },
        initial: "initial",
        animate: "animate",
        transition: {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        },
        style: { backgroundSize: "400% 400%" },
      }
    : {};

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        {...motionProps}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          gradientStyle
        )}
      />
      <motion.div
        {...motionProps}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-[1] will-change-transform",
          gradientStyle
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
