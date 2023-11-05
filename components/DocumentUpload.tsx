import { useState } from "react";
import FormSectionHeder from "@/components/FormSectionHeader";
import UploadInput from "@/components/UploadInput";
import { useDocumentStore } from "@/store/form";

export default function DocumentUpload({ position }: { position: number; }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const documents = useDocumentStore((state) => state.documents);
    const update = useDocumentStore((state) => state.update);

    console.log(documents)

    return (
        <>
            <FormSectionHeder
                title="Documents"
                position={position}
                isExpanded={isExpanded}
                onClick={() => setIsExpanded(prevState => documents.length === 0 ? false : !prevState)}
            />
            <div className={`p-4 flex-col gap-6 ${isExpanded ? "flex" : "hidden"}`}>
                <div className="flex flex-col gap-4 flex-wrap">
                    {
                        documents.map((document) => (
                            <UploadInput
                                key={document.title}
                                label={document.title}
                                className="h-[420px]"
                                value={document.url}
                                onChange={(value: string) => update(documents.map(el => el.title === document.title ? ({ ...el, url: value }) : el))}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
}