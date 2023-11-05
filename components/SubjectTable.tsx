import { ReactNode } from "react";

export default function SubjectTable({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr className="bg-blue-500">
                        <th className="whitespace-nowrap px-4 py-1 font-medium text-white w-5">
                            Select
                        </th>
                        <th className="whitespace-nowrap px-4 py-1 font-medium text-white w-10">
                            Code
                        </th>
                        <th className="whitespace-nowrap px-4 py-1 font-medium text-white">
                            Paper
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {children}
                </tbody>
            </table>
        </div>
    )
}