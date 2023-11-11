import { useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "@/components/Layout";
import PersonalDetails from "@/components/PersonalDetails";
import PhotoAndSignature from "@/components/PhotoAndSignature";
import AcademicDetails from "@/components/AcademicDetails";
import SubjectCombination from "@/components/SubjectCombination";
import DocumentUpload from "@/components/DocumentUpload";
import FormErrors from "@/components/FormErrors";
import FormSubmitButton from "@/components/FormSubmitButton";
import fetcher from "@/utils/fetcher";
import formatFormData from "@/utils/formatFormData";
import { setFormStates } from "@/store/form";
import { baseUrl } from "@/constants";
import { ExaminationData } from "@/types";

export default function Form() {
    const router = useRouter();
    const { data, isLoading } = useSWR<ExaminationData>(
        router.query?.rollNo ? `${baseUrl}/examination-form/rgu-roll-no/${router.query?.rollNo}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            errorRetryCount: 0
        }
    );

    useEffect(() => {
        if (data) {
            setFormStates(formatFormData(data));
        }
    }, [data]);

    return (
        <Layout bgColor="bg-gray-200">
            <div className="p-8 h-full w-full flex justify-center">
                <div className="max-w-[720px] w-full relative">
                    {
                        isLoading &&
                        (
                            <div
                                className="absolute w-full h-full z-10 flex justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                            >
                                <p className="text-white text-xl md:text-2xl font-semibold">
                                    Loading...
                                </p>
                            </div>
                        )
                    }

                    <FormErrors />
                    <div
                        className="bg-white w-full  rounded-md shadow-sm p-8 flex flex-col justify-between"
                    >
                        <div>
                            <h1 className="text-2xl font-bold">Examination Form</h1>
                            <div className="border-t border-gray-300 my-4 shadow-sm" />
                            <div className="flex flex-col gap-4">
                                <PersonalDetails position={1} isEdit={!!data?._id} />
                                <PhotoAndSignature position={2} isEdit={!!data?._id} />
                                <AcademicDetails position={3} isEdit={!!data?._id} />
                                <SubjectCombination position={4} isEdit={!!data?._id}  />
                                <DocumentUpload position={5} isEdit={!!data?._id} />
                            </div>
                        </div>
                        <div>
                            <div className="border-t border-gray-300 my-4 shadow-sm" />
                            <div className="flex justify-end">
                                <FormSubmitButton id={data?._id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}