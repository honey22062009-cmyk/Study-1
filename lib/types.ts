// Core NEET-first platform types - future-proof for JEE etc

export type ExamType = 'NEET' | 'JEE' | 'CUET' | 'OTHER';

export type SubjectId = string; // e.g., 'biology', 'physics', 'chemistry'
export type ChapterId = string;
export type TopicId = string;

export interface Exam {
  id: ExamType;
  name: string;
  fullName: string;
  subjects: SubjectId[];
  marking: MarkingScheme;
  description: string;
}

export interface MarkingScheme {
  correct: number;
  incorrect: number;
  unattempted: number;
  totalQuestions: number;
  durationMinutes: number;
}

export interface Subject {
  id: SubjectId;
  name: string;
  shortName: string;
  examId: ExamType;
  classLevel: '11' | '12' | 'both';
  color: string;
  icon: string;
  chapters: ChapterId[];
}

export interface Chapter {
  id: ChapterId;
  subjectId: SubjectId;
  name: string;
  classLevel: '11' | '12';
  unit?: string;
  weightage?: number; // NEET weightage estimate
  topics: TopicId[];
  order: number;
}

export interface Topic {
  id: TopicId;
  chapterId: ChapterId;
  subjectId: SubjectId;
  name: string;
  subtopics?: string[];
  order: number;
  ncertPages?: string;
  importance: 'low' | 'medium' | 'high' | 'very-high';
}

export type NoteType = 'detailed' | 'short' | 'quick-revision' | 'important-points' | 'visual';

export interface Note {
  id: string;
  topicId: TopicId;
  chapterId: ChapterId;
  subjectId: SubjectId;
  type: NoteType;
  title: string;
  content: NoteContent;
  verified: boolean; // trusted vs AI
  source: 'ncert' | 'curated' | 'ai' | 'expert';
  updatedAt: string;
}

export interface NoteContent {
  markdown?: string;
  sections: NoteSection[];
}

export interface NoteSection {
  id: string;
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'diagram' | 'formula' | 'example' | 'important' | 'flashcard' | 'interactive';
  title?: string;
  content: string;
  meta?: Record<string, any>;
}

export type QuestionType = 
  | 'mcq' 
  | 'statement-based' 
  | 'assertion-reason' 
  | 'diagram-based' 
  | 'numerical' 
  | 'conceptual'
  | 'match-the-following';

export type Difficulty = 'easy' | 'moderate' | 'difficult';
export type QuestionSource = 'ncert' | 'pyq' | 'curated' | 'ai-generated' | 'expert';

export interface Question {
  id: string;
  examId: ExamType;
  subjectId: SubjectId;
  chapterId: ChapterId;
  topicId: TopicId;
  subtopic?: string;
  type: QuestionType;
  difficulty: Difficulty;
  source: QuestionSource;
  year?: number; // for PYQ
  statement: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  detailedExplanation?: string;
  diagramUrl?: string;
  tags: string[];
  verified: boolean;
  timeExpectedSeconds: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean | null;
  timeTakenSeconds: number;
  markedForReview: boolean;
  timestamp: string;
}

export type TestType = 'quick' | 'topic' | 'chapter' | 'subject' | 'custom' | 'full-mock' | 'pyq';

export interface Test {
  id: string;
  examId: ExamType;
  type: TestType;
  title: string;
  description: string;
  subjectId?: SubjectId;
  chapterId?: ChapterId;
  topicId?: TopicId;
  questionIds: string[];
  durationMinutes: number;
  marking: MarkingScheme;
  difficulty: Difficulty | 'mixed';
  createdAt: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  examId: ExamType;
  startedAt: string;
  submittedAt: string | null;
  answers: UserAnswer[];
  score: number;
  total: number;
  accuracy: number;
  timeSpentSeconds: number;
  status: 'in-progress' | 'submitted' | 'abandoned';
}

export type MistakeCategory = 
  | 'concept-gap' 
  | 'calculation-error' 
  | 'misread' 
  | 'memory' 
  | 'careless' 
  | 'time-pressure' 
  | 'unclassified';

export interface MistakeEntry {
  id: string;
  questionId: string;
  attemptId: string;
  subjectId: SubjectId;
  chapterId: ChapterId;
  topicId: TopicId;
  userAnswerId: string;
  correctAnswerId: string;
  category: MistakeCategory;
  timesRepeated: number;
  lastAttempted: string;
  resolved: boolean;
  notes?: string;
}

export interface TopicMastery {
  topicId: TopicId;
  chapterId: ChapterId;
  subjectId: SubjectId;
  totalAttempted: number;
  correct: number;
  accuracy: number;
  avgTimeSeconds: number;
  lastAttempted: string;
  masteryLevel: number; // 0-100
  weakAreas: string[];
}

export interface ChapterMastery extends Omit<TopicMastery, 'topicId' | 'weakAreas'> {
  chapterId: ChapterId;
  topicsMastery: TopicMastery[];
}

export interface StudySession {
  id: string;
  subjectId?: SubjectId;
  topicId?: TopicId;
  startTime: string;
  endTime: string | null;
  durationSeconds: number;
  type: 'learn' | 'practice' | 'test' | 'revision' | 'focus';
}

export interface Recommendation {
  id: string;
  type: 'revise' | 'practice' | 'test' | 'learn' | 'mistake' | 'weak-topic';
  title: string;
  description: string;
  subjectId?: SubjectId;
  chapterId?: ChapterId;
  topicId?: TopicId;
  priority: 'low' | 'medium' | 'high';
  reason: string;
  actionLabel: string;
  actionLink: string;
  dismissed: boolean;
}

export interface SearchResult {
  id: string;
  type: 'subject' | 'chapter' | 'topic' | 'question' | 'note' | 'test';
  title: string;
  subtitle: string;
  link: string;
  relevance: number;
}
