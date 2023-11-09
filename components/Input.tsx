import { ChangeEventHandler } from "react";

export default function Input({
  label,
  id,
  value,
  onChange,
  type = "text",
  error,
  isDisabled
}: {
  label: string;
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  error?: string;
  isDisabled?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`relative block rounded-md border ${error ? "border-red-500" : "border-gray-200"} shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600`}
      >
        <input
          type={type}
          id={id}
          value={value}
          disabled={isDisabled}
          onChange={onChange}
          className={`peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0  p-2 ${isDisabled ? "cursor-not-allowed opacity-75": ""}`}
          placeholder={label}
        />

        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          {label}
        </span>
      </label>
      {
        error &&
        (
          <p className="text-red-500 ml-2 mt-1 text-sm">{error}</p>
        )
      }
    </div>
  );
}
