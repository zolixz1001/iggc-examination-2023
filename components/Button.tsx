import { ReactNode, MouseEventHandler } from "react";

export default function Button({
  children,
  onClick,
  isDisabled,
  size = "md",
  isLoading
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
  isDisabled?: Boolean;
  size?: "sm" | "md";
  isLoading?: boolean
}) {
  return (
    <div
      onClick={(e) => !isDisabled && onClick(e)}
      className={`flex ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"} inline-block rounded border border-blue-600 bg-blue-600 ${size === "sm" ? "px-8 py-1.5 text-sm" : "px-12 py-3 text-sm"} font-medium text-white`}
    >
      {
        isLoading &&
        (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )
      }
      <span className="text-center inline-block w-full">{children}</span>
    </div>
  );
}
