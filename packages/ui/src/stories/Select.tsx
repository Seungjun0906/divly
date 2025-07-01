import { ChevronDown } from "lucide-react";

export interface SelectProps {
  /** Select variant style */
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  /** How large should the select be? */
  size?: "sm" | "md" | "lg";
  /** Placeholder text */
  placeholder?: string;
  /** Select options */
  options: { value: string; label: string; icon?: string }[];
  /** Current selected value */
  value?: string;
  /** Is disabled? */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Change handler */
  onChange?: (value: string) => void;
}

/** High-quality Select component for dividend calculator using Tailwind */
export const Select = ({
  variant = "default",
  size = "md",
  placeholder = "옵션을 선택해주세요",
  options = [],
  value,
  disabled = false,
  className = "",
  onChange,
  ...props
}: SelectProps) => {
  // Base classes
  const baseClasses = [
    "w-full",
    "appearance-none",
    "bg-white",
    "border-2",
    "rounded-xl",
    "font-medium",
    "transition-all",
    "duration-200",
    "outline-none",
    "cursor-pointer",
    "focus:ring-2",
    "focus:ring-offset-1",
  ];

  // Size classes
  const sizeClasses = {
    sm: ["text-xs", "py-2", "px-3", "pr-8", "h-8"],
    md: ["text-sm", "py-3", "px-4", "pr-10", "h-10"],
    lg: ["text-base", "py-4", "px-5", "pr-12", "h-12"],
  };

  // Variant classes
  const variantClasses = {
    default: [
      "border-gray-200",
      "text-gray-700",
      "hover:border-gray-300",
      "focus:border-gray-500",
      "focus:ring-gray-200",
    ],
    primary: [
      "border-primary-300",
      "text-gray-700",
      "hover:border-primary-400",
      "hover:bg-primary-50",
      "focus:border-primary-500",
      "focus:ring-primary-200",
    ],
    success: [
      "border-success-300",
      "text-gray-700",
      "hover:border-success-400",
      "hover:bg-success-50",
      "focus:border-success-500",
      "focus:ring-success-200",
    ],
    warning: [
      "border-warning-300",
      "text-gray-700",
      "hover:border-warning-400",
      "hover:bg-warning-50",
      "focus:border-warning-500",
      "focus:ring-warning-200",
    ],
    danger: [
      "border-danger-300",
      "text-gray-700",
      "hover:border-danger-400",
      "hover:bg-danger-50",
      "focus:border-danger-500",
      "focus:ring-danger-200",
    ],
  };

  // Disabled classes
  const disabledClasses = disabled
    ? [
        "opacity-60",
        "cursor-not-allowed",
        "bg-gray-50",
        "border-gray-200",
        "text-gray-400",
        "hover:border-gray-200",
        "hover:bg-gray-50",
      ]
    : [];

  // Combine all classes
  const selectClasses = [
    ...baseClasses,
    ...sizeClasses[size],
    ...variantClasses[variant],
    ...disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Icon size based on select size
  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  // Icon position classes
  const iconPositionClasses = {
    sm: "right-2",
    md: "right-3",
    lg: "right-4",
  };

  return (
    <div className="relative inline-block min-w-[200px]">
      <select
        className={selectClasses}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.icon ? `${option.icon} ${option.label}` : option.label}
          </option>
        ))}
      </select>

      {/* Custom Dropdown Arrow */}
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 ${iconPositionClasses[size]}`}
      >
        <ChevronDown size={iconSize[size]} />
      </div>
    </div>
  );
};
