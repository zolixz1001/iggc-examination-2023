import { ROMAN_NUMERIC_MAP } from "@/constants";
import {
  ExaminationData,
  Examination,
  NepSubjectCombination,
  OldCbcsSubjects,
  OldPaperDetails,
  CbcsSubjectCombination,
  OldSubjectCombination,
  Document,
  PaperDetails,
  SubjectDetails,
  CbcsSubjectCombinationInfo,
  NepSubjectCombinationInfo,
} from "@/types";
import cbcs from "@/data/cbcs.json";
import old from "@/data/old.json";

export default function formatFormData(data: ExaminationData) {
  const personalDetails = {
    name: data.name,
    fatherName: data.fatherName,
    dob: data.dob ? new Date(data.dob).toISOString() : data.dob,
    gender: data.gender,
    mobile: data.mobile,
    email: data.email,
  };
  const photoAndSignature = {
    photo: data.photo,
    signature: data.signature,
  };
  const semesters = [];
  if (
    (data.haveBackPapers || data.onlyHaveBackPapers) &&
    Array.isArray(data.backPaperSemesters)
  ) {
    semesters.push(...data.backPaperSemesters);
  } else if (data.onlyImprovementPapers) {
    semesters.push(...data.improvementSemesters!);
  }
  const academicDetails = {
    rguRollNo: data.rguRollNo,
    rguRegNo: data.rguRegNo,
    programme: data.programme,
    semester: data.semester || String(data.semester),
    semesters,
    applyingForBackPapers: data.onlyHaveBackPapers,
    applyingForImprovement: data.onlyImprovementPapers,
    haveBackPapers: data.haveBackPapers,
    examinationPattern: data.examinationPattern,
  };
  const documents: Document[] = [];
  if (data.currentSemesterPaymentReceipt) {
    documents.push({
      title: `Payment receipt for Semester ${ROMAN_NUMERIC_MAP[data.semester]}`,
      url: data.currentSemesterPaymentReceipt,
      info: {
        name: "receipt",
        semester: String(data.semester),
      },
    });
  }
  if (data.currentSemesterMarkSheet) {
    documents.push({
      title: `Mark sheet of Semester ${ROMAN_NUMERIC_MAP[data.semester]}`,
      url: data.currentSemesterMarkSheet,
      info: {
        name: "marksheet",
        semester: String(data.semester),
      },
    });
  }
  const nepSubjectCombinations: NepSubjectCombinationInfo[] = [];
  if (
    data.examinationPattern === "NEP" &&
    data.subjects &&
    !Array.isArray(data.subjects)
  ) {
    nepSubjectCombinations.push({
      semester: String(data.semester),
      combination: {
        major: (data.subjects as NepSubjectCombination).major,
        minor: (data.subjects as NepSubjectCombination).minor,
        mdc: (data.subjects as NepSubjectCombination).mdc,
        sec: (data.subjects as NepSubjectCombination).sec,
        aec: (data.subjects as NepSubjectCombination).aec,
        vac: (data.subjects as NepSubjectCombination).vac,
      },
      isBack: false
    });
  }
  const cbcsSubjectCombinations: CbcsSubjectCombinationInfo[] = [];
  if (data.examinationPattern === "CBCS") {
    if (
      !data.onlyImprovementPapers &&
      !data.onlyHaveBackPapers &&
      !Array.isArray(data.subjects)
    ) {
      cbcsSubjectCombinations.push({
        semester: String(data.semester),
        isBack: false,
        combination: {
          ...((data.subjects as unknown as OldCbcsSubjects).core && {
            core: (data.subjects as unknown as OldCbcsSubjects).core.papers.map(
              (el) => ({
                subject: (data.subjects as unknown as OldCbcsSubjects).core
                  .title,
                code: el.code,
                paper: el.title,
              })
            ),
          }),
          ...((data.subjects as unknown as OldCbcsSubjects).aecc && {
            aecc: {
              subject: "",
              code: (data.subjects as unknown as OldCbcsSubjects).aecc.code,
              paper: (data.subjects as unknown as OldCbcsSubjects).aecc.title,
            },
          }),
          ...((data.subjects as unknown as OldCbcsSubjects)
            .general_elective && {
            ge: {
              subject:
                (data.subjects as unknown as OldCbcsSubjects).general_elective
                  .subject || "",
              code: (data.subjects as unknown as OldCbcsSubjects)
                .general_elective.code,
              paper: (data.subjects as unknown as OldCbcsSubjects)
                .general_elective.title,
            },
          }),
          ...((data.subjects as unknown as OldCbcsSubjects)
            .skill_enhancement_course && {
            sec: {
              subject:
                (data.subjects as unknown as OldCbcsSubjects)
                  .skill_enhancement_course.subject || "",
              code: (data.subjects as unknown as OldCbcsSubjects)
                .skill_enhancement_course.code,
              paper: (data.subjects as unknown as OldCbcsSubjects)
                .skill_enhancement_course.title,
            },
          }),
        },
      });
    }
    if (
      data.haveBackPapers ||
      data.onlyHaveBackPapers ||
      data.onlyImprovementPapers
    ) {
      let papersDt: { [key: string]: PaperDetails } | null = null;
      if (
        data.onlyImprovementPapers &&
        typeof data?.improvementPapers !== "undefined"
      ) {
        papersDt = data.improvementPapers as unknown as {
          [key: string]: PaperDetails;
        };
      } else if (
        (data.haveBackPapers || data.onlyHaveBackPapers) &&
        typeof data?.backPapers !== "undefined"
      ) {
        papersDt = data.backPapers as unknown as {
          [key: string]: PaperDetails;
        };
      }
      if (typeof papersDt !== "undefined") {
        for (const semester of Object.keys(papersDt as Object)) {
          const dt = papersDt![semester] as PaperDetails;
          const cbcsSubjects = (cbcs as any)[data.programme][semester];
          const core: SubjectDetails[] = [];
          let aecc: SubjectDetails | null = null;
          let ge: SubjectDetails | null = null;
          let sec: SubjectDetails | null = null;
          for (const subject of dt.subjects) {
            for (const item of cbcsSubjects.core) {
              if (
                item.code === subject.code &&
                (
                  item.paper === subject.title ||
                  (
                    !item.paper &&
                    !subject.title
                  )
                )
              ) {
                core.push(item);
              }
            }
            for (const item of cbcsSubjects.aecc) {
              if (
                item.code === subject.code &&
                (
                  item.paper === subject.title ||
                  (
                    !item.paper &&
                    !subject.title
                  )
                )
              ) {
                aecc = item;
              }
            }
            for (const item of cbcsSubjects.ge) {
              if (
                item.code === subject.code &&
                (
                  item.paper === subject.title ||
                  (
                    !item.paper &&
                    !subject.title
                  )
                )
              ) {
                ge = item;
              }
            }
            for (const item of cbcsSubjects.sec) {
              if (
                item.code === subject.code &&
                (
                  item.paper === subject.title ||
                  (
                    !item.paper &&
                    !subject.title
                  )
                )
              ) {
                sec = item;
              }
            }
          }
          cbcsSubjectCombinations.push({
            combination: {
              core,
              aecc: aecc,
              ge: ge,
              sec: sec,
            },
            semester: semester,
            isBack: data.haveBackPapers || data.onlyHaveBackPapers,
          });
          documents.push({
            title: data.onlyImprovementPapers
              ? `Payment receipt for back paper of Semester ${ROMAN_NUMERIC_MAP[semester]}`
              : `Payment receipt for the improvement paper of Semester ${ROMAN_NUMERIC_MAP[semester]}`,
            url: papersDt![semester].paymentReceiptUrl,
            info: {
              name: "receipt",
              ...(data.haveBackPapers && {
                isBack: true,
              }),
              ...(data.onlyHaveBackPapers && {
                onlyBack: true,
              }),
              semester: semester,
            },
          });
          documents.push({
            title: data.onlyImprovementPapers
              ? `Mark sheet for the improvement paper of Semester ${ROMAN_NUMERIC_MAP[Number(semester)]
              }`
              : `Mark sheet for back paper of Semester ${ROMAN_NUMERIC_MAP[Number(semester)]
              }`,
            url: papersDt![semester].paymentReceiptUrl,
            info: {
              name: "marksheet",
              ...(data.haveBackPapers && {
                isBack: true,
              }),
              ...(data.onlyHaveBackPapers && {
                onlyBack: true,
              }),
              semester: semester,
            },
          });
        }
      }
    }
  }
  const oldSubjectCombinations: OldSubjectCombination[] = [];
  if (
    data.examinationPattern === "OLD" &&
    data.subjects &&
    Array.isArray(data.subjects)
  ) {
    if (!data.onlyHaveBackPapers && !data.onlyImprovementPapers) {
      oldSubjectCombinations.push({
        semester: String(data.semester),
        subjects: (data.subjects as OldPaperDetails[]).map((el) => ({
          code: el.code,
          paper: el.title,
          subject: el.subject || "",
        })),
        isBack: false,
      });
    }
    if (
      data.haveBackPapers ||
      data.onlyHaveBackPapers ||
      data.onlyImprovementPapers
    ) {
      let papersDt: { [key: string]: PaperDetails } | null = null;
      if (
        data.onlyImprovementPapers &&
        typeof data?.improvementPapers !== "undefined"
      ) {
        papersDt = data.improvementPapers as unknown as {
          [key: string]: PaperDetails;
        };
      } else if (
        (data.haveBackPapers || data.onlyHaveBackPapers) &&
        typeof data?.backPapers !== "undefined"
      ) {
        papersDt = data.backPapers as unknown as {
          [key: string]: PaperDetails;
        };
      }
      if (typeof papersDt !== "undefined") {
        for (const semester of Object.keys(papersDt as unknown as Object)) {
          const dt = papersDt![semester] as PaperDetails;
          const oldSubjects = (old as any)[data.programme][semester];
          for (const subject of dt.subjects) {
            const subjects: SubjectDetails[] = [];
            for (const item of oldSubjects) {
              if (
                (String(item.code).toLowerCase() ===
                  String(subject.code).toLowerCase() &&
                  String(item.paper).toLowerCase() ===
                  String(subject.title).toLowerCase()) ||
                (String(item.code).toLowerCase() ===
                  String(subject.code).toLowerCase() &&
                  !subject.title &&
                  !item.title)
              ) {
                subjects.push(item);
              }
            }
            oldSubjectCombinations.push({
              semester: String(semester),
              subjects,
              ...(data.haveBackPapers && {
                isBack: true,
              }),
              ...(data.onlyHaveBackPapers && {
                onlyBack: true,
              }),
              ...(data.onlyImprovementPapers && {
                isImprovement: true,
              }),
            });
          }
          documents.push({
            title: data.onlyImprovementPapers
              ? `Payment receipt for back paper of Semester ${ROMAN_NUMERIC_MAP[semester]}`
              : `Payment receipt for the improvement paper of Semester ${ROMAN_NUMERIC_MAP[semester]}`,
            url: papersDt![semester].paymentReceiptUrl,
            info: {
              name: "receipt",
              ...(data.haveBackPapers && {
                isBack: true,
              }),
              ...(data.onlyHaveBackPapers && {
                onlyBack: true,
              }),
              semester: semester,
            },
          });
          documents.push({
            title: data.onlyImprovementPapers
              ? `Mark sheet for the improvement paper of Semester ${ROMAN_NUMERIC_MAP[Number(semester)]
              }`
              : `Mark sheet for back paper of Semester ${ROMAN_NUMERIC_MAP[Number(semester)]
              }`,
            url: papersDt![semester].paymentReceiptUrl,
            info: {
              name: "marksheet",
              ...(data.haveBackPapers && {
                isBack: true,
              }),
              ...(data.onlyHaveBackPapers && {
                onlyBack: true,
              }),
              semester: semester,
            },
          });
        }
      }
    }
  }
  return {
    personalDetails,
    photoAndSignature,
    academicDetails,
    nepSubjectCombinations,
    cbcsSubjectCombinations,
    oldSubjectCombinations,
    documents,
    status: data.status,
    _id: data._id,
    createdOn: data.createdOn,
    receipt: data.receipt,
    falseAccepted: !!data.falseAccepted,
  } as unknown as Examination;
}
