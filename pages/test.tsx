const student = {
    "_id": "654ee29d5f0b1e0ccaad2b93",
    "dob": "2003-04-02",
    "fatherName": "fga",
    "gender": "male",
    "name": "dafa",
    "rguRegNo": "REC_987653322_REC",
    "rguRollNo": "REC_987653322",
    "mobile": "9776543210",
    "email": "ka@lo.com",
    "onlyHaveBackPapers": false,
    "haveBackPapers": false,
    "onlyImprovementPapers": false,
    "programme": "b.a",
    "photo": "http://localhost:5555/BsQp0n9MS5YZIct3KWoX6Screenshot-2023-11-06-171038.png",
    "signature": "http://localhost:5555/gC34i_HpjkdRmHxGK7YJOScreenshot-2023-11-06-171038.png",
    "semester": 1,
    "subjects": {
        "major": {
            "subject": "Education",
            "code": "EDU-CC-1110",
            "paper": "Foundation of Education"
        },
        "minor": {
            "subject": "Education",
            "code": "EDU-MC-1110",
            "paper": "Introduction to Education"
        },
        "mdc": {
            "subject": "Education",
            "code": "EDU-MD-1110",
            "paper": "Foundation of Education"
        },
        "aec": {
            "subject": "English",
            "code": "ENG-AE-1110",
            "paper": "English Language & Communication Skills"
        },
        "sec": {
            "subject": "English",
            "code": "ENG-SE-0010",
            "paper": "English Language Teaching"
        },
        "vac": {
            "subject": "Environment Science",
            "code": "EVS-VA-1210",
            "paper": "Environmental Science"
        }
    },
    "currentSemesterPaymentReceipt": "http://localhost:5555/xozNGeyPIjlHnUSUDoMisScreenshot-2023-11-06-171038.png",
    "currentSemesterMarkSheet": "",
    "registrationCard": "http://localhost:5555/Z8-TIBCHW0IzId6pk2Lt4Screenshot-2023-11-06-170856.png",
    "courseType": "non-cbcs",
    "examinationPattern": "NEP",
    "status": "APPLIED",
    "createdOn": "2023-11-11T02:10:37.631Z",
    "modifiedOn": "2023-11-11T02:10:37.631Z",
    "receipt": 16996686376317572
};
import { PDFViewer } from '@react-pdf/renderer';
import { ExaminationReceipt } from "@/components/AdmitCard";
import { EXAMINATION_NAME } from '@/constants';
import formatFormData from '@/utils/formatFormData';

export default function Test() {
    return (
        <div className="h-[100dvh] w-full bg-red-400">
            <PDFViewer style={{ height: "100%", width: "100%" }}>
                <ExaminationReceipt examination={formatFormData(student)} examinationName={EXAMINATION_NAME} />
            </PDFViewer>
        </div>
    );
}