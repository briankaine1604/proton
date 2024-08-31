import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full h-full max-w-screen-xl px-3 md:px-20 sm:px-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
