import { useState } from "react";
import FormSectionHeder from "@/components/FormSectionHeader";
import UploadInput from "@/components/UploadInput";
import { usePhotoAndSignatureStore } from "@/store/form";

export default function PhotoAndSignature({ position }: { position: number }) {
    const photo = usePhotoAndSignatureStore((state) => state.photo);
    const signature = usePhotoAndSignatureStore((state) => state.signature);
    const update = usePhotoAndSignatureStore((state) => state.update);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <FormSectionHeder
                title="Photo And Signature"
                position={position}
                isExpanded={isExpanded}
                onClick={() => setIsExpanded(prevState => !prevState)}
            />
            <div className={`p-4 flex-col gap-6 ${isExpanded ? "flex" : "hidden"}`}>
                <div className="flex gap-4 flex-col lg:flex-row">
                    <UploadInput
                        label="Photo"
                        className="h-[320px]"
                        value={photo}
                        onChange={(value: string) => update("photo", value)}
                    />
                    <UploadInput
                        label="Signature"
                        className="h-[320px]"
                        value={signature}
                        onChange={(value: string) => update("signature", value)}
                    />
                </div>
            </div>
        </>
    );
}