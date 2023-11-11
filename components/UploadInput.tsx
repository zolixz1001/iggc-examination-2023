import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Button from "@/components/Button";
import { ChangeEvent, ChangeEventHandler, useRef } from "react";
import { uploadUrl } from "@/constants";

export default function UploadInput({
    value,
    onChange,
    className,
    label,
    maxSize = 500,
    imgWidth = 240,
    imgHeight = 340
}: {
    value: string;
    onChange: Function;
    label?: string;
    maxSize?: number;
    className?: string;
    imgWidth?: number;
    imgHeight?: number;
}) {
    const wrapperClasses = clsx("flex justify-center items-center border-2 border-dashed border-gray-200 rounded-md", className);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files instanceof FileList) {
            const file = e.target.files[0];
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                return alert("Supported files are .png or .jpeg or .jpg");
            } else if (file.size > (maxSize * 1000)) {
                return alert(`File size is greater than ${maxSize} kb`);
            } else {
                setIsLoading(true);
                const formData = new FormData();
                formData.append("file", file);
                fetch(
                    `${uploadUrl}/upload`,
                    {
                        method: "POST",
                        body: formData
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        onChange(data.url);
                    })
                    .catch(() => alert("Something went wrong on server. Please try again later"))
                    .finally(() => setIsLoading(false))
            }
        }
        if (inputRef.current?.value) inputRef.current.value = "";
    };

    if (value) {
        return (
            <div className="relative w-full">
                {label && (<label className="block text-md font-medium mb-2">{label}</label>)}
                <div className="absolute w-full z-10 flex justify-end overflow-hidden">
                    <div className="flex">
                        {/* <div className="bg-blue-500 text-white p-2 cursor-pointer flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>

                        </div> */}
                        <div
                            className="bg-red-500 text-white p-2 cursor-pointer  flex justify-center items-center"
                            onClick={() => onChange("")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>

                        </div>
                    </div>
                </div>
                <Image
                    src={value}
                    alt="photo"
                    width={imgWidth}
                    height={imgHeight}
                    className="object-contain w-full h-full"
                />
            </div>
        )
    }

    return (
        <div className="w-full">
            {label && (<label className="block text-md font-medium mb-2">{label}</label>)}
            <div className={wrapperClasses}>
                <input
                    hidden
                    multiple={false}
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleChange}
                />
                <div className="p-4">
                    <div className="flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-center text-sm mt-4 font-semibold">Choose an image (.jpg, .jpeg, .png) to upload</p>
                    <p className="text-center text-xs mt-2 font-thin text-gray-500">Maximum upload file size: {maxSize} KB</p>
                    <div className="mt-4 flex justify-center items-center">
                        <Button
                            size="sm"
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            onClick={() => inputRef.current?.click()}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}