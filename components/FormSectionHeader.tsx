import { MouseEventHandler } from "react";

export default function FormSectionHeder({
    title,
    position,
    onClick,
    isDone,
    isExpanded
}: {
    title: string;
    position: number;
    onClick: MouseEventHandler<HTMLDivElement>;
    isDone?: boolean;
    isExpanded?: boolean;
}) {
    return (
        <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
            <div className={`flex gap-2 items-center ${isDone && "text-blue-400"}`}>
                <div className={`flex justify-center items-center border w-4 h-4 ${isDone ? "border-blue-400": "border-gray-500"} rounded-full text-sm`}>
                    {
                        isDone ?
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>

                            ) :
                            position

                    }
                </div>
                <p className="font-bold text-lg">{title}</p>
            </div>
            <div className={`${isExpanded ? "rotate-90" : ""}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </div>
        </div>
    );
}