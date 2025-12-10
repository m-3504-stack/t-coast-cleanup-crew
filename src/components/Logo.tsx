import { Waves } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} rounded-xl gradient-ocean flex items-center justify-center shadow-md`}>
        <Waves className="text-primary-foreground w-2/3 h-2/3 animate-wave" />
      </div>
      {showText && (
        <span className={`font-display font-bold ${textSizeClasses[size]} text-gradient-ocean`}>
          T-COAST
        </span>
      )}
    </div>
  );
}
