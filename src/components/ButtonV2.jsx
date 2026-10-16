const ButtonV2 = ({
  children = "Click me",
  onClick,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  hoverColor = "hover:bg-blue-700",
  size = "md",
  rounded = "rounded-xl",
  className = "",
  disabled = false,
}) => {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        pointer-events-auto
        cursor-pointer
        inline-flex items-center justify-center gap-2
        font-semibold
        transition-all duration-300 ease-in-out
        hover:-translate-y-0.5 hover:shadow-lg
        active:translate-y-0 active:scale-95
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-blue-500
        disabled:cursor-not-allowed disabled:opacity-50
        disabled:hover:translate-y-0 disabled:hover:shadow-none
        ${sizes[size] || sizes.md}
        ${bgColor}
        ${textColor}
        ${hoverColor}
        ${rounded}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default ButtonV2;