import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = ""
}: ButtonProps) {
  const base = "px-4 py-2 rounded font-bold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-black",
    secondary: "bg-warm-stone-secondary text-black border border-warm-stone-border hover:bg-warm-stone-border focus:ring-warm-stone-border",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={twMerge(base, variants[variant], disabled || loading ? "opacity-60 cursor-not-allowed" : "", className)}
    >
      {loading ? <span className="animate-pulse">...</span> : children}
    </button>
  );
}
