import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  const hoverEffect = hover ? "hover:shadow-xl hover:-translate-y-1" : "";
  
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ${hoverEffect} ${className}`}
    >
      {children}
    </div>
  );
}
