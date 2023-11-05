import { ROMAN_NUMERIC_MAP } from "@/constants";
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
    examinationPattern
  }: {
    programme: string;
    semester: string;
    semesters: string[];
    applyingForBackPapers: boolean;
    applyingForImprovement: boolean;
    examinationPattern: string;
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
      } else if (examinationPattern === "OLD") {
        oldSubjectCombinationSemesters.push({
          semester: String(semester),
          subjects: []
        });
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
    examinationPattern: state.examinationPattern
  });
  if (state.semester !== prevState.semester) return resetAndUpdateStates({
    programme: state.programme,
    semester: state.semester,
    semesters: state.semesters,
    applyingForBackPapers: state.applyingForBackPapers,
    applyingForImprovement: state.applyingForImprovement,
    examinationPattern: state.examinationPattern
  });
  if (state.semesters.some(el => !prevState.semesters.includes(el))) return resetAndUpdateStates({
    programme: state.programme,
    semester: state.semester,
    semesters: state.semesters,
    applyingForBackPapers: state.applyingForBackPapers,
    applyingForImprovement: state.applyingForImprovement,
    examinationPattern: state.examinationPattern
  });
  if (state.examinationPattern !== prevState.examinationPattern) return resetAndUpdateStates({
    programme: state.programme,
    semester: state.semester,
    semesters: state.semesters,
    applyingForBackPapers: state.applyingForBackPapers,
    applyingForImprovement: state.applyingForImprovement,
    examinationPattern: state.examinationPattern
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
