import React, { FC, MouseEvent, FocusEvent } from "react";

interface ButtonProps {
  kind?: "primary" | "secondary";
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  iconLeft?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  tooltip?: string;
  style?: React.CSSProperties;
}

const Button: FC<ButtonProps> = ({
  kind = "primary",
  className = "",
  fullWidth = false,
  disabled = false,
  loading = false,
  label,
  iconLeft,
  icon,
  onClick,
  onFocus,
  onBlur,
  tooltip,
  style = {},
}) => {
  const baseClasses =
    "flex justify-center items-center gap-2 relative rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-200";
  const primaryClasses =
    "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600";
  const secondaryClasses =
    "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus-visible:outline-indigo-600";

  const loadingClasses = () => {
    if (kind === "primary") return "border-white-600";
    else if (kind === "secondary") return "border-indigo-600";
    else return "border-slate-600";
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      title={tooltip}
      className={`${baseClasses} ${
        kind === "primary" ? primaryClasses : secondaryClasses
      } ${fullWidth ? "w-full" : ""} ${className}`}
      style={style}
    >
      {iconLeft && <span className="">{iconLeft}</span>}
      {loading ? (
        <span className="absolute right-2 top-1/2 -translate-y-1/2">
          <div
            className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${loadingClasses()}`}
          ></div>
        </span>
      ) : (
        <></>
      )}
      {label && <span>{label}</span>}
      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
};

export default Button;
