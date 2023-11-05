import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Status() {
    const router = useRouter();
    
    useEffect(() => {
        router.push(`/form?rollNo=${router.query?.rollNo}`);
    }, [router]);

    return (
        <Layout>
            Status
        </Layout>
    );
}