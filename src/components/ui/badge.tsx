import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom variants mapping to semantic colors
        primary: "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        success: "border-transparent bg-success/10 text-success hover:bg-success/20",
        warning: "border-transparent bg-warning/10 text-warning-foreground hover:bg-warning/20",
        error: "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20",
        // Risk levels
        high: "border-transparent bg-destructive/15 text-destructive hover:bg-destructive/25",
        medium: "border-transparent bg-warning/15 text-warning-foreground hover:bg-warning/25",
        low: "border-transparent bg-success/15 text-success hover:bg-success/25",
        resident: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
