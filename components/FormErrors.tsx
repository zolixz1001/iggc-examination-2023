import { useFormErrors } from "@/store/form";

export default function FormErrors() {
    const errors = useFormErrors((state) => state.errors);

    if (errors.length === 0) return null;
    return (
        <div role="alert" className="my-4 rounded border-s-4 border-red-500 bg-red-50 p-4">
            <strong className="block font-bold text-red-800 text-lg">Errors</strong>
            <div className="mt-2">
                <ul className="list-disc list-inside">
                    {
                        errors.map((error, index) => (
                            <li key={index} className="text-sm text-red-700">{error}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}