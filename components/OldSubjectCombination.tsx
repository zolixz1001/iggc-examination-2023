import { useMemo } from "react";
import SubjectTable from "@/components/SubjectTable";
import Checkbox from "@/components/Checkbox";
import { useOldCombinationStore, useAcademicDetailsStore } from "@/store/form";
import { ROMAN_NUMERIC_MAP } from "@/constants";
import {SubjectDetails  } from "@/types";
import oldPattern from "@/data/old.json";

export default function OldSubjectCombination() {
    const programme = useAcademicDetailsStore((state) => state.programme);
    const semesters = useOldCombinationStore((state) => state.semesters);
    const update = useOldCombinationStore((state) => state.update);

    return semesters.map((item) => (
        <div key={item.semester}>
            <label className="block text-md font-medium mb-2">Semester {ROMAN_NUMERIC_MAP[(item.semester)]} {item.isBack ? "(Back)" : ""}</label>
            <SemesterCombination
                semester={item.semester}
                programme={programme}
                selected={item.subjects}
                onChange={value => update(item.semester, value)}
            />
        </div>
    ));
}

function SemesterCombination(
    {
        programme,
        semester,
        selected,
        onChange
    }:
        {
            programme: string;
            semester: string | number;
            selected: SubjectDetails[];
            onChange: (value: SubjectDetails[]) => void;
        }
) {
    const data = useMemo(() => {
        return (oldPattern as any)[programme][semester] as SubjectDetails[];
    }, [programme, semester]);

    return (
        <SubjectTable>
            {
                data.map((item, index) => (
                    <tr key={index}>
                        <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                            <Checkbox
                                onClick={() => {
                                    onChange(
                                        selected.findIndex(el => el.code === item.code && el.paper === item.paper) !== -1 ?
                                            selected.filter((el) => el.code !== item.code && el.paper !== item.paper) :
                                            [...selected, item]
                                    );
                                }}
                                isChecked={selected.findIndex(el => el.code === item.code && el.paper === item.paper) !== -1}
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
    );

};