import { MouseEventHandler } from "react";

export default function Checkbox({
    label,
    isChecked,
    onClick,
    isDisabled
}: {
    onClick: MouseEventHandler<HTMLLabelElement>;
    isChecked?: boolean;
    label?: string;
    isDisabled?: boolean;
}) {
    return (
        <div>
            <input id="myCheckbox" type="checkbox" className="hidden" />
            <label htmlFor="myCheckbox" className={`flex items-center ${isDisabled ? "cursor-not-allowed": "cursor-pointer"}`} onClick={onClick}>
                <div className={`w-5 h-5 rounded border border-gray-400  ${isChecked ? "bg-blue-400 text-white" : "bg-white"}  mr-2 flex items-center justify-center`}>
                    {
                        isChecked &&
                        (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        )
                    }
                </div>
                {label && label}
            </label>
        </div>
    )
}