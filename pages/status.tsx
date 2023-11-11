import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { pdf } from '@react-pdf/renderer';
import { saveAs } from "file-saver";
import Layout from "@/components/Layout";
import { EXAMINATION_NAME, baseUrl } from "@/constants";
import formatFormData from "@/utils/formatFormData";
import { Examination, ExaminationData } from "@/types";
import Button from "@/components/Button";
import { AdmitCard, ExaminationReceipt } from "@/components/AdmitCard";
import fetcher from "@/utils/fetcher";

export default function Status() {
    const [isAdmitCardDownloading, setIsAdmitCardDownloading] = useState(false);
    const [isReceiptDownloading, setIsReceiptDownloading] = useState(false);
    const router = useRouter();
    const { data, error, isLoading } = useSWR<ExaminationData>(
        router.query?.rollNo ? `${baseUrl}/examination-form/rgu-roll-no/${router.query?.rollNo}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    const formattedData: Examination = useMemo(() => {
        if (data) {
            return formatFormData(data);
        }
        return {} as Examination;
    }, [data]);

    useEffect(() => {
        if (!data && !isLoading && error?.status === 404) {
            router.replace(`/form?rollNo=${router.query?.rollNo}`);
        }
    }, [data, isLoading, error, router]);

    async function handleAdmitCardDownload() {
        try {
            setIsAdmitCardDownloading(true);
            const doc = (
                <AdmitCard
                    examinationName={EXAMINATION_NAME}
                    examination={formattedData}
                />
            );
            const asPdf = pdf();
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            saveAs(blob, `test_admit_card.pdf`);
        } catch (error) {

        } finally {
            setIsAdmitCardDownloading(false);
        }
    }

    async function handleReceiptDownload() {
        try {
            setIsReceiptDownloading(true);
            const doc = (
                <ExaminationReceipt
                    examinationName={EXAMINATION_NAME}
                    examination={formattedData}
                />
            );
            const asPdf = pdf();
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            saveAs(blob, `test_admit_card.pdf`);
        } catch (error) {

        } finally {
            setIsReceiptDownloading(false);
        }
    }

    if (Object.keys(formattedData).length === 0) return;

    return (
        <Layout>
            <div className="flex justify-center items-center h-[80dvh] px-4 md:p-0">
                <div className="md:w-[66vw] border border-gray-300 rounded-md p-4">
                    {
                        formattedData.status === "APPLIED" &&
                        (
                            <div className="flex flex-col gap-6 items-center">
                                <p className="text-lg font-bold">
                                    {
                                        formattedData.status === "APPLIED" &&
                                        "Your application for the examination has been received and is currently being reviewed"
                                    }
                                </p>
                                <div className="flex gap-4 flex-col md:flex-row">
                                    {
                                        (
                                            formattedData.status === "APPLIED" ||
                                            formattedData.status === "REAPPLIED" ||
                                            formattedData.status === "CANCELED"
                                            // || formattedData.falseAccepted
                                        ) &&
                                        (
                                            <Button
                                                onClick={() => {
                                                    router.push(`/form?rollNo=${formattedData.academicDetails.rguRollNo}`)
                                                }}
                                            >
                                                Edit Application
                                            </Button>
                                        )
                                    }
                                    <Button
                                        isLoading={isReceiptDownloading}
                                        isDisabled={isReceiptDownloading}
                                        onClick={handleReceiptDownload}
                                    >
                                        Download Application Receipt
                                    </Button>
                                    {
                                        (formattedData.status as string) === "ACCEPTED" &&
                                        (
                                            <Button
                                                isLoading={isAdmitCardDownloading}
                                                isDisabled={isAdmitCardDownloading}
                                                onClick={handleAdmitCardDownload}
                                            >
                                                Download Admit Card
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    );
}