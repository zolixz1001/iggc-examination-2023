import Button from "@/components/Button";
import Layout from "@/components/Layout";
import PersonalDetails from "@/components/PersonalDetails";
import PhotoAndSignature from "@/components/PhotoAndSignature";
import AcademicDetails from "@/components/AcademicDetails";
import SubjectCombination from "@/components/SubjectCombination";
import DocumentUpload from "@/components/DocumentUpload";

export default function Form() {
    return (
        <Layout bgColor="bg-gray-200">
            <div className="p-8 h-full w-full flex justify-center">
                <div className="max-w-[720px] w-full">
                    <div
                        className="bg-white w-full  rounded-md shadow-sm p-8 flex flex-col justify-between"
                    >
                        <div>
                            <h1 className="text-2xl font-bold">Examination Form</h1>
                            <div className="border-t border-gray-300 my-4 shadow-sm" />
                            <PersonalDetails position={1} />
                            <PhotoAndSignature position={2} />
                            <AcademicDetails position={3} />
                            <SubjectCombination position={4} />
                            <DocumentUpload position={5} />
                        </div>
                        <div>
                            <div className="border-t border-gray-300 my-4 shadow-sm" />
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => console.log('Submit')}
                                    isDisabled
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}