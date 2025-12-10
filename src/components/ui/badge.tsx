import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-border",
        success: "border-transparent bg-success text-primary-foreground",
        warning: "border-transparent bg-warning text-foreground",
        ocean: "border-transparent gradient-ocean text-primary-foreground",
        coral: "border-transparent bg-accent text-accent-foreground",
        glass: "bg-card/50 backdrop-blur-md border-border/50 text-foreground",
        xp: "border-transparent bg-warning text-foreground font-bold",
        streak: "border-transparent bg-accent text-accent-foreground font-bold",
        debris: "border-transparent bg-ocean-medium/20 text-ocean-deep dark:text-ocean-light font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
