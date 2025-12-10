import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WaveBackgroundProps {
  children: ReactNode;
  variant?: "top" | "bottom" | "both";
  className?: string;
}

export function WaveBackground({ children, variant = "bottom", className }: WaveBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {(variant === "top" || variant === "both") && (
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z"
              className="fill-background"
            />
          </svg>
        </div>
      )}
      {children}
      {(variant === "bottom" || variant === "both") && (
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          <svg
            className="absolute top-0 w-full"
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0L48 10C96 20 192 40 288 50C384 60 480 60 576 55C672 50 768 40 864 35C960 30 1056 30 1152 35C1248 40 1344 50 1392 55L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
              className="fill-background"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export function AnimatedWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 w-[200%] animate-wave"
        style={{ animationDuration: "8s" }}
        viewBox="0 0 2880 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60L80 55C160 50 320 40 480 45C640 50 800 70 960 75C1120 80 1280 70 1440 60C1600 50 1760 40 1920 45C2080 50 2240 70 2400 75C2560 80 2720 70 2800 65L2880 60V120H2800C2720 120 2560 120 2400 120C2240 120 2080 120 1920 120C1760 120 1600 120 1440 120C1280 120 1120 120 960 120C800 120 640 120 480 120C320 120 160 120 80 120H0V60Z"
          className="fill-primary/10"
        />
      </svg>
      <svg
        className="absolute bottom-0 w-[200%] animate-wave"
        style={{ animationDuration: "6s", animationDelay: "-2s" }}
        viewBox="0 0 2880 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80L80 75C160 70 320 60 480 55C640 50 800 50 960 55C1120 60 1280 70 1440 75C1600 80 1760 80 1920 75C2080 70 2240 60 2400 55C2560 50 2720 50 2800 55L2880 60V120H2800C2720 120 2560 120 2400 120C2240 120 2080 120 1920 120C1760 120 1600 120 1440 120C1280 120 1120 120 960 120C800 120 640 120 480 120C320 120 160 120 80 120H0V80Z"
          className="fill-primary/20"
        />
      </svg>
    </div>
  );
}
