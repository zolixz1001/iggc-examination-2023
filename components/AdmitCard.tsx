import { ROMAN_NUMERIC_MAP } from '@/constants';
import { AcademicDetails, CbcsSubjectCombination, CbcsSubjectCombinationInfo, Examination, NepSubjectCombination, NepSubjectCombinationInfo, OldSubjectCombination, PersonalDetails, PhotoAndSignature, SubjectDetails } from '@/types';
import { Document, Page, Text, View, Image as PdfImage, Font, StyleSheet } from '@react-pdf/renderer';
import { Fragment, useMemo } from 'react';

Font.register({ family: 'Poppins', src: "/fonts/Poppins/Poppins-Regular.ttf" });
Font.register({ family: 'Poppins-Bold', src: "/fonts/Poppins/Poppins-Bold.ttf" });
Font.register({ family: 'Poppins-Semi-Bold', src: "/fonts/Poppins/Poppins-SemiBold.ttf" });
Font.register({ family: 'Poppins-Italic', src: "/fonts/Poppins/Poppins-Italic.ttf" });

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFFFF',
        padding: 12,
        flexDirection: 'row',
        fontFamily: "Poppins",
        fontSize: 11
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        height: 86,
        width: "100%",
        alignItems: "center",
        flexDirection: 'column',
        backgroundColor: 'white',
        overflow: 'hidden',
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: "red"
        marginBottom: 8
    },
    uniText: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: "Poppins-Bold",
        color: "#4299E1",
        textTransform: "uppercase",
    },
    admitCardText: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: "Poppins-Bold",
        color: "#888",
        textDecoration: "underline",
    },
    examinationNameText: {
        fontSize: 11,
        textAlign: 'right',
        fontWeight: 'bold',
        fontFamily: "Poppins-Bold",
        color: "#000",
        textDecoration: "underline",

    },
    logo: {
        width: 46,
        height: 52,
    },
    studentBasicDetailsContainer: {
        height: 120,
        width: "100%",
        padding: 2,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    studentImage: {
        width: 102,
        height: 120
    },
    studentDetailsBlock: {
        marginLeft: 4
    },
    studentDetailTextBlock: {
        marginBottom: 4,
        flexDirection: "row"
    },
    studentDetailTextLabel: {
        textTransform: 'uppercase',
    },
    studentDetailTextValue: {
        textTransform: 'capitalize',
        fontWeight: "semibold",
        fontFamily: "Poppins-Semi-Bold",
        marginLeft: 2
    },
    subHeadingText2xl: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Poppins-Bold",
        textDecoration: "underline",
        marginVertical: 2
    },
    subHeadingTextLg: {
        fontSize: 12,
        fontWeight: "semibold",
        fontFamily: "Poppins-Semi-Bold",
        textDecoration: "underline",
        marginVertical: 1
    },
    paperText: {
        fontSize: 10,
        padding: 1,
        textTransform: "capitalize"
    },
    boldText: {
        fontSize: 10,
        fontWeight: "semibold",
        fontFamily: "Poppins-Semi-Bold",
    },
    signaturesContainer: {
        height: 70,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingBottom: 1,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 8,
    },
    studentSignatureBlock: {
        width: 120,
    },
    studentSignatureImage: {
        height: 42,
        width: 102
    },
    coeSignatureImage: {
        height: 46,
        width: 32
    },
    principalSignatureBlock: {
        width: 140,
    },
    borderNoTop: {
        borderWidth: 1,
        borderColor: "#888",
        borderTopWidth: 0
    },
    borderNoBottom: {
        borderWidth: 1,
        borderColor: "#888",
        borderBottomWidth: 0
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    }
});

export const Header = ({ examinationName, title = "Admit Card" }: { examinationName: string; title?: string; }) => (
    <View style={styles.header}>
        <View style={[styles.center, { marginVertical: 4 }]}>
            <PdfImage
                src={"/images/RGU_logo.png"}
                style={styles.logo}
            />
        </View>
        <View>
            <Text style={styles.uniText}>Rajiv Gandhi University</Text>
        </View>
        <View>
            <Text style={styles.admitCardText}>{title}</Text>
        </View>
        <View style={{ width: "100%" }}>
            <Text style={styles.examinationNameText}>{examinationName}</Text>
        </View>
    </View>
);

export const SignaturesContainer = ({ signatureLink }: { signatureLink: string }) => {
    return (
        <View style={styles.signaturesContainer}>
            <View style={styles.studentSignatureBlock}>
                <View style={styles.center}>
                    <PdfImage
                        src={signatureLink}
                        style={styles.studentSignatureImage}
                    />
                </View>
                <Text>Signature of Student</Text>
            </View>
            <View style={styles.principalSignatureBlock}>
                <View style={styles.center}>
                    <PdfImage
                        src={"/images/coe_sign.png"}
                        style={styles.coeSignatureImage}
                    />
                </View>
                <Text>Controller of Examination</Text>
            </View>
        </View>
    )
};

const PaperColumnHeader = () => (
    <View style={styles.row}>
        <Text style={[styles.boldText, { textDecoration: "underline" }, { marginRight: 64 }]}>CODE</Text>
        <Text style={[styles.boldText, { textDecoration: "underline" }]}>PAPER</Text>
    </View>
);

const PaperColumnDt = ({ code, paper }: { code: string; paper: string; }) => (
    <View style={styles.row}>
        <Text style={[styles.paperText, { maxWidth: 80, width: 80 }]}>{code}</Text>
        <Text style={styles.paperText}>{paper}</Text>
    </View>
)

interface OldSubjectInfo {
    semester: string;
    subjects: SubjectDetails[];
    isBack?: boolean;
};
export const OldSubjectCombinationContent = ({
    oldSubjectCombination,
    academicDetails,
}: {
    oldSubjectCombination: OldSubjectCombination[];
    academicDetails: AcademicDetails;
}) => {
    const regular: OldSubjectInfo | undefined = useMemo(() => {
        if (!academicDetails.applyingForBackPapers && !academicDetails.applyingForImprovement) {
            return oldSubjectCombination.find(el => {
                return Number(el.semester) === Number(academicDetails.semester);
            });
        }
    }, [academicDetails.applyingForBackPapers, academicDetails.applyingForImprovement, academicDetails.semester, oldSubjectCombination]);
    const backsImprovements: OldSubjectInfo[] = useMemo(() => {
        if (academicDetails.haveBackPapers || academicDetails.applyingForBackPapers || academicDetails.applyingForImprovement) {
            return oldSubjectCombination.filter(el => academicDetails.semesters.findIndex((semester) => Number(semester) === Number(el.semester)) !== -1);
        }
        return [];
    }, [academicDetails.applyingForBackPapers, academicDetails.applyingForImprovement, academicDetails.haveBackPapers, academicDetails.semesters, oldSubjectCombination]);

    return (
        <View>
            {
                regular &&
                regular?.subjects?.length > 0 &&
                (
                    <>
                        <Text style={styles.subHeadingText2xl}>Regular Papers</Text>
                        <PaperColumnHeader />
                        {
                            regular.subjects.map((el, i) => (
                                <PaperColumnDt
                                    key={i}
                                    code={el.code}
                                    paper={el.paper}
                                />
                            ))
                        }
                    </>
                )
            }
            {
                backsImprovements.length > 0 &&
                (
                    <Fragment>
                        {
                            (
                                academicDetails.applyingForBackPapers ||
                                academicDetails.haveBackPapers
                            ) &&
                            (
                                <Text style={styles.subHeadingText2xl}>
                                    Back Papers
                                </Text>
                            )
                        }
                        {
                            academicDetails.applyingForImprovement &&
                            (
                                <Text style={styles.subHeadingText2xl}>
                                    Improvement Papers
                                </Text>
                            )
                        }
                        {
                            backsImprovements.map((item, index) => (
                                <Fragment key={index}>
                                    <Text style={[styles.boldText, { textDecoration: "underline" }]}>Semester {ROMAN_NUMERIC_MAP[item.semester]}</Text>
                                    <PaperColumnHeader />
                                    {
                                        item.subjects.map((el, i) => (
                                            <PaperColumnDt
                                                key={i}
                                                code={el.code}
                                                paper={el.paper}
                                            />
                                        ))
                                    }
                                </Fragment>
                            ))
                        }
                    </Fragment>
                )
            }
        </View>
    )
}

export const CbcsSubjectCombinationContent = (
    {
        academicDetails,
        cbcsSubjectCombination
    }:
        {
            academicDetails: AcademicDetails,
            cbcsSubjectCombination: CbcsSubjectCombinationInfo[]
        }
) => {
    const regular: CbcsSubjectCombinationInfo | undefined = useMemo(() => {
        if (!academicDetails.applyingForBackPapers && !academicDetails.applyingForImprovement) {
            return cbcsSubjectCombination.find((el) => {
                return Number(el.semester) === Number(academicDetails.semester);
            });
        }
    }, [academicDetails.applyingForBackPapers, academicDetails.applyingForImprovement, academicDetails.semester, cbcsSubjectCombination]);
    const backsImprovements: CbcsSubjectCombinationInfo[] = useMemo(() => {
        if (academicDetails.haveBackPapers || academicDetails.applyingForBackPapers || academicDetails.applyingForImprovement) {
            return cbcsSubjectCombination.filter(el => academicDetails.semesters.findIndex((semester) => Number(semester) === Number(el.semester)) !== -1);
        }
        return [];
    }, [academicDetails.applyingForBackPapers, academicDetails.applyingForImprovement, academicDetails.haveBackPapers, academicDetails.semesters, cbcsSubjectCombination]);

    return (
        <View>
            {
                regular &&
                regular.combination &&
                (
                    <>
                        <Text style={styles.subHeadingText2xl}>Regular Papers</Text>
                        <PaperColumnHeader />
                        {
                            Object.keys(regular.combination).map(key => {
                                const combinationKey = key as keyof CbcsSubjectCombination;
                                if (!regular.combination[combinationKey]) return null;
                                if (combinationKey === "core") {
                                    return regular.combination[combinationKey].map((el, i) => (
                                        <PaperColumnDt
                                            key={i}
                                            code={el.code}
                                            paper={el.paper}
                                        />
                                    ))
                                }
                                return (
                                    <PaperColumnDt
                                        key={key}
                                        code={(regular.combination[combinationKey] as SubjectDetails)?.code}
                                        paper={(regular.combination[combinationKey] as SubjectDetails)?.paper}
                                    />
                                )
                            })
                        }
                    </>
                )
            }
            {
                backsImprovements.length > 0 &&
                (
                    <Fragment>
                        {
                            (
                                academicDetails.applyingForBackPapers ||
                                academicDetails.haveBackPapers
                            ) &&
                            (
                                <Text style={styles.subHeadingText2xl}>
                                    Back Papers
                                </Text>
                            )
                        }
                        {
                            academicDetails.applyingForImprovement &&
                            (
                                <Text style={styles.subHeadingText2xl}>
                                    Improvement Papers
                                </Text>
                            )
                        }
                        {
                            backsImprovements.map((item, index) => (
                                <Fragment key={index}>
                                    <Text style={[styles.boldText, { textDecoration: "underline" }]}>Semester {ROMAN_NUMERIC_MAP[item.semester]}</Text>
                                    <PaperColumnHeader />
                                    {
                                        item.combination &&
                                        Object.keys(item.combination).map(key => {
                                            const combinationKey = key as keyof CbcsSubjectCombination;
                                            if (!item.combination[combinationKey]) return null;
                                            if (combinationKey === "core") {
                                                return item.combination[combinationKey].map((el, i) => (
                                                    <PaperColumnDt
                                                        key={i}
                                                        code={el.code}
                                                        paper={el.paper}
                                                    />
                                                ))
                                            }
                                            return (
                                                <PaperColumnDt
                                                    key={key}
                                                    code={(item.combination[combinationKey] as SubjectDetails)?.code}
                                                    paper={(item.combination[combinationKey] as SubjectDetails)?.paper}
                                                />
                                            )
                                        })
                                    }
                                </Fragment>
                            ))
                        }
                    </Fragment>
                )
            }
        </View>
    );
}

export const NepSubjectCombinationContent = (
    {
        academicDetails,
        nepSubjectCombinations
    }:
        {
            academicDetails: AcademicDetails,
            nepSubjectCombinations: NepSubjectCombinationInfo[]
        }
) => {
    const regular: NepSubjectCombinationInfo | undefined = useMemo(() => {
        if (!academicDetails.applyingForBackPapers && !academicDetails.applyingForImprovement) {
            return nepSubjectCombinations.find((el) => {
                return Number(el.semester) === Number(academicDetails.semester);
            });
        }
    }, [academicDetails.applyingForBackPapers, academicDetails.applyingForImprovement, academicDetails.semester, nepSubjectCombinations]);
    const backsImprovements: NepSubjectCombinationInfo[] = useMemo(() => {
        if (academicDetails.haveBackPapers || academicDetails.applyingForBackPapers || academicDetails.applyingForImprovement) {
            return nepSubjectCombinations.filter(el => academicDetails.semesters.findIndex((semester) => Number(semester) === Number(el.semester)) !== -1);
        }
        return [];
    }, [academicDetails.applyingForBackPapers, academicDetails.applyingForImprovement, academicDetails.haveBackPapers, academicDetails.semesters, nepSubjectCombinations]);
    return (
        <View>
            {
                regular &&
                regular.combination &&
                (
                    <>
                        <Text style={styles.subHeadingText2xl}>Regular Papers</Text>
                        <PaperColumnHeader />
                        {
                            Object.keys(regular.combination).map(key => {
                                const combinationKey = key as keyof NepSubjectCombination;
                                if (!regular.combination[combinationKey]) return null;
                                return (
                                    <PaperColumnDt
                                        key={key}
                                        code={(regular.combination[combinationKey] as SubjectDetails)?.code}
                                        paper={(regular.combination[combinationKey] as SubjectDetails)?.paper}
                                    />
                                )
                            })
                        }
                        {
                            backsImprovements.length > 0 &&
                            (
                                <Fragment>
                                    {
                                        (
                                            academicDetails.applyingForBackPapers ||
                                            academicDetails.haveBackPapers
                                        ) &&
                                        (
                                            <Text style={styles.subHeadingText2xl}>
                                                Back Papers
                                            </Text>
                                        )
                                    }
                                    {
                                        academicDetails.applyingForImprovement &&
                                        (
                                            <Text style={styles.subHeadingText2xl}>
                                                Improvement Papers
                                            </Text>
                                        )
                                    }
                                    {
                                        backsImprovements.map((item, index) => (
                                            <Fragment key={index}>
                                                <Text style={[styles.boldText, { textDecoration: "underline" }]}>Semester {ROMAN_NUMERIC_MAP[item.semester]}</Text>
                                                <PaperColumnHeader />
                                                {
                                                    item.combination &&
                                                    Object.keys(item.combination).map(key => {
                                                        const combinationKey = key as keyof NepSubjectCombination;
                                                        if (!item.combination[combinationKey]) return null;
                                                        return (
                                                            <PaperColumnDt
                                                                key={key}
                                                                code={(item.combination[combinationKey] as SubjectDetails)?.code}
                                                                paper={(item.combination[combinationKey] as SubjectDetails)?.paper}
                                                            />
                                                        )
                                                    })
                                                }
                                            </Fragment>
                                        ))
                                    }
                                </Fragment>
                            )
                        }
                    </>
                )
            }
        </View>
    );
}

export const StudentBasicDetails = ({
    personDetails,
    academicDetails,
    photoAndSignature
}: {
    personDetails: PersonalDetails;
    academicDetails: AcademicDetails;
    photoAndSignature: PhotoAndSignature;
}) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <View style={styles.studentBasicDetailsContainer}>
                <View style={styles.studentDetailsBlock}>
                    <View style={styles.studentDetailTextBlock}>
                        <Text style={styles.studentDetailTextLabel}>RGU Roll No.:</Text>
                        <Text style={styles.studentDetailTextValue}>{academicDetails.rguRollNo}</Text>
                    </View>
                    <View style={styles.studentDetailTextBlock}>
                        <Text style={styles.studentDetailTextLabel}>RGU Reg. No.:</Text>
                        <Text style={styles.studentDetailTextValue}>{academicDetails.rguRegNo}</Text>
                    </View>
                    <View style={styles.studentDetailTextBlock}>
                        <Text style={styles.studentDetailTextLabel}>Name:</Text>
                        <Text style={styles.studentDetailTextValue}>{personDetails.name}</Text>
                    </View>
                    <View style={styles.studentDetailTextBlock}>
                        <Text style={styles.studentDetailTextLabel}>Gender:</Text>
                        <Text style={styles.studentDetailTextValue}>{personDetails.gender}</Text>
                    </View>
                    <View style={styles.studentDetailTextBlock}>
                        <Text style={styles.studentDetailTextLabel}>Father Name:</Text>
                        <Text style={styles.studentDetailTextValue}>{personDetails.fatherName}</Text>
                    </View>
                    <View style={styles.studentDetailTextBlock}>
                        <Text style={styles.studentDetailTextLabel}>Programme:</Text>
                        <Text style={[styles.studentDetailTextValue, { textTransform: 'uppercase' }]}>{academicDetails.programme}</Text>
                    </View>
                    {
                        !academicDetails.applyingForBackPapers &&
                        (
                            <View style={styles.studentDetailTextBlock}>
                                <Text style={styles.studentDetailTextLabel}>Semester:</Text>
                                <Text style={styles.studentDetailTextValue}>{ROMAN_NUMERIC_MAP[academicDetails.semester]}</Text>
                            </View>
                        )
                    }
                    <View style={styles.studentDetailTextBlock}>
                        <Text style={styles.studentDetailTextLabel}>Examination Center:</Text>
                        <Text style={[styles.studentDetailTextValue, { textTransform: 'uppercase' }]}>Indira Gandhi Government College, Tezu</Text>
                    </View>
                </View>
            </View>
            <PdfImage
                src={photoAndSignature.photo}
                style={styles.studentImage}
            />
        </View>
    );
};


export function AdmitCard({ examinationName, examination }: { examinationName: string; examination: Examination }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ width: "100%" }}>
                    <Header examinationName={examinationName} />
                    <StudentBasicDetails
                        personDetails={examination.personalDetails}
                        academicDetails={examination.academicDetails}
                        photoAndSignature={examination.photoAndSignature}
                    />
                    {
                        examination.academicDetails.examinationPattern === "OLD" &&
                        (
                            <OldSubjectCombinationContent
                                oldSubjectCombination={examination.oldSubjectCombinations}
                                academicDetails={examination.academicDetails}
                            />
                        )
                    }
                    {
                        examination.academicDetails.examinationPattern === "CBCS" &&
                        (
                            <CbcsSubjectCombinationContent
                                cbcsSubjectCombination={examination.cbcsSubjectCombinations}
                                academicDetails={examination.academicDetails}
                            />
                        )
                    }
                    {
                        examination.academicDetails.examinationPattern === "NEP" &&
                        (
                            <NepSubjectCombinationContent
                                nepSubjectCombinations={examination.nepSubjectCombinations}
                                academicDetails={examination.academicDetails}
                            />
                        )
                    }
                    <SignaturesContainer
                        signatureLink={examination.photoAndSignature.signature}
                    />
                </View>
            </Page>
        </Document>
    )
}

export function ExaminationReceipt({ examinationName, examination }: { examinationName: string; examination: Examination }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ width: "100%" }}>
                    <Header examinationName={examinationName} title="Examination Receipt" />
                    <StudentBasicDetails
                        personDetails={examination.personalDetails}
                        academicDetails={examination.academicDetails}
                        photoAndSignature={examination.photoAndSignature}
                    />
                    {
                        examination.academicDetails.examinationPattern === "OLD" &&
                        (
                            <OldSubjectCombinationContent
                                oldSubjectCombination={examination.oldSubjectCombinations}
                                academicDetails={examination.academicDetails}
                            />
                        )
                    }
                    {
                        examination.academicDetails.examinationPattern === "CBCS" &&
                        (
                            <CbcsSubjectCombinationContent
                                cbcsSubjectCombination={examination.cbcsSubjectCombinations}
                                academicDetails={examination.academicDetails}
                            />
                        )
                    }
                    {
                        examination.academicDetails.examinationPattern === "NEP" &&
                        (
                            <NepSubjectCombinationContent
                                nepSubjectCombinations={examination.nepSubjectCombinations}
                                academicDetails={examination.academicDetails}
                            />
                        )
                    }
                </View>
            </Page>
        </Document>
    )
}

