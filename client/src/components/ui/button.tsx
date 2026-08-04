import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  children,
  ...props
}) => {
  const baseStyle = "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    outline: "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
    ghost: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-none",
    secondary: "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
