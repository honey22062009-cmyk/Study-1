import { Exam, Subject, Chapter, Topic } from '@/lib/types';

export const exams: Exam[] = [
  {
    id: 'NEET',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    subjects: ['physics', 'chemistry', 'biology'],
    marking: { correct: 4, incorrect: -1, unattempted: 0, totalQuestions: 180, durationMinutes: 180 },
    description: 'NEET UG for medical entrance - Physics, Chemistry, Biology'
  },
  {
    id: 'JEE',
    name: 'JEE',
    fullName: 'Joint Entrance Examination',
    subjects: ['physics', 'chemistry', 'mathematics'],
    marking: { correct: 4, incorrect: -1, unattempted: 0, totalQuestions: 90, durationMinutes: 180 },
    description: 'JEE Main & Advanced - Future support'
  }
];

export const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    shortName: 'PHY',
    examId: 'NEET',
    classLevel: 'both',
    color: '#3b82f6',
    icon: 'atom',
    chapters: ['phy-01', 'phy-02', 'phy-03', 'phy-04', 'phy-05', 'phy-06', 'phy-07', 'phy-08']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'CHEM',
    examId: 'NEET',
    classLevel: 'both',
    color: '#10b981',
    icon: 'flask',
    chapters: ['chem-01', 'chem-02', 'chem-03', 'chem-04', 'chem-05', 'chem-06']
  },
  {
    id: 'biology',
    name: 'Biology',
    shortName: 'BIO',
    examId: 'NEET',
    classLevel: 'both',
    color: '#f59e0b',
    icon: 'dna',
    chapters: ['bio-01', 'bio-02', 'bio-03', 'bio-04', 'bio-05', 'bio-06', 'bio-07', 'bio-08']
  }
];

export const chapters: Chapter[] = [
  // Physics
  { id: 'phy-01', subjectId: 'physics', name: 'Physical World and Measurement', classLevel: '11', unit: 'Unit 1', weightage: 2, topics: ['phy-01-t1', 'phy-01-t2'], order: 1 },
  { id: 'phy-02', subjectId: 'physics', name: 'Kinematics', classLevel: '11', unit: 'Unit 2', weightage: 3, topics: ['phy-02-t1', 'phy-02-t2'], order: 2 },
  { id: 'phy-03', subjectId: 'physics', name: 'Laws of Motion', classLevel: '11', unit: 'Unit 3', weightage: 4, topics: ['phy-03-t1'], order: 3 },
  { id: 'phy-04', subjectId: 'physics', name: 'Work, Energy and Power', classLevel: '11', unit: 'Unit 4', weightage: 4, topics: ['phy-04-t1'], order: 4 },
  { id: 'phy-05', subjectId: 'physics', name: 'Thermodynamics', classLevel: '11', unit: 'Unit 8', weightage: 5, topics: ['phy-05-t1', 'phy-05-t2'], order: 5 },
  { id: 'phy-06', subjectId: 'physics', name: 'Electrostatics', classLevel: '12', unit: 'Unit 1', weightage: 8, topics: ['phy-06-t1', 'phy-06-t2'], order: 6 },
  { id: 'phy-07', subjectId: 'physics', name: 'Current Electricity', classLevel: '12', unit: 'Unit 2', weightage: 7, topics: ['phy-07-t1'], order: 7 },
  { id: 'phy-08', subjectId: 'physics', name: 'Optics', classLevel: '12', unit: 'Unit 6', weightage: 6, topics: ['phy-08-t1'], order: 8 },

  // Chemistry
  { id: 'chem-01', subjectId: 'chemistry', name: 'Some Basic Concepts of Chemistry', classLevel: '11', unit: 'Unit 1', weightage: 2, topics: ['chem-01-t1'], order: 1 },
  { id: 'chem-02', subjectId: 'chemistry', name: 'Structure of Atom', classLevel: '11', unit: 'Unit 2', weightage: 3, topics: ['chem-02-t1', 'chem-02-t2'], order: 2 },
  { id: 'chem-03', subjectId: 'chemistry', name: 'Chemical Bonding', classLevel: '11', unit: 'Unit 4', weightage: 6, topics: ['chem-03-t1'], order: 3 },
  { id: 'chem-04', subjectId: 'chemistry', name: 'Thermodynamics', classLevel: '11', unit: 'Unit 6', weightage: 5, topics: ['chem-04-t1'], order: 4 },
  { id: 'chem-05', subjectId: 'chemistry', name: 'Equilibrium', classLevel: '11', unit: 'Unit 7', weightage: 6, topics: ['chem-05-t1'], order: 5 },
  { id: 'chem-06', subjectId: 'chemistry', name: 'Organic Chemistry Basics', classLevel: '11', unit: 'Unit 12', weightage: 8, topics: ['chem-06-t1', 'chem-06-t2'], order: 6 },

  // Biology - high yield
  { id: 'bio-01', subjectId: 'biology', name: 'The Living World', classLevel: '11', unit: 'Unit 1', weightage: 2, topics: ['bio-01-t1'], order: 1 },
  { id: 'bio-02', subjectId: 'biology', name: 'Biological Classification', classLevel: '11', unit: 'Unit 1', weightage: 4, topics: ['bio-02-t1', 'bio-02-t2'], order: 2 },
  { id: 'bio-03', subjectId: 'biology', name: 'Cell Structure and Function', classLevel: '11', unit: 'Unit 3', weightage: 8, topics: ['bio-03-t1', 'bio-03-t2'], order: 3 },
  { id: 'bio-04', subjectId: 'biology', name: 'Plant Physiology', classLevel: '11', unit: 'Unit 4', weightage: 6, topics: ['bio-04-t1', 'bio-04-t2'], order: 4 },
  { id: 'bio-05', subjectId: 'biology', name: 'Human Physiology', classLevel: '11', unit: 'Unit 5', weightage: 12, topics: ['bio-05-t1', 'bio-05-t2', 'bio-05-t3'], order: 5 },
  { id: 'bio-06', subjectId: 'biology', name: 'Reproduction', classLevel: '12', unit: 'Unit 1', weightage: 10, topics: ['bio-06-t1', 'bio-06-t2'], order: 6 },
  { id: 'bio-07', subjectId: 'biology', name: 'Genetics and Evolution', classLevel: '12', unit: 'Unit 2', weightage: 15, topics: ['bio-07-t1', 'bio-07-t2', 'bio-07-t3'], order: 7 },
  { id: 'bio-08', subjectId: 'biology', name: 'Ecology', classLevel: '12', unit: 'Unit 5', weightage: 8, topics: ['bio-08-t1'], order: 8 },
];

export const topics: Topic[] = [
  // Physics topics
  { id: 'phy-01-t1', chapterId: 'phy-01', subjectId: 'physics', name: 'Units and Measurements', order: 1, importance: 'medium' },
  { id: 'phy-01-t2', chapterId: 'phy-01', subjectId: 'physics', name: 'Errors in Measurement', order: 2, importance: 'medium' },
  { id: 'phy-02-t1', chapterId: 'phy-02', subjectId: 'physics', name: 'Motion in Straight Line', order: 1, importance: 'high' },
  { id: 'phy-02-t2', chapterId: 'phy-02', subjectId: 'physics', name: 'Motion in Plane - Projectile', order: 2, importance: 'high' },
  { id: 'phy-03-t1', chapterId: 'phy-03', subjectId: 'physics', name: "Newton's Laws and Friction", order: 1, importance: 'very-high' },
  { id: 'phy-04-t1', chapterId: 'phy-04', subjectId: 'physics', name: 'Work Energy Theorem', order: 1, importance: 'high' },
  { id: 'phy-05-t1', chapterId: 'phy-05', subjectId: 'physics', name: 'First Law of Thermodynamics', order: 1, importance: 'high' },
  { id: 'phy-05-t2', chapterId: 'phy-05', subjectId: 'physics', name: 'Thermodynamic Processes', order: 2, importance: 'high' },
  { id: 'phy-06-t1', chapterId: 'phy-06', subjectId: 'physics', name: 'Electric Charges and Fields', order: 1, importance: 'very-high' },
  { id: 'phy-06-t2', chapterId: 'phy-06', subjectId: 'physics', name: 'Electrostatic Potential & Capacitance', order: 2, importance: 'very-high' },
  { id: 'phy-07-t1', chapterId: 'phy-07', subjectId: 'physics', name: 'Ohms Law and Circuits', order: 1, importance: 'high' },
  { id: 'phy-08-t1', chapterId: 'phy-08', subjectId: 'physics', name: 'Ray Optics and Wave Optics', order: 1, importance: 'high' },

  // Chemistry topics
  { id: 'chem-01-t1', chapterId: 'chem-01', subjectId: 'chemistry', name: 'Mole Concept and Stoichiometry', order: 1, importance: 'high' },
  { id: 'chem-02-t1', chapterId: 'chem-02', subjectId: 'chemistry', name: 'Atomic Structure - Bohr Model', order: 1, importance: 'high' },
  { id: 'chem-02-t2', chapterId: 'chem-02', subjectId: 'chemistry', name: 'Quantum Numbers and Orbitals', order: 2, importance: 'high' },
  { id: 'chem-03-t1', chapterId: 'chem-03', subjectId: 'chemistry', name: 'Chemical Bonding - VSEPR, Hybridization', order: 1, importance: 'very-high' },
  { id: 'chem-04-t1', chapterId: 'chem-04', subjectId: 'chemistry', name: 'Enthalpy, Entropy, Gibbs', order: 1, importance: 'high' },
  { id: 'chem-05-t1', chapterId: 'chem-05', subjectId: 'chemistry', name: 'Chemical and Ionic Equilibrium', order: 1, importance: 'very-high' },
  { id: 'chem-06-t1', chapterId: 'chem-06', subjectId: 'chemistry', name: 'IUPAC and Isomerism', order: 1, importance: 'high' },
  { id: 'chem-06-t2', chapterId: 'chem-06', subjectId: 'chemistry', name: 'Reaction Mechanisms', order: 2, importance: 'very-high' },

  // Biology topics - detailed
  { id: 'bio-01-t1', chapterId: 'bio-01', subjectId: 'biology', name: 'Characteristics of Living', order: 1, importance: 'low' },
  { id: 'bio-02-t1', chapterId: 'bio-02', subjectId: 'biology', name: 'Kingdom Monera, Protista, Fungi', order: 1, importance: 'medium' },
  { id: 'bio-02-t2', chapterId: 'bio-02', subjectId: 'biology', name: 'Plant and Animal Kingdom Basics', order: 2, importance: 'medium' },
  { id: 'bio-03-t1', chapterId: 'bio-03', subjectId: 'biology', name: 'Cell Theory and Cell Organelles', order: 1, importance: 'very-high' },
  { id: 'bio-03-t2', chapterId: 'bio-03', subjectId: 'biology', name: 'Cell Cycle and Cell Division', order: 2, importance: 'very-high' },
  { id: 'bio-04-t1', chapterId: 'bio-04', subjectId: 'biology', name: 'Photosynthesis', order: 1, importance: 'high' },
  { id: 'bio-04-t2', chapterId: 'bio-04', subjectId: 'biology', name: 'Respiration in Plants', order: 2, importance: 'medium' },
  { id: 'bio-05-t1', chapterId: 'bio-05', subjectId: 'biology', name: 'Breathing and Exchange of Gases', order: 1, importance: 'high' },
  { id: 'bio-05-t2', chapterId: 'bio-05', subjectId: 'biology', name: 'Body Fluids and Circulation', order: 2, importance: 'very-high' },
  { id: 'bio-05-t3', chapterId: 'bio-05', subjectId: 'biology', name: 'Excretory Products and Neural Control', order: 3, importance: 'high' },
  { id: 'bio-06-t1', chapterId: 'bio-06', subjectId: 'biology', name: 'Sexual Reproduction in Flowering Plants', order: 1, importance: 'high' },
  { id: 'bio-06-t2', chapterId: 'bio-06', subjectId: 'biology', name: 'Human Reproduction', order: 2, importance: 'very-high' },
  { id: 'bio-07-t1', chapterId: 'bio-07', subjectId: 'biology', name: 'Principles of Inheritance - Mendel', order: 1, importance: 'very-high' },
  { id: 'bio-07-t2', chapterId: 'bio-07', subjectId: 'biology', name: 'Molecular Basis of Inheritance', order: 2, importance: 'very-high' },
  { id: 'bio-07-t3', chapterId: 'bio-07', subjectId: 'biology', name: 'Evolution', order: 3, importance: 'medium' },
  { id: 'bio-08-t1', chapterId: 'bio-08', subjectId: 'biology', name: 'Ecosystem and Biodiversity', order: 1, importance: 'high' },
];

export const getSubject = (id: string) => subjects.find(s => s.id === id);
export const getChapter = (id: string) => chapters.find(c => c.id === id);
export const getTopic = (id: string) => topics.find(t => t.id === id);
export const getChaptersBySubject = (subjectId: string) => chapters.filter(c => c.subjectId === subjectId).sort((a,b)=>a.order-b.order);
export const getTopicsByChapter = (chapterId: string) => topics.filter(t => t.chapterId === chapterId).sort((a,b)=>a.order-b.order);
