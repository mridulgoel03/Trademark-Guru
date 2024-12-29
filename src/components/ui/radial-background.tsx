"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface RadialBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  [key: string]: any;
}

export const RadialBackground: React.FC<RadialBackgroundProps> = ({
  children,
  className = "",
  containerClassName = "",
  colors = ["#eaa133", "#f0c27b", "#1e3a8a", "#2563eb", "#93c5fd"],
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeed = () => (speed === "slow" ? 0.5 : 1);

  const initializeCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    const render = () => {
      time += getSpeed();

      const { width, height } = canvas;
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 2
      );

      // Cycle through colors
      colors.forEach((color, index) => {
        const normalizedValue = Math.min(Math.max((index + Math.sin(time / 100)) / colors.length, 0.0), 1.0);
        gradient.addColorStop(normalizedValue, color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  };

  useEffect(() => initializeCanvas(), []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-1]"
        style={{ filter: `blur(${blur}px)` }}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
