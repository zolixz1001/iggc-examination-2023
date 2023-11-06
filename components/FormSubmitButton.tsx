import { useState } from "react";
import Button from "@/components/Button";
import { submitForm } from "@/store/form";

export default function FormSubmitButton() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            await submitForm();
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