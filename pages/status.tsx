import { useMemo } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "@/components/Layout";
import { baseUrl } from "@/constants";
import formatFormData from "@/utils/formatFormData";

const fetcher = (url: string | URL) => fetch(url).then((res) => res.json());

export default function Status() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR(
        `${baseUrl}/examination-form/rgu-roll-no/${router.query?.rollNo || ""}`,
        fetcher
    );
    const formattedData = useMemo(() => {
        if (data) {
            return formatFormData(data);
        }
        return {};
    }, [data]);
    console.log(formattedData);

    return (
        <Layout>
            Status
        </Layout>
    );
}