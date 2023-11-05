import { MouseEventHandler } from "react";

export default function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (option: string) => void }) {
  return (
    <div className="flex items-center space-x-4">
      {
        options.map((option, index) => (
          <Option
            key={index}
            value={option}
            isChecked={value === option}
            onClick={() => onChange(option)}
          />
        ))
      }
    </div>
  );
}

export function Option({
  value, onClick,
  isChecked,
  isDisabled
}: {
  value: string;
  onClick: MouseEventHandler<HTMLDivElement>,
  isChecked?: boolean;
  isDisabled?: boolean;
}) {
  return (
    <div className={`relative ${isDisabled ? "cursor-not-allowed" : ""}`} onClick={onClick}>
      <input
        type="radio"
        id={value}
        name="gender"
        value={value}
        className="hidden"
      />
      <label htmlFor={value} className="cursor-pointer flex items-center">
        <span className="w-4 h-4 border rounded-full flex items-center justify-center border-gray-300 hover:border-blue-400 mr-2">
          <span className={`w-2 h-2 bg-blue-500 rounded-full ${isChecked ? "opacity-100" : "opacity-0"}`}></span>
        </span>
        <span className="capitalize">{value}</span>
      </label>
    </div>
  )
}
