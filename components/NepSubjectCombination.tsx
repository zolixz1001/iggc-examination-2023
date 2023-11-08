import { useMemo } from "react";
import Checkbox from "@/components/Checkbox";
import { Option } from "@/components/RadioGroup";
import SubjectTable from "@/components/SubjectTable";
import { useNepCombinationStore, } from "@/store/form";
import nep from "@/data/nep.json";
import { ROMAN_NUMERIC_MAP } from "@/constants";
import { NepSubjectCombination, SubjectDetails } from "@/types";

export default function NepSubjectCombination() {
    const programme = "b.a";
    const semesters = useNepCombinationStore((state) => state.semesters);
    const update = useNepCombinationStore((state) => state.update);
    return semesters.map((item) => (
        <div key={item.semester}>
            <label className="block text-md font-medium mb-2">Semester {ROMAN_NUMERIC_MAP[(item.semester)]}</label>
            <SemesterCombination
                semester={item.semester}
                programme={programme}
                selected={item.combination}
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
            selected: NepSubjectCombination;
            onChange: (value: NepSubjectCombination) => void;
        }
) {
    const data = useMemo(() => {
        return (nep as any)[programme][semester] as { major: SubjectDetails[]; minor: SubjectDetails[]; mdc: SubjectDetails[]; sec: SubjectDetails[]; aec: SubjectDetails[]; vac: SubjectDetails[]; };
    }, [programme, semester]);

    return (
        <>
            <div>
                <label className="block text-md font-medium mb-2">Major Course</label>
                <SubjectTable>
                    {
                        data.major.map((item, index) => (
                            <tr key={index}>
                                <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                                    <Checkbox
                                        onClick={() => {
                                            onChange({
                                                ...selected,
                                                major: item,
                                                minor: data.minor.find(el => String(el.subject).toLowerCase() === String(item.subject).toLowerCase()) || null,
                                                mdc: data.mdc.find(el => String(el.subject).toLowerCase() === String(item.subject).toLowerCase()) || null
                                            });
                                        }}
                                        isChecked={!!selected.major && selected.major?.code === item.code && selected.major?.paper === item.paper}
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
            <div>
                <label className="block text-md font-medium mb-2">Minor Course</label>
                <SubjectTable>
                    {
                        data.minor.map((item, index) => (
                            <tr key={index}>
                                <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                                    <Checkbox
                                        onClick={() => { }}
                                        isDisabled
                                        isChecked={!!selected.minor && selected.minor?.code === item.code && selected.minor?.paper === item.paper}
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
                <div
                    className="mx-2 my-4 border border-gray-400 rounded-md shadow-sm p-2 bg-blue-100"
                >
                    <p className="font-bold text-sm">Note:</p>
                    <ul className="pl-1">
                        <li className="text-sm">The appropriate Minor course will be automatically selected upon choosing the Major course.</li>
                    </ul>
                </div>
            </div>
            <div>
                <label className="block text-md font-medium mb-2">MDC(Multidisciplinary Course)</label>
                <SubjectTable>
                    {
                        data.mdc.map((item, index) => (
                            <tr key={index}>
                                <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                                    <Checkbox
                                        onClick={() => { }}
                                        isDisabled
                                        isChecked={!!selected.mdc && selected.mdc?.code === item.code && selected.mdc?.paper === item.paper}
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
                <div
                    className="mx-2 my-4 border border-gray-400 rounded-md shadow-sm p-2 bg-blue-100"
                >
                    <p className="font-bold text-sm">Note:</p>
                    <ul className="pl-1">
                        <li className="text-sm">The appropriate Multidisciplinary Course (MDC) will be automatically selected upon choosing the Major course.</li>
                    </ul>
                </div>
            </div>
            <div>
                <label className="block text-md font-medium mb-2">SEC(Skill Enhancement Course)</label>
                <SubjectTable>
                    {
                        data.sec.map((item, index) => (
                            <tr key={index}>
                                <td className="sticky inset-y-0 start-0 bg-white pl-5  w-5">
                                    <Checkbox
                                        onClick={() => onChange({ ...selected, sec: item })}
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
            <div>
                <label className="block text-md font-medium mb-2">AEC(Ability Enhancement Course)</label>
                <div className="flex flex-col gap-2">
                    {
                        data.aec.map((item, index) => (
                            <Option
                                key={index}
                                onClick={() => onChange({ ...selected, aec: item })}
                                isChecked={!!selected.aec && selected.aec?.code === item.code && selected.aec?.paper === item.paper}
                                value={`[${item.code}] ${item.paper}`}
                            />
                        ))
                    }
                </div>
            </div>
            <div>
                <label className="block text-md font-medium mb-2">VAC(Value-Added Course)</label>
                <div className="flex flex-col gap-2">
                    {
                        data.vac.map((item, index) => (
                            <Option
                                key={index}
                                onClick={() => onChange({ ...selected, vac: item })}
                                isChecked={!!selected.vac && selected.vac?.code === item.code && selected.vac?.paper === item.paper}
                                value={`[${item.code}] ${item.paper}`}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
}
