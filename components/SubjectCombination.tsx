import { useState } from "react";
import FormSectionHeder from "@/components/FormSectionHeader";
import NepSubjectCombination from "@/components/NepSubjectCombination";
import CbcsSubjectCombination from "@/components/CbcsSubjectCombination";
import OldSubjectCombination from "@/components/OldSubjectCombination";
import { useAcademicDetailsStore } from "@/store/form";

export default function SubjectCombination({ position }: { position: number; }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const examinationPattern = useAcademicDetailsStore((state) => state.examinationPattern);

    return (
        <>
            <FormSectionHeder
                title="Subject Combination"
                position={position}
                isExpanded={isExpanded}
                onClick={() => setIsExpanded(prevState => !prevState)}
            />
            <div className={`p-4 flex-col gap-6 ${isExpanded ? "flex" : "hidden"}`}>
                {
                    examinationPattern === "NEP" &&
                    <NepSubjectCombination />
                }
                {
                    examinationPattern === "CBCS" &&
                    (
                        <CbcsSubjectCombination />
                    )
                }
                {
                    examinationPattern === "OLD" &&
                    (
                        <OldSubjectCombination />
                    )
                }
            </div>
        </>
    );
}