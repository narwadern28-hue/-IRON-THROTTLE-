import { type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useInView } from "../hooks";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left";
};

export default function Reveal({ children, className, delay = 0, variant = "up" }: Props) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(variant === "left" ? "reveal-left" : "reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
