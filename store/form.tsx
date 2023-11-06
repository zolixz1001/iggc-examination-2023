import { CURRENT_SEMESTERS, ROMAN_NUMERIC_MAP } from "@/constants";
import { use } from "react";
import { create } from "zustand";

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

export interface SubjectDetails {
  subject?: string;
  code: string;
  paper: string;
}

export interface NepSubjectCombination {
  major: SubjectDetails | null;
  minor: SubjectDetails | null;
  mdc: SubjectDetails | null;
  sec: SubjectDetails | null;
  aec: SubjectDetails | null;
  vac: SubjectDetails | null;
}

interface NepSubjectCombinationState {
  semesters: {
    semester: string;
    combination: NepSubjectCombination;
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

export interface CbcsSubjectCombination {
  core: SubjectDetails[];
  aecc: SubjectDetails | null;
  ge: SubjectDetails | null;
  sec: SubjectDetails | null;
}

interface CbcsSubjectCombinationState {
  semesters: {
    semester: string;
    combination: CbcsSubjectCombination;
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

interface OldSubjectCombination {
  semester: string;
  subjects: SubjectDetails[];
}

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

export interface Document {
  title: string;
  url: string;
}

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
  const nepSubjectCombinationSemesters: { semester: string; combination: NepSubjectCombination }[] = [];
  const cbcsSubjectCombinationSemesters: { semester: string; combination: CbcsSubjectCombination }[] = [];
  const oldSubjectCombinationSemesters: { semester: string; subjects: SubjectDetails[] }[] = [];
  if (programme) {
    if (applyingForImprovement || applyingForBackPapers) {
      if (semesters.length > 0) {
        if (applyingForImprovement) {
          for (const sem of semesters) {
            documents.push(
              {
                title: `Payment receipt for the back paper of Semester ${ROMAN_NUMERIC_MAP[sem]}`,
                url: ""
              }
            );
            documents.push(
              {
                title: `Mark sheet of Semester ${ROMAN_NUMERIC_MAP[Number(sem)]}`,
                url: ""
              }
            );
          }
        } else {
          for (const sem of semesters) {
            documents.push({
              title: `Payment receipt for the improvement paper of Semester ${ROMAN_NUMERIC_MAP[sem]}`,
              url: ""
            });
            documents.push({
              title: `Mark sheet of Semester ${ROMAN_NUMERIC_MAP[Number(sem)]}`,
              url: ""
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
          url: ""
        }
      );
      if (Number(semester) > 1) {
        documents.push(
          {
            title: `Mark sheet of Semester ${ROMAN_NUMERIC_MAP[Number(semester) - 1]}`,
            url: ""
          }
        );
      }
      if (haveBackPapers && semesters.length > 0) {
        for (const sem of semesters) {
          documents.push(
            {
              title: `Payment receipt for back paper of Semester ${ROMAN_NUMERIC_MAP[sem]}`,
              url: ""
            }
          );
          documents.push(
            {
              title: `Mark sheet for back paper of Semester ${ROMAN_NUMERIC_MAP[Number(sem)]}`,
              url: ""
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
      console.log({ CURRENT_SEMESTERS, semester: academicDetails.semester })
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
        if (!semesterDetails.combination.core || semesterDetails.combination.core.length === 0) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} Core courses`);
        }
        if (!semesterDetails.combination.aecc) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} AEC`);
        }
        if (!semesterDetails.combination.ge) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} GE`);
        }
      }
    } else if (academicDetails.examinationPattern === "OLD") {
      const subjectCombination = useOldCombinationStore.getState();
      for (const semesterDetails of subjectCombination.semesters) {
        if (semesterDetails.subjects.length < 4) {
          isValid = false;
          errors.push(`Please select Semester ${ROMAN_NUMERIC_MAP[semesterDetails.semester]} subjects`);
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
    data.haveBackPapers = false;
    data.onlyImprovementPapers = false;
  } else {

  }
}

export async function submitForm() {
  try {
    if (isValidatedForm()) {
      alert("SUCCESS!!!");
    } else {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }
  } catch (error) {
    alert("Something went wrong. Please try again later")
  }
}