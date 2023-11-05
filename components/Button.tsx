import { ReactNode, MouseEventHandler } from "react";

export default function Button({
  children,
  onClick,
  isDisabled,
  size = "md"
}: {
    children: ReactNode,
    onClick: MouseEventHandler<HTMLDivElement>,
    isDisabled?: Boolean,
    size?: "sm" | "md"
  }) {
  return (
    <div
      onClick={(e) => !isDisabled && onClick(e)}
      className={` ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"} inline-block rounded border border-blue-600 bg-blue-600 ${size === "sm" ? "px-8 py-1.5 text-sm": "px-12 py-3 text-sm"} font-medium text-white`}
    >
      {children}
    </div>
  );
}
