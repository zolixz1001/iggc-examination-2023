import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { submitForm, useAcademicDetailsStore } from "@/store/form";

export default function FormSubmitButton({ id = "" }: { id?: string; }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const rguRollNo = useAcademicDetailsStore((state) => state.rguRollNo);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const success = await submitForm(id);
            if (success) {
                router.push(`/status?rollNo=${rguRollNo}`);
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Button
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={handleSubmit}
        >
            Submit
        </Button>
    );
}