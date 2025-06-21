import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "gradient-primary text-white shadow-glow-primary hover:scale-105 focus-visible:ring-primary-300",
        destructive:
          "bg-danger-500 text-white hover:bg-danger-600 focus-visible:ring-danger-300",
        outline:
          "border-2 border-primary-200 bg-transparent hover:bg-primary-50 hover:text-primary-900 focus-visible:ring-primary-300",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-300",
        ghost:
          "hover:bg-primary-50 hover:text-primary-900 focus-visible:ring-primary-300",
        link: "text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-300",
        accent:
          "gradient-accent text-white shadow-glow-accent hover:scale-105 focus-visible:ring-accent-300",
        success:
          "gradient-success text-white hover:scale-105 focus-visible:ring-success-300",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
