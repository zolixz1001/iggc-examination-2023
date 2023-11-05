import { useState, useMemo } from "react";
import DatePicker from "react-date-picker";
import FormSectionHeder from "@/components/FormSectionHeader";
import Input from "@/components/Input";
import RadioGroup from "@/components/RadioGroup";
import { usePersonalDetailsStore } from "@/store/form";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type DatePickerDate = Date | null;
type DatePickerDateValue = DatePickerDate | [DatePickerDate, DatePickerDate];

export default function PersonalDetails({ position }: { position: number }) {
    const name = usePersonalDetailsStore(state => state.name);
    const fatherName = usePersonalDetailsStore(state => state.fatherName);
    const mobile = usePersonalDetailsStore(state => state.mobile);
    const email = usePersonalDetailsStore(state => state.email);
    const gender = usePersonalDetailsStore(state => state.gender);
    const dob = usePersonalDetailsStore<DatePickerDateValue>(state => state.dob ? new Date(state.dob) : null);
    const update = usePersonalDetailsStore(state => state.update);
    const [isExpanded, setIsExpanded] = useState(true);
    return (
        <>
            <FormSectionHeder
                title="Personal Details"
                position={position}
                isExpanded={isExpanded}
                onClick={() => setIsExpanded(prevState => !prevState)}
            />
            <div className={`p-4 flex-col gap-6 ${isExpanded ? "flex" : "hidden"}`}>
                <Input
                    id="name"
                    label="Applicant Name"
                    value={name}
                    onChange={(e) => update("name", e.target.value)}
                />
                <Input
                    id="fatherName"
                    label="Father Name"
                    value={fatherName}
                    onChange={(e) => update("fatherName", e.target.value)}
                />
                <Input
                    id="mobile"
                    label="Mobile"
                    value={mobile}
                    onChange={(e) => update("mobile", e.target.value)}
                />
                <Input
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => update("email", e.target.value)}
                />
                <div>
                    <label className="block text-md font-medium mb-2">Date Of Birth</label>
                    <DatePicker
                        format="dd-MM-y"
                        onChange={(value) => update("dob", value instanceof Date ? value.toISOString() : "  ")}
                        value={dob}
                    />
                </div>
                <div>
                    <label className="block text-md font-medium mb-2">Select Gender</label>
                    <RadioGroup
                        options={["female", "male"]}
                        value={gender}
                        onChange={value => update("gender", value)}
                    />
                </div>
            </div>
        </>
    )
}