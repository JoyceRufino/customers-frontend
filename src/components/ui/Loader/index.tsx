import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 24,
  color = "border-primary",
  className = "",
}) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-t-transparent ${color} ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
