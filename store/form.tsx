import { CURRENT_SEMESTERS, ROMAN_NUMERIC_MAP, baseUrl } from "@/constants";
import { create } from "zustand";
import {
  SubjectDetails,
  NepSubjectCombination,
  CbcsSubjectCombination,
  OldSubjectCombination,
  Document
} from "@/types";
import cbcs from "@/data/cbcs.json";

interface PersonalDetailsState {
  name: string;
  fatherName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  update: (key: string, value: string) => void;
}

export const usePersonalDetailsStore = create<PersonalDetailsState>((set) => ({
  name: "",
  fatherName: "",
  gender: "",
  mobile: "",
  email: "",
  dob: "",
  update: (key, value) => set((state) => ({ ...state, [key]: value })),
}));

interface PhotoAndSignatureState {
  photo: string;
  signature: string;
  update: (key: string, value: string) => void;
}

export const usePhotoAndSignatureStore = create<PhotoAndSignatureState>((set) => ({
  photo: "",
  signature: "",
  update: (key: string, value: string) => set((state) => ({ ...state, [key]: value }))
}));

interface AcademicDetailsState {
  rguRollNo: string;
  rguRegNo: string;
  programme: string;
  semester: string;
  semesters: string[];
  applyingForBackPapers: boolean;
  applyingForImprovement: boolean;
  haveBackPapers: boolean;
  examinationPattern: string;
  error: Record<string, string> | null;
  update: (key: string, value: string | boolean | string[]) => void;
}

export const useAcademicDetailsStore = create<AcademicDetailsState>((set) => ({
  rguRegNo: "",
  rguRollNo: "",
  programme: "",
  semester: "",
  semesters: [],
  applyingForBackPapers: false,
  applyingForImprovement: false,
  haveBackPapers: false,
  examinationPattern: "",
  error: null,
  update: (key: string, value: string | boolean | string[]) => set((state) => ({ ...state, [key]: value }))
}));
interface NepSubjectCombinationState {
  semesters: {
    semester: string;
    combination: NepSubjectCombination;
    isBack?: boolean;
  }[],
  error: Record<string, string> | null;
  update: (semester: string, value: NepSubjectCombination) => void;
}

export const useNepCombinationStore = create<NepSubjectCombinationState>((set) => ({
  semesters: [],
  error: null,
  update: (semester: string, value: NepSubjectCombination) => set((state) => ({
    ...state,
    semesters: state.semesters.map(el => {
      if (el.semester === semester) {
        return {
          ...el,
          combination: value
        }
      }
      return el;
    })
  }))
}));

interface CbcsSubjectCombinationState {
  semesters: {
    semester: string;
    combination: CbcsSubjectCombination;
    isBack?: boolean;
  }[];
  error: Record<string, string> | null;
  update: (semester: string, value: CbcsSubjectCombination) => void;
}

export const useCbcsSubjectCombination = create<CbcsSubjectCombinationState>((set) => ({
  semesters: [],
  error: null,
  update: (semester: string, value: CbcsSubjectCombination) => set((state) => ({
    ...state,
    semesters: state.semesters.map(el => {
      if (el.semester === semester) {
        return {
          ...el,
          combination: value
        }
      }
      return el;
    })
  }))
}));

interface OldSubjectCombinationState {
  semesters: OldSubjectCombination[];
  error: Record<string, string> | null;
  update: (semester: string, value: SubjectDetails[]) => void;
}

export const useOldCombinationStore = create<OldSubjectCombinationState>((set) => ({
  semesters: [],
  error: null,
  update: (semester: string, value: SubjectDetails[]) => set((state) => ({
    ...state,
    semesters: state.semesters.map(el => {
      if (el.semester === semester) {
        return {
          ...el,
          subjects: value
        }
      }
      return el;
    })
  }))
}));


interface DocumentState {
  documents: Document[];
  error: Record<string, string> | null;
  update: (value: Document[]) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  error: null,
  update: (value: Document[]) => set((state) => ({ ...state, documents: value }))
}));

function resetAndUpdateStates(
  {
    programme,
    semester,
    semesters,
    applyingForBackPapers,
    applyingForImprovement,
    examinationPattern,
    haveBackPapers
  }: {
    programme: string;
    semester: string;
    semesters: string[];
    applyingForBackPapers: boolean;
    applyingForImprovement: boolean;
    examinationPattern: string;
    haveBackPapers: boolean;
  }) {
  const documents: Document[] = [];
  const nepSubjectCombinationSemesters: { semester: string; combination: NepSubjectCombination; isBack?: boolean; }[] = [];
  const cbcsSubjectCombinationSemesters: { semester: string; combination: CbcsSubjectCombination; isBack?: boolean; }[] = [];
  const oldSubjectCombinationSemesters: { semester: string; subjects: SubjectDetails[]; isBack?: boolean; }[] = [];
  if (programme) {
    documents.push(
      {
        title: `RGU Registration Card`,
        url: "",
        info: {
          name: "reg",
        }
      }
    );
    if (applyingForImprovement || applyingForBackPapers) {
      if (semesters.length > 0) {
        if (applyingForImprovement) {
          for (const sem of semesters) {
            documents.push(
              {
                title: `Payment receipt for the improvement paper of Semester ${ROMAN_NUMERIC_MAP[sem]}`,
                url: "",
                info: {
                  name: "receipt",
                  isImprovement: true,
                  semester: sem
                }
              }
            );
            documents.push(
              {
                title: `Mark sheet for the improvement paper of Semester ${ROMAN_NUMERIC_MAP[Number(sem)]}`,
                url: "",
                info: {
                  name: "marksheet",
                  isImprovement: true,
                  semester: sem
                }
              }
            );
          }
        } else {
          for (const sem of semesters) {
            documents.push({
              title: `Payment receipt for the back paper of Semester ${ROMAN_NUMERIC_MAP[sem]}`,
              url: "",
              info: {
                name: "receipt",
                onlyBack: true,
                semester: sem
              }
            });
            documents.push({
              title: `Mark sheet for the back paper of Semester ${ROMAN_NUMERIC_MAP[Number(sem)]}`,
              url: "",
              info: {
                name: "marksheet",
                onlyBack: true,
                semester: sem
              }
            });
          }
        }
        if (examinationPattern === "NEP") {
          for (const sem of semesters) {
            nepSubjectCombinationSemesters.push({
              semester: String(sem),
              combination: {
                major: null,
                minor: null,
                mdc: null,
                aec: null,
                sec: null,
                vac: null
              }
            });
          }
        } else if (examinationPattern === "CBCS") {
          for (const sem of semesters) {
            cbcsSubjectCombinationSemesters.push({
              semester: String(sem),
              combination: {
                core: [],
                ge: null,
                sec: null,
                aecc: null,
              }
            });
          }
        } else if (examinationPattern === "OLD") {
          for (const sem of semesters) {
            oldSubjectCombinationSemesters.push({
              semester: String(sem),
              subjects: []
            });
          }
        }
      }
    } else if (semester) {
      documents.push(
        {
          title: `Payment receipt for Semester ${ROMAN_NUMERIC_MAP[semester]}`,
          url: "",
          info: {
            name: "receipt",
            semester
          }
        }
      );
      if (Number(semester) > 1) {
        documents.push(
          {
            title: `Mark sheet of Semester ${ROMAN_NUMERIC_MAP[Number(semester) - 1]}`,
            url: "",
            info: {
              name: "marksheet",
              semester
            }
          }
        );
      }
      if (haveBackPapers && semesters.length > 0) {
        for (const sem of semesters) {
          documents.push(
            {
              title: `Payment receipt for back paper of Semester ${ROMAN_NUMERIC_MAP[sem]}`,
              url: "",
              info: {
                name: "receipt",
                isBack: true,
                semester: sem
              }
            }
          );
          documents.push(
            {
              title: `Mark sheet for back paper of Semester ${ROMAN_NUMERIC_MAP[Number(sem)]}`,
              url: "",
              info: {
                name: "marksheet",
                isBack: true,
                semester: sem
              }
            }
          );
        }
      }
      if (examinationPattern === "NEP") {
        nepSubjectCombinationSemesters.push({
          semester: String(semester),
          combination: {
            major: null,
            minor: null,
            mdc: null,
            aec: null,
            sec: null,
            vac: null
          }
        });
        if (haveBackPapers && semesters.length > 0) {
          for (const sem of semesters) {
            nepSubjectCombinationSemesters.push({
              semester: String(sem),
              isBack: true,
              combination: {
                major: null,
                minor: null,
                mdc: null,
                aec: null,
                sec: null,
                vac: null
              }
            });
          }
        }
      } else if (examinationPattern === "CBCS") {
        cbcsSubjectCombinationSemesters.push({
          semester: String(semester),
          combination: {
            core: [],
            ge: null,
            sec: null,
            aecc: null,
          }
        });
        if (haveBackPapers && semesters.length > 0) {
          for (const sem of semesters) {
            cbcsSubjectCombinationSemesters.push({
              semester: String(sem),
              isBack: true,
              combination: {
                core: [],
                ge: null,
                sec: null,
                aecc: null,
              }
            });
          }
        }
      } else if (examinationPattern === "OLD") {
        oldSubjectCombinationSemesters.push({
          semester: String(semester),
          subjects: []
        });
        if (haveBackPapers && semesters.length > 0) {
          for (const sem of semesters) {
            oldSubjectCombinationSemesters.push({
              semester: String(sem),
              isBack: true,
              subjects: []
            });
          }
        }
      }
    }
  }
  useDocumentStore.setState({ ...useDocumentStore.getState(), documents });
  useNepCombinationStore.setState({ ...useNepCombinationStore.getState(), semesters: nepSubjectCombinationSemesters });
  useCbcsSubjectCombination.setState({ ...useCbcsSubjectCombination.getState(), semesters: cbcsSubjectCombinationSemesters });
  useOldCombinationStore.setState({ ...useOldCombinationStore.getState(), semesters: oldSubjectCombinationSemesters });
}

useAcademicDetailsStore.subscribe((state, prevState) => {
  if (state.programme !== prevState.programme) return resetAndUpdateStates({
    programme: state.programme,
    semester: state.semester,
    semesters: state.semesters,
    applyingForBackPapers: state.applyingForBackPapers,
    applyingForImprovement: state.applyingForImprovement,
    examinationPattern: state.examinationPattern,
    haveBackPapers: state.haveBackPapers
  });
  if (state.semester !== prevState.semester) return resetAndUpdateStates({
    programme: state.programme,
    semester: state.semester,
    semesters: state.semesters,
    applyingForBackPapers: state.applyingForBackPapers,
    applyingForImprovement: state.applyingForImprovement,
    examinationPattern: state.examinationPattern,
    haveBackPapers: state.haveBackPapers
  });
  if (state.semesters.some(el => !prevState.semesters.includes(el))) return resetAndUpdateStates({
    programme: state.programme,
    semester: state.semester,
    semesters: state.semesters,
    applyingForBackPapers: state.applyingForBackPapers,
    applyingForImprovement: state.applyingForImprovement,
    examinationPattern: state.examinationPattern,
    haveBackPapers: state.haveBackPapers
  });
  if (state.examinationPattern !== prevState.examinationPattern) return resetAndUpdateStates({
    programme: state.programme,
    semester: state.semester,
    semesters: state.semesters,
    applyingForBackPapers: state.applyingForBackPapers,
    applyingForImprovement: state.applyingForImprovement,
    examinationPattern: state.examinationPattern,
    haveBackPapers: state.haveBackPapers
  });
})

interface FormErrorsState {
  errors: string[];
  onError: (value: string[]) => void;
  onErrorReset: () => void;
}

export const useFormErrors = create<FormErrorsState>((set) => ({
  errors: [],
  onError: (value: string[]) => set((state) => ({ ...state, errors: value })),
  onErrorReset: () => set((state) => ({ ...state, errors: [] }))
}));

function isValidatedForm() {
  useFormErrors.setState({ ...useFormErrors.getState(), errors: [] });
  let isValid = true;
  const errors = [];
  // personal details
  const personalDetails = usePersonalDetailsStore.getState();
  if (!personalDetails.name || personalDetails.name.length < 2) {
    isValid = false;
    errors.push("Please enter applicant name");
  }
  if (!personalDetails.fatherName || personalDetails.fatherName.length < 2) {
    isValid = false;
    errors.push("Please enter applicant's father name");
  }
  if (!/^[6-9]\d{9}$/.test(personalDetails.mobile)) {
    isValid = false;
    errors.push("Please enter a valid mobile number");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email)) {
    isValid = false;
    errors.push("Please enter a valid email");
  }
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(personalDetails.dob)) {
    isValid = false;
    errors.push("Please select your data of birth");
  }
  if (!personalDetails.gender) {
    isValid = false;
    errors.push("Please select your gender");
  }
  if (!isValid) {
    useFormErrors.setState({ ...useFormErrors.getState(), errors });
    return isValid;
  }
  // photo and signature
  const photoAndSignature = usePhotoAndSignatureStore.getState();
  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(photoAndSignature.photo)) {
    isValid = false;
    errors.push("Please upload your photo");
  }
  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(photoAndSignature.signature)) {
    isValid = false;
    errors.push("Please upload your signature");
  }
  if (!isValid) {
    useFormErrors.setState({ ...useFormErrors.getState(), errors });
    return isValid;
  }
  // academic details
  const academicDetails = useAcademicDetailsStore.getState();
  if (!academicDetails.rguRollNo || academicDetails.rguRollNo.length < 8) {
    isValid = false;
    errors.push("Please enter a valid RGU Roll no.");
  }
  if (!academicDetails.rguRegNo || academicDetails.rguRegNo.length < 8) {
    isValid = false;
    errors.push("Please enter a valid RGU Registration no.");
  }
  if (!["b.a", "b.com", "b.sc"].includes(academicDetails.programme)) {
    isValid = false;
    errors.push("Please select a programme");
  }
  // regular
  if (!academicDetails.applyingForBackPapers && !academicDetails.applyingForImprovement) {
    if (!CURRENT_SEMESTERS.includes(String(academicDetails.semester))) {
      isValid = false;
      errors.push("Please select a semester");
    } else {
      if (academicDetails.haveBackPapers) {
        if (academicDetails.semesters.length === 0) {
          isValid = false;
          errors.push("Please select a back semester");
        }
      }
      if (!academicDetails.examinationPattern) {
        isValid = false;
        errors.push("Please select a examination pattern");
      }
    }
  } else {
    if (academicDetails.semesters.length === 0) {
      isValid = false;
      errors.push("Please select semesters");
    }
    if (!academicDetails.examinationPattern) {
      isValid = false;
      errors.push("Please select a examination pattern");
    }
  }
  if (!isValid) {
    useFormErrors.setState({ ...useFormErrors.getState(), errors });
    return isValid;
  }
  // subject combination
  // regular
  if (!academicDetails.applyingForBackPapers && !academicDetails.applyingForImprovement) {
    if (academicDetails.examinationPattern === "NEP") {
      const subjectCombination = useNepCombinationStore.getState();
      for (const semesterDetails of subjectCombination.semesters) {
        if (!semesterDetails.combination.major) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} Major course`);
        }
        if (!semesterDetails.combination.minor) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} Minor course`);
        }
        if (!semesterDetails.combination.mdc) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} MDC course`);
        }
        if (!semesterDetails.combination.sec) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} SEC`);
        }
        if (!semesterDetails.combination.aec) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} AEC`);
        }
        if (!semesterDetails.combination.vac) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} VAC`);
        }
      }
    } else if (academicDetails.examinationPattern === "CBCS") {
      const subjectCombination = useCbcsSubjectCombination.getState();
      for (const semesterDetails of subjectCombination.semesters) {
        // current semester
        if (Number(academicDetails.semester) === Number(semesterDetails.semester)) {
          const data = {
            core: [],
            aecc: [],
            ge: [],
            sec: []
          };
          if (cbcs && (cbcs as any)[academicDetails.programme] && (cbcs as any)[academicDetails.programme][academicDetails.semester]) {
            data.core = (cbcs as any)[academicDetails.programme][academicDetails.semester]?.core || [];
            data.aecc = (cbcs as any)[academicDetails.programme][academicDetails.semester]?.aecc || [];
            data.ge = (cbcs as any)[academicDetails.programme][academicDetails.semester]?.ge || [];
            data.sec = (cbcs as any)[academicDetails.programme][academicDetails.semester]?.sec || [];
          }
          if (data.core.length > 0 && (!semesterDetails.combination.core || semesterDetails.combination.core.length === 0)) {
            isValid = false;
            errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} Core courses`);
          }
          if (data.aecc.length > 0 && !semesterDetails.combination.aecc) {
            isValid = false;
            errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} AEC`);
          }
          if (data.aecc.length > 0 && !semesterDetails.combination.ge) {
            isValid = false;
            errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} GE`);
          }
        } else {
          if (
            (!semesterDetails.combination.core || semesterDetails.combination.core.length === 0) &&
            !semesterDetails.combination.aecc &&
            !semesterDetails.combination.ge &&
            !semesterDetails.combination.sec
          ) {
            isValid = false;
            errors.push(`Please select a Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} back subject`);
          }
        }
      }
    } else if (academicDetails.examinationPattern === "OLD") {
      const subjectCombination = useOldCombinationStore.getState();
      for (const semesterDetails of subjectCombination.semesters) {
        // current semester
        if (Number(academicDetails.semester) === Number(semesterDetails.semester)) {
          if (semesterDetails.subjects.length < 4) {
            isValid = false;
            errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} subjects`);
          }
        } else {
          if (semesterDetails.subjects.length < 1) {
            isValid = false;
            errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} back subjects`);
          }
        }
      }
    }
  } else {
    if (academicDetails.examinationPattern === "CBCS") {
      const subjectCombination = useCbcsSubjectCombination.getState();
      for (const semesterDetails of subjectCombination.semesters) {
        if (
          (!semesterDetails.combination.core || semesterDetails.combination.core.length === 0) &&
          !semesterDetails.combination.aecc &&
          !semesterDetails.combination.ge &&
          !semesterDetails.combination.sec
        ) {
          isValid = false;
          errors.push(`Please select a Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} subject`);
        }
      }
    } else if (academicDetails.examinationPattern === "OLD") {
      const subjectCombination = useOldCombinationStore.getState();
      for (const semesterDetails of subjectCombination.semesters) {
        if (semesterDetails.subjects.length < 1) {
          isValid = false;
          errors.push(`Please select a Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} subject`);
        }
      }
    }
  }
  if (!isValid) {
    useFormErrors.setState({ ...useFormErrors.getState(), errors });
    return isValid;
  }
  // documents
  const documents = useDocumentStore.getState();
  for (const doc of documents.documents) {
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(doc.url)) {
      isValid = false;
      errors.push(`Please upload ${doc.title}`);
    }
  }
  if (!isValid) {
    useFormErrors.setState({ ...useFormErrors.getState(), errors });
    return isValid;
  }
  return isValid;
}

function buildPostObject() {
  const personalDetails = usePersonalDetailsStore.getState();
  const photoAndSignature = usePhotoAndSignatureStore.getState();
  const academicDetails = useAcademicDetailsStore.getState();
  const nepSubjectCombination = useNepCombinationStore.getState();
  const cbcsSubjectCombination = useCbcsSubjectCombination.getState();
  const oldSubjectCombination = useOldCombinationStore.getState();
  const documents = useDocumentStore.getState();
  const dobDate = new Date(personalDetails.dob);
  // personal details 
  let data: any = {
    name: personalDetails.name,
    fatherName: personalDetails.fatherName,
    gender: personalDetails.gender,
    mobile: personalDetails.mobile,
    email: personalDetails.email,
    dob: `${dobDate.getFullYear()}-${String(dobDate.getMonth()).padStart(2, "0")}-${String(dobDate.getDate()).padStart(2, "0")}`,
    photo: photoAndSignature.photo,
    signature: photoAndSignature.signature,
  };
  // academic details
  data = {
    ...data,
    rguRollNo: academicDetails.rguRollNo,
    rguRegNo: academicDetails.rguRegNo,
    programme: academicDetails.programme,
  };
  if (!academicDetails.applyingForBackPapers && !academicDetails.applyingForImprovement) {
    data.semester = Number(academicDetails.semester);
    data.onlyHaveBackPapers = false;
    data.haveBackPapers = academicDetails.haveBackPapers;
    data.onlyImprovementPapers = false;
    if (academicDetails.examinationPattern === "CBCS") {
      const currentSemesterSubjectCombination = cbcsSubjectCombination.semesters.find(el => Number(el.semester) === Number(academicDetails.semester))?.combination;
      data.subjects = {
        core: {
          papers: currentSemesterSubjectCombination?.core.map(el => ({
            code: el.code,
            title: el.paper || "",
            type: ""
          })),
          title: currentSemesterSubjectCombination?.core[0].subject
        },
        ...currentSemesterSubjectCombination?.ge && {
          general_elective: {
            code: currentSemesterSubjectCombination.ge.code,
            title: currentSemesterSubjectCombination.ge.paper || "",
            subject: currentSemesterSubjectCombination.ge.subject || ""
          }
        },
        ...currentSemesterSubjectCombination?.sec && {
          skill_enhancement_course: {
            code: currentSemesterSubjectCombination.sec.code || "",
            title: currentSemesterSubjectCombination.sec.paper || "",
            subject: currentSemesterSubjectCombination.sec.subject || ""
          }
        },
        ...currentSemesterSubjectCombination?.aecc && {
          aecc: {
            code: currentSemesterSubjectCombination.aecc.code || "",
            title: currentSemesterSubjectCombination.aecc.paper || "",
          }
        }
      };
      if (academicDetails.haveBackPapers) {
        const backSemesterSubjectCombinations = cbcsSubjectCombination.semesters.filter(el => Number(el.semester) !== Number(academicDetails.semester));
        const backPapers: any = {};
        for (const semesterDetails of backSemesterSubjectCombinations) {
          const subjects: any[] = [];
          if (semesterDetails.combination.core.length > 0) {
            subjects.push(...semesterDetails.combination.core.map(el => ({ code: el.code || "", title: el.paper || "", type: "" })));
          }
          if (semesterDetails.combination.ge) {
            subjects.push({
              code: semesterDetails.combination.ge.code || "",
              title: semesterDetails.combination.ge.paper || "",
              subject: semesterDetails.combination.ge.subject || ""
            });
          }
          if (semesterDetails.combination.sec) {
            subjects.push({
              code: semesterDetails.combination.sec.code || "",
              title: semesterDetails.combination.sec.paper || "",
              subject: semesterDetails.combination.sec.subject || ""
            });
          }
          if (semesterDetails.combination.aecc) {
            subjects.push({
              code: semesterDetails.combination.aecc.code || "",
              title: semesterDetails.combination.aecc.paper || "",
            });
          }
          backPapers[semesterDetails.semester] = {
            subjects,
            markSheetUrl: documents.documents.find(el => el?.info?.name === "marksheet" && el?.info?.isBack && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || "",
            paymentReceiptUrl: documents.documents.find(el => el?.info?.name === "receipt" && el?.info?.isBack && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || ""
          }
        }
        data.backPapers = backPapers;
        data.backPaperSemesters = academicDetails.semesters.map(el => Number(el));
      }
    } else if (academicDetails.examinationPattern === "NEP") {
      const currentSemesterSubjectCombination = nepSubjectCombination.semesters.find(el => Number(el.semester) === Number(academicDetails.semester))?.combination;
      data.subjects = currentSemesterSubjectCombination;
    } else if (academicDetails.examinationPattern === "OLD") {
      const currentSemesterSubjectCombination = oldSubjectCombination.semesters.find(el => Number(el.semester) === Number(academicDetails.semester))?.subjects?.map(el => ({
        code: el.code,
        title: el.paper,
        subject: el.subject || ""
      })) || [];
      data.subjects = currentSemesterSubjectCombination;
      if (academicDetails.haveBackPapers) {
        const backSemesterSubjectCombinations = oldSubjectCombination.semesters.filter(el => Number(el.semester) !== Number(academicDetails.semester));
        const backPapers: any = {};
        for (const semesterDetails of backSemesterSubjectCombinations) {
          backPapers[semesterDetails.semester] = {
            subjects: semesterDetails.subjects.map(el => ({
              code: el.code,
              title: el.paper,
              subject: el.subject || ""
            })),
            markSheetUrl: documents.documents.find(el => el?.info?.name === "marksheet" && el?.info?.isBack && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || "",
            paymentReceiptUrl: documents.documents.find(el => el?.info?.name === "receipt" && el?.info?.isBack && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || ""
          };
        }
        data.backPapers = backPapers;
        data.backPaperSemesters = academicDetails.semesters.map(el => Number(el));
      }
    }
  } else {
    if (academicDetails.applyingForBackPapers) {
      data.semester = "";
      data.onlyHaveBackPapers = true;
      data.haveBackPapers = false;
      data.onlyImprovementPapers = false;
      if (academicDetails.examinationPattern === "CBCS") {
        const backSemesterSubjectCombinations = cbcsSubjectCombination.semesters.filter(el => Number(el.semester) !== Number(academicDetails.semester));
        const backPapers: any = {};
        for (const semesterDetails of backSemesterSubjectCombinations) {
          const subjects: any[] = [];
          if (semesterDetails.combination.core.length > 0) {
            subjects.push(...semesterDetails.combination.core.map(el => ({ code: el.code || "", title: el.paper || "", type: "" })));
          }
          if (semesterDetails.combination.ge) {
            subjects.push({
              code: semesterDetails.combination.ge.code || "",
              title: semesterDetails.combination.ge.paper || "",
              subject: semesterDetails.combination.ge.subject || ""
            });
          }
          if (semesterDetails.combination.sec) {
            subjects.push({
              code: semesterDetails.combination.sec.code || "",
              title: semesterDetails.combination.sec.paper || "",
              subject: semesterDetails.combination.sec.subject || ""
            });
          }
          if (semesterDetails.combination.aecc) {
            subjects.push({
              code: semesterDetails.combination.aecc.code || "",
              title: semesterDetails.combination.aecc.paper || "",
            });
          }
          backPapers[semesterDetails.semester] = {
            subjects,
            markSheetUrl: documents.documents.find(el => el?.info?.name === "marksheet" && el?.info?.onlyBack && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || "",
            paymentReceiptUrl: documents.documents.find(el => el?.info?.name === "receipt" && el?.info?.onlyBack && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || ""
          }
        }
        data.backPapers = backPapers;
        data.backPaperSemesters = academicDetails.semesters.map(el => Number(el));
      } if (academicDetails.examinationPattern === "OLD") {
        const backSemesterSubjectCombinations = oldSubjectCombination.semesters.filter(el => Number(el.semester) !== Number(academicDetails.semester));
        const backPapers: any = {};
        for (const semesterDetails of backSemesterSubjectCombinations) {
          backPapers[semesterDetails.semester] = {
            subjects: semesterDetails.subjects.map(el => ({
              code: el.code,
              title: el.paper,
              subject: el.subject || ""
            })),
            markSheetUrl: documents.documents.find(el => el?.info?.name === "marksheet" && el?.info?.onlyBack && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || "",
            paymentReceiptUrl: documents.documents.find(el => el?.info?.name === "receipt" && el?.info?.onlyBack && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || ""
          };
        }
        data.backPapers = backPapers;
        data.backPaperSemesters = academicDetails.semesters.map(el => Number(el));
      }
    } else if (academicDetails.applyingForImprovement) {
      data.semester = "";
      data.onlyHaveBackPapers = false;
      data.haveBackPapers = false;
      data.onlyImprovementPapers = true;
      if (academicDetails.examinationPattern === "CBCS") {
        const improvementSemesterSubjectCombinations = cbcsSubjectCombination.semesters.filter(el => Number(el.semester) !== Number(academicDetails.semester));
        const improvementPapers: any = {};
        for (const semesterDetails of improvementSemesterSubjectCombinations) {
          const subjects: any[] = [];
          if (semesterDetails.combination.core.length > 0) {
            subjects.push(...semesterDetails.combination.core.map(el => ({ code: el.code || "", title: el.paper || "", type: "" })));
          }
          if (semesterDetails.combination.ge) {
            subjects.push({
              code: semesterDetails.combination.ge.code || "",
              title: semesterDetails.combination.ge.paper || "",
              subject: semesterDetails.combination.ge.subject || ""
            });
          }
          if (semesterDetails.combination.sec) {
            subjects.push({
              code: semesterDetails.combination.sec.code || "",
              title: semesterDetails.combination.sec.paper || "",
              subject: semesterDetails.combination.sec.subject || ""
            });
          }
          if (semesterDetails.combination.aecc) {
            subjects.push({
              code: semesterDetails.combination.aecc.code || "",
              title: semesterDetails.combination.aecc.paper || "",
            });
          }
          improvementPapers[semesterDetails.semester] = {
            subjects,
            markSheetUrl: documents.documents.find(el => el?.info?.name === "marksheet" && el?.info?.isImprovement && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || "",
            paymentReceiptUrl: documents.documents.find(el => el?.info?.name === "receipt" && el?.info?.isImprovement && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || "",
            improvementPaymentReceipt: documents.documents.find(el => el?.info?.name === "receipt" && el?.info?.isImprovement && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || ""
          }
        }
        data.improvementPapers = improvementPapers;
        data.improvementSemesters = academicDetails.semesters.map(el => Number(el));
      } if (academicDetails.examinationPattern === "OLD") {
        const improvementSemesterSubjectCombinations = oldSubjectCombination.semesters.filter(el => Number(el.semester) !== Number(academicDetails.semester));
        const improvementPapers: any = {};
        for (const semesterDetails of improvementSemesterSubjectCombinations) {
          improvementPapers[semesterDetails.semester] = {
            subjects: semesterDetails.subjects.map(el => ({
              code: el.code,
              title: el.paper,
              subject: el.subject || ""
            })),
            markSheetUrl: documents.documents.find(el => el?.info?.name === "marksheet" && el?.info?.isImprovement && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || "",
            paymentReceiptUrl: documents.documents.find(el => el?.info?.name === "receipt" && el?.info?.isImprovement && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || "",
            improvementPaymentReceipt: documents.documents.find(el => el?.info?.name === "receipt" && el?.info?.isImprovement && Number(el?.info?.semester) === Number(semesterDetails.semester))?.url || ""
          };
        }
        data.improvementPapers = improvementPapers;
        data.improvementSemesters = academicDetails.semesters.map(el => Number(el));
      }
    }
  }
  data.examinationPattern = academicDetails.examinationPattern;
  data.courseType = academicDetails.examinationPattern === "CBCS" ? "cbcs" : "non-cbcs";
  // documents
  if (academicDetails.semester) {
    data.currentSemesterMarkSheet = documents.documents.find(el => el?.info?.name === "marksheet" && Number(el?.info?.semester) === Number(academicDetails.semester))?.url || "";
    data.currentSemesterPaymentReceipt = documents.documents.find(el => el?.info?.name === "receipt" && Number(el?.info?.semester) === Number(academicDetails.semester))?.url || "";
    data.registrationCard = documents.documents.find(el => el?.info?.name === "reg")?.url || "";
  }
  return data;
}

export async function submitForm() {
  try {
    if (isValidatedForm()) {
      // /examination-form
      const res = await fetch(
        `${baseUrl}/v2/examination-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildPostObject())
        }
      );
      const data = await res.json();
      console.log(data);
    } else {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }
  } catch (error) {
    alert("Something went wrong. Please try again later")
  }
}