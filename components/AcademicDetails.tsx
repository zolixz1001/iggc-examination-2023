import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import FormSectionHeder from "@/components/FormSectionHeader";
import Input from "@/components/Input";
import RadioGroup from "@/components/RadioGroup";
import Checkbox from "@/components/Checkbox";
import { useAcademicDetailsStore } from "@/store/form";
import { CURRENT_SEMESTERS } from "@/constants";

const semesters = CURRENT_SEMESTERS;
const examinationPatterns = ["NEP", "CBCS", "OLD"];

export default function AcademicDetails({ position, isEdit }: { position: number; isEdit: boolean; }) {
    const router = useRouter();
    const rguRollNo = useAcademicDetailsStore((state) => state.rguRollNo);
    const rguRegNo = useAcademicDetailsStore((state) => state.rguRegNo);
    const programme = useAcademicDetailsStore((state) => state.programme);
    const semester = useAcademicDetailsStore((state) => state.semester);
    const selectedSemesters = useAcademicDetailsStore((state) => state.semesters);
    const applyingForImprovement = useAcademicDetailsStore((state) => state.applyingForImprovement);
    const applyingForBackPapers = useAcademicDetailsStore((state) => state.applyingForBackPapers);
    const haveBackPapers = useAcademicDetailsStore((state) => state.haveBackPapers);
    const examinationPattern = useAcademicDetailsStore((state) => state.examinationPattern);
    const update = useAcademicDetailsStore((state) => state.update);
    const [isExpanded, setIsExpanded] = useState(false);
    const patterns = useMemo(() => {
        if (applyingForImprovement || applyingForBackPapers) {
            return examinationPatterns.filter(el => el !== "NEP").map(el => el === "OLD" ? "old pattern" : el);
        } else if (semester) {
            if (Number(semester) === 1) {
                return ["NEP"];
            } else if (Number(semester) === 3 || Number(semester) === 5) {
                return examinationPatterns.filter(el => el !== "NEP" && el !== "OLD").map(el => el === "OLD" ? "old pattern" : el);
            }
        }
        return [];
    }, [semester, applyingForImprovement, applyingForBackPapers]);
    const selectedPattern = useMemo(() => {
        if (examinationPattern === "OLD") {
            return "old pattern";
        }
        return examinationPattern;
    }, [examinationPattern]);
    useEffect(() => {
        if (typeof  router.query?.rollNo === "string") {
            update("rguRollNo", router.query.rollNo);
        }
    }, [router.query.rollNo, update]);

    return (
        <>
            <FormSectionHeder
                title="Academic Details"
                position={position}
                isExpanded={isExpanded}
                isDone={isEdit}
                onClick={() => setIsExpanded(prevState => !prevState)}
            />
            <div className={`p-4 flex-col gap-6 ${isExpanded ? "flex" : "hidden"}`}>
                <Input
                    isDisabled={isEdit}
                    id="rguRollNo"
                    label="RGU Roll No."
                    value={rguRollNo}
                    onChange={(e) => update("rguRollNo", e.target.value)}
                />
                <Input
                    id="rguRegNo"
                    label="RGU Reg No."
                    value={rguRegNo}
                    onChange={(e) => update("rguRegNo", e.target.value)}
                />
                <Checkbox
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        update("applyingForImprovement", !applyingForImprovement);
                        update("applyingForBackPapers", false);
                        update("semester", "");
                        update("semesters", []);
                        update("examinationPattern", "");
                        update("haveBackPapers", false);
                    }}
                    isChecked={applyingForImprovement}
                    label="Only Applying improvement"
                />
                <Checkbox
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        update("applyingForBackPapers", !applyingForBackPapers)
                        update("applyingForImprovement", false);
                        update("semesters", []);
                        update("semester", "");
                        update("examinationPattern", "");
                        update("haveBackPapers", false);
                    }}
                    isChecked={applyingForBackPapers}
                    label="Only Applying for back papers"
                />
                <div>
                    <label className="block text-md font-medium mb-2">Select Programme</label>
                    <RadioGroup
                        options={["b.a", "b.com", "b.sc"]}
                        value={programme}
                        onChange={value => update("programme", value)}
                    />
                </div>
                <div>
                    <label className="block text-md font-medium mb-2">
                        Select{" "}
                        {
                            (
                                applyingForBackPapers ||
                                applyingForImprovement
                            ) ?
                                "Semesters" :
                                "Semester"
                        }
                    </label>
                    {
                        (
                            applyingForBackPapers ||
                            applyingForImprovement
                        ) ?
                            (
                                <div className="flex gap-4">
                                    {
                                        semesters.map(sem => (
                                            <Checkbox
                                                key={sem}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    update("semester", "");
                                                    update("semesters", selectedSemesters.includes(sem) ? selectedSemesters.filter(el => el !== sem) : [...selectedSemesters, sem]);
                                                }}
                                                isChecked={selectedSemesters.includes(sem)}
                                                label={sem}
                                            />
                                        ))
                                    }
                                </div>
                            ) :
                            (
                                <>
                                    <RadioGroup
                                        options={semesters}
                                        value={semester}
                                        onChange={value => {
                                            update("semester", value);
                                            update("examinationPattern", "");
                                            update("haveBackPapers", false);
                                            update("semesters", []);
                                        }}
                                    />
                                    {
                                        semester &&
                                        Number(semester) > 2 &&
                                        (
                                            <div className="mt-2">
                                                <Checkbox
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        update("haveBackPapers", !haveBackPapers);
                                                        update("semesters", []);
                                                    }}
                                                    isChecked={haveBackPapers}
                                                    label="Do you have back papers in previous semester?"
                                                />
                                            </div>
                                        )
                                    }
                                    {
                                        haveBackPapers &&
                                        (
                                            <div>
                                                <label className="block text-md font-medium mt-2 mb-2">Back Semesters</label>
                                                <div className="flex gap-4">
                                                    {
                                                        (Number(semester) === 3 ? ["1"]: ["1", "3"]).map(sem => (
                                                            <Checkbox
                                                                key={sem}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    update("semesters", selectedSemesters.includes(sem) ? selectedSemesters.filter(el => el !== sem) : [...selectedSemesters, sem]);
                                                                }}
                                                                isChecked={selectedSemesters.includes(sem)}
                                                                label={sem}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            )
                    }
                    {
                        patterns.length > 0 &&
                        (
                            <div>
                                <label className="block text-md font-medium mb-2">Select Examination Pattern</label>
                                <RadioGroup
                                    options={patterns}
                                    value={selectedPattern}
                                    onChange={value => update("examinationPattern", value === "old pattern" ? "OLD" : value)}
                                />
                                <div
                                    className="mx-2 my-4 border border-gray-400 rounded-md shadow-sm p-2 bg-blue-100"
                                >
                                    <p className="font-bold text-sm">Note:</p>
                                    <ul className="pl-1">
                                        <li className="text-sm">NEP: New Education Policy</li>
                                        <li className="text-sm">CBCS: Credit Base Course System</li>
                                        <li className="text-sm">Old Pattern: Old Semester System Pattern</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}