import Button from "@/components/Button";

export default function FormSubmitButton() {
    return (
        <Button
            onClick={() => console.log('Submit')}
        >
            Submit
        </Button>
    );
}