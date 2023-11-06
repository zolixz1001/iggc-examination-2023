import { useMemo } from "react";
import SubjectTable from "@/components/SubjectTable";
import Checkbox from "@/components/Checkbox";
import { SubjectDetails, useCbcsSubjectCombination, CbcsSubjectCombination } from "@/store/form";
import { useAcademicDetailsStore } from "@/store/form";
import cbcs from "@/data/cbcs.json";
import { ROMAN_NUMERIC_MAP } from "@/constants";

export default function CbcsSubjectCombination() {
    const programme = "b.a";
    const semesters = useCbcsSubjectCombination((state) => state.semesters);
    const update = useCbcsSubjectCombination((state) => state.update);
    const applyingForImprovement = useAcademicDetailsStore((state) => state.applyingForImprovement);
    const applyingForBackPapers = useAcademicDetailsStore((state) => state.applyingForBackPapers);

    return semesters.map((item) => (
        <div key={item.semester}>
            <label className="block text-md font-medium mb-2">Semester {ROMAN_NUMERIC_MAP[(item.semester)]} {item.isBack ? "(Back)" : ""}</label>
            <SemesterCombination
                semester={item.semester}
                programme={programme}
                selected={item.combination}
                onChange={value => update(item.semester, value)}
                isBack={!!item.isBack || applyingForImprovement || applyingForBackPapers}
            />
        </div>
    ));
}

function SemesterCombination(
    {
        programme,
        semester,
        selected,
        onChange,
        isBack
    }:
        {
            programme: string;
            semester: string | number;
            selected: CbcsSubjectCombination;
            onChange: (value: CbcsSubjectCombination) => void;
            isBack?: boolean;
        }
) {
    const data = useMemo(() => {
        return (cbcs as any)[programme][semester] as { core: SubjectDetails[]; aecc: SubjectDetails[]; ge: SubjectDetails[]; sec: SubjectDetails[]; };
    }, [programme, semester]);

    return (
        <>
            {
                data.core.length > 0 &&
                (
                    <div>
                        <label className="block text-md font-medium mb-2">Core Course</label>
                        <SubjectTable>
                            {
                                data.core.map((item, index) => (
                                    <tr key={index}>
                                        <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                                            <Checkbox
                                                onClick={() => {
                                                    if (isBack) {
                                                        onChange({
                                                            ...selected,
                                                            core: selected.core.findIndex(el => el.code === item.code && el.paper === item.paper) !== -1 ?
                                                                selected.core.filter(el => el.code !== item.code && el.paper !== item.code) :
                                                                [...selected.core, item]
                                                        });
                                                    } else {
                                                        onChange({
                                                            ...selected,
                                                            core: [item, ...data.core.filter((el) => String(el.subject).toLowerCase() === String(item.subject).toLowerCase())]
                                                        });
                                                    }
                                                }}
                                                isChecked={selected.core.findIndex(el => el.code === item.code && el.paper === item.paper) !== -1}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-10">
                                            {item.code}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.paper}</td>
                                    </tr>
                                ))
                            }
                        </SubjectTable>
                        {
                            !isBack &&
                            (
                                <div
                                    className="mx-2 my-4 border border-gray-400 rounded-md shadow-sm p-2 bg-blue-100"
                                >
                                    <p className="font-bold text-sm">Note:</p>
                                    <ul className="pl-1">
                                        <li className="text-sm">When selecting one core course paper, all other papers from the same subject within the core course will be automatically chosen. On deselecting, the opposite action will occur.</li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                data.ge.length > 0 &&
                (
                    <div>
                        <label className="block text-md font-medium mb-2">Generic Elective</label>
                        <SubjectTable>
                            {
                                data.ge.map((item, index) => (
                                    <tr key={index}>
                                        <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                                            <Checkbox
                                                onClick={() => {
                                                    onChange({
                                                        ...selected,
                                                        ge: (!!selected.ge && selected.ge?.code === item.code && selected.ge?.paper === item.paper) ? null : item
                                                    });
                                                }}
                                                isChecked={!!selected.ge && selected.ge?.code === item.code && selected.ge?.paper === item.paper}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-10">
                                            {item.code}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.paper}</td>
                                    </tr>
                                ))
                            }
                        </SubjectTable>
                    </div>
                )
            }
            {
                data.sec.length > 0 &&
                (
                    <div>
                        <label className="block text-md font-medium mb-2">SEC(Skill Enhancement Course)</label>
                        <SubjectTable>
                            {
                                Array.isArray(data.sec) &&
                                data.sec.length > 0 &&
                                data.sec.map((item: SubjectDetails, index) => (
                                    <tr key={index}>
                                        <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                                            <Checkbox
                                                onClick={() => {
                                                    onChange({
                                                        ...selected,
                                                        sec: (!!selected.sec && selected.sec?.code === item.code && selected.sec?.paper === item.paper) ? null : item
                                                    });
                                                }}
                                                isChecked={!!selected.sec && selected.sec?.code === item.code && selected.sec?.paper === item.paper}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-10">
                                            {item.code}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.paper}</td>
                                    </tr>
                                ))
                            }
                        </SubjectTable>
                    </div>
                )
            }
            {
                data.aecc.length > 0 &&
                (
                    <div>
                        <label className="block text-md font-medium mb-2">AEC(Ability Enhancement Course)</label>
                        <SubjectTable>
                            {
                                data.aecc.map((item: SubjectDetails, index) => (
                                    <tr key={index}>
                                        <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                                            <Checkbox
                                                onClick={() => {
                                                    onChange({
                                                        ...selected,
                                                        aecc: (!!selected.aecc && selected.aecc?.code === item.code && selected.aecc?.paper === item.paper) ? null : item
                                                    });
                                                }}
                                                isChecked={!!selected.aecc && selected.aecc?.code === item.code && selected.aecc?.paper === item.paper}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-10">
                                            {item.code}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.paper}</td>
                                    </tr>
                                ))
                            }
                        </SubjectTable>
                    </div>
                )
            }
        </>
    );
}