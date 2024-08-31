import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#820001] text-white hover:bg-[#680000] border-transparent transition-colors duration-300",
        inverted:
          "bg-white text-[#820001] border border-[#820001] hover:bg-[#820001] hover:text-white transition-colors duration-300",
        destructive:
          "bg-red-600 text-white hover:bg-red-500 transition-colors duration-300",
        outline:
          "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 transition-colors duration-300",
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300",
        ghost:
          "bg-transparent text-[#820001] hover:bg-[#820001]/10 transition-colors duration-300",
        link: "text-[#820001] underline-offset-4 hover:underline transition-colors duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
