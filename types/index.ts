export interface PersonalDetails {
  name: string;
  fatherName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
}

export interface PhotoAndSignature {
  photo: string;
  signature: string;
}

export interface AcademicDetails {
  rguRollNo: string;
  rguRegNo: string;
  programme: string;
  semester: string;
  semesters: string[];
  applyingForBackPapers: boolean;
  applyingForImprovement: boolean;
  haveBackPapers: boolean;
  examinationPattern: string;
}

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

export interface NepSubjectCombinationInfo {
  semester: string;
  combination: NepSubjectCombination;
  isBack?: boolean;
}

export interface CbcsSubjectCombination {
  core: SubjectDetails[];
  aecc: SubjectDetails | null;
  ge: SubjectDetails | null;
  sec: SubjectDetails | null;
}
export interface CbcsSubjectCombinationInfo {
  semester: string;
  combination: CbcsSubjectCombination;
  isBack?: boolean;
}
export interface OldSubjectCombination {
  semester: string;
  subjects: SubjectDetails[];
  isBack?: boolean;
}

export interface Document {
  title: string;
  url: string;
  info?: {
    name?: string;
    isBack?: boolean;
    onlyBack?: boolean;
    isImprovement?: boolean;
    semester?: string;
  };
}

export interface Examination {
  personalDetails: PersonalDetails;
  photoAndSignature: PhotoAndSignature;
  academicDetails: AcademicDetails;
  nepSubjectCombinations: NepSubjectCombinationInfo[];
  cbcsSubjectCombinations: CbcsSubjectCombinationInfo[];
  oldSubjectCombinations: OldSubjectCombination[];
  documents: Document[];
  status?: string;
  _id?: string;
}

export interface OldPaperDetails {
  code: string;
  title: string;
  subject?: string;
  type?: string;
}

export interface OldCbcsSubjects {
  core: {
    papers: OldPaperDetails[];
    title: string;
  };
  general_elective: OldPaperDetails;
  skill_enhancement_course: OldPaperDetails;
  aecc: OldPaperDetails;
}

export interface PaperDetails {
  subjects: OldPaperDetails[];
  markSheetUrl: string;
  paymentReceiptUrl: string;
}

export interface ExaminationData {
  _id: string;
  dob: string;
  fatherName: string;
  gender: string;
  name: string;
  rguRegNo: string;
  rguRollNo: string;
  mobile: string;
  email: string;
  onlyHaveBackPapers: boolean;
  haveBackPapers: boolean;
  onlyImprovementPapers: boolean;
  programme: string;
  photo: string;
  signature: string;
  semester: number;
  subjects: OldCbcsSubjects | OldPaperDetails[] | NepSubjectCombination | null;
  currentSemesterPaymentReceipt: string;
  currentSemesterMarkSheet: string;
  registrationCard: string;
  courseType: string;
  examinationPattern: string;
  status: string;
  createdOn: string;
  modifiedOn: string;
  backPaperSemesters?: number[];
  backPapers?: {
    [key: string]: PaperDetails;
  };
  improvementSemesters?: number[];
  improvementPapers?: {
    [key: string]: PaperDetails;
  };
}
