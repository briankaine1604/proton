import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import React from "react";

const monteserrat = Montserrat({ subsets: ["latin"] });

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function Heading({ children, className }: Props) {
  return (
    <div
      className={cn(
        "font-semibold tracking-wide",
        className,
        monteserrat.className
      )}
    >
      {children}
    </div>
  );
}
