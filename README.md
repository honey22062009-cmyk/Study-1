# NEET-First AI Learning & Exam Preparation Platform

A complete, modern, NEET-first educational ecosystem designed around the philosophy:

> **Learn → Practice → Test → Analyze → Understand mistakes → Revise → Practice again → Improve**

**Student remains in control. Platform recommends, never forces.**

Built with Next.js 16, TypeScript, Tailwind CSS 4, Zustand.

---

## 🌟 Product Vision

Not a simple notes/MCQ/quiz site. This is a **digital learning + examination ecosystem** combining:

- Structured learning (NEET → Subject → Class → Unit → Topic)
- Detailed / Short / Quick Revision notes
- Interactive content (flashcards, concept checks, expandable concepts)
- Topic-wise practice with flexible filters
- NEET PYQs archive
- Quizzes, Chapter tests, Subject tests, Full NEET mocks
- Mistake Bank with categorization
- Revision System with spaced repetition (optional)
- Performance analytics & score improvement
- AI Tutor (grounded in verified content)
- Focus tools (Pomodoro, custom timer, session tracking)
- Global search

**Architecture is future-proof for JEE and other exams** without rebuild.

---

## 🧭 Information Architecture

Every major capability has its own section (no giant dashboard):

- **Home** - Quick actions, recent activity, performance snapshot, optional recommendations, continue learning
- **Learn** - `NEET → Biology/Physics/Chemistry → Class 11/12 → Unit/Chapter → Topic` with detailed learning + interactive
- **Notes** - Detailed, Short, Quick Revision, Important Points, Visual - organized by subject/chapter/topic
- **Practice** - Powerful engine: choose subject, chapter, topic, subtopic, type, difficulty, count (5/10/20/30/50/custom), time limit, PYQ/custom, previously incorrect, mixed
- **Tests** - Quick, Topic, Chapter, Subject, Custom, Full NEET Mock (180 Qs, 180 min, +4/-1, timer, palette, mark for review, submission confirmation)
- **Mistakes** - Every incorrect stored with original Q, student answer, correct, explanation, topic, attempts, categorization (concept gap, calculation, misread, memory, careless, time-pressure)
- **Revision** - Short notes, incorrect Qs, weak topics, recently studied, custom sessions, spaced-revision suggestions
- **Analytics** - Test scores, accuracy trends, subject/chapter/topic mastery, speed, mistake trends, improvement (Previous: 118 → Current: 136 +18), estimates clearly labeled as estimates
- **Focus** - Timer, Pomodoro, Stopwatch, session history, break reminders, full-screen, time per subject
- **Search** - Subjects, chapters, topics, questions, PYQs, notes, tests, mistakes, natural queries like "Questions on capacitors"
- **AI Tutor** - Concept explanations, doubt solving, alternative explanations, examples, personalized practice, mistake analysis, grounded in verified NCERT, distinction between verified vs AI-generated

---

## 🎓 Core Philosophies

### Student Freedom (Fundamental Rule)
- No forced schedule
- Student decides: subject, chapter, topic, detailed vs quick, count, difficulty, PYQ vs quiz vs test, time, AI assistance, whether to follow recommendations
- Example recommendation: *"Your recent Biology attempts show weaker performance in Genetics. You may want to revise Mendelian inheritance and attempt 15 targeted questions."* Options: Revise Now / Practice Now / View Analysis / Ignore
- Quick actions on Home: "I want Biology" / "Give me 10 Qs" / "PYQs" / "Full Mock" / "I want to revise"

### Quality & Reliability
- Verified academic content distinguished from AI-generated (✓ Verified badge)
- No fabricated NEET questions, PYQs, stats, official info
- Estimates labeled as estimates with basis explained
- NCERT-aligned, curated question bank

### UX Principles
- Educational, fast, organized, modern, trustworthy, focused, interactive, flexible, student-controlled
- Every major feature has clear location
- Student always knows: Where am I? What am I studying? What can I do? How to go back? (breadcrumbs everywhere)

---

## 🏗️ Tech Architecture (Future-Proof)

```
/lib/types.ts - ExamType, Subject, Chapter, Topic, Note, Question, Test, Attempt, Mistake, Mastery, Recommendation
/lib/data/syllabus.ts - NEET + JEE exams, subjects, chapters, topics
/lib/data/questions.ts - Question bank with PYQs, curated, difficulty, type
/lib/data/notes.ts - Detailed/short/quick notes with sections
/lib/store/useStore.ts - Zustand persisted store for attempts, mistakes, mastery, focus
/components/layout - Sidebar (NEET FIRST + JEE Ready badges), Topbar
/components/ui - Button, Card, Badge
/app
  /page.tsx - Home with quick actions, continue learning, performance snapshot, optional recommendations
  /learn/[subject]/[chapter]/[topic] - Detailed learning with tabs, flashcards, concept checks, AI context
  /practice - Engine + session player + result analysis
  /tests/[id] - Exam interface with timer, palette, mark for review
  /tests/[id]/analysis - Detailed analysis with meaningful insights
  /mistakes, /revision, /analytics, /focus, /search, /notes, /ai-tutor
```

**Adding JEE:**
- Add examId='JEE' already in types
- Add mathematics subject, chapters
- Same marking scheme interface, different question formats supported
- No rebuild needed

---

## 🚀 Getting Started

```bash
npm install
npm run dev -- --port 3000 --hostname 0.0.0.0
```

Open http://localhost:3000

Build:
```bash
npm run build
npm start
```

---

## 🔍 Key Features Implemented

### Learn
- Structure: NEET → Subject → Class → Unit → Topic (e.g., Biology → Class 11 → Human Physiology → Breathing)
- Tabs: Detailed Learning, Short Notes, Quick Revision (2 min), Important Points, Visual
- Interactive: Flashcards, mini concept checks with instant feedback, "What happens if...?" blocks, expandable sections

### Practice Engine
- Filters: subject, chapter, topic, count 5/10/20/30/50/custom, difficulty easy/moderate/difficult/mixed, type all/PYQ/previously incorrect/mixed, time limit
- Example: Biology → Human Physiology → Breathing → PYQs → Mixed → 20 Qs
- Session: question palette, time tracking, explanation after check, mistake auto-added to bank

### Question System
- Types: MCQ, statement-based, assertion-reason, diagram-based, numerical, conceptual
- Fields: statement, options, answer, explanation, topic, chapter, subject, difficulty, source (ncert/pyq/curated/ai), verified, time expected
- PYQs marked with year

### Tests
- Types: quick, topic, chapter, subject, custom, full-mock
- Features: countdown timer, navigation, mark for review, skip, answer changes, palette, submission confirmation, negative marking, time tracking, section status, final score
- Full Mock: 180 Qs, 180 min, NTA pattern, serious exam simulation

### Test Analysis
- Score, accuracy, correct/incorrect/unattempted, time spent, avg time per Q, subject/chapter/topic/difficulty/question-type performance
- Insights: "You performed well on conceptual Biology but lost marks on statement-based" etc - not just stats

### Mistake Bank
- Stores: original Q, student answer, correct, explanation, topic, chapter, difficulty, date, time taken, attempts, resolved status
- Categorization: concept gap, calculation error, misread, memory, careless, time-pressure (optional, editable)
- Reattempt via custom practice

### Revision
- Short notes, incorrect Qs, weak topics, recently studied, custom sessions, spaced-revision (optional)
- Smart revision suggestions with ignore option

### Analytics
- Test scores, accuracy trends, subject/chapter/topic mastery, speed, attempt history, mistake trends, improvement
- Comparisons: Previous Biology avg 118 → Current 136 Improvement +18
- Estimated NEET score clearly labeled as estimate with basis, never guaranteed

### AI Integration
- Concept explanations grounded in verified content
- Doubt solving, alternative explanations, simplifying, examples, personalized practice, mistake analysis, patterns, revision suggestions, study plans (optional), why answer wrong, custom quizzes, adjusting difficulty, summarizing
- Understands context (which topic/question user is on)
- Clear boundary: verified vs AI

### Focus Tools
- Study timer, custom timer, Pomodoro, stopwatch, session tracking, break reminders, focus mode, full-screen, study history, time per subject
- Supportive, not primary purpose

### Search
- Subjects, chapters, topics, questions, PYQs, notes, concepts, tests, mistakes
- Natural queries: "Questions on capacitors", "Short notes for respiration", "My wrong questions from genetics", "Physics PYQs"

---

## 📊 Data

- **Syllabus**: 3 subjects, 22 chapters, 38 topics with weightage, importance, class level
- **Questions**: 18 curated with PYQs (2020-2023), multiple types, verified
- **Notes**: Detailed, short, quick revision with tables, formulas, important blocks, interactive concept checks
- **Tests**: Quick, chapter, full mock

All mock data is in `/lib/data/` - replace with real DB (Prisma, etc) when scaling.

---

## 🎨 Design

- Modern, educational, trustworthy
- Rounded-2xl cards, subtle borders, zinc palette with subject colors (amber for Bio, blue for Physics, emerald for Chemistry)
- Sidebar with NEET FIRST / JEE Ready badges
- Breadcrumbs everywhere
- No giant dashboard - clear independent sections

---

## 🔮 Future Expansion

- Add JEE: Add subjects to `exams` array, chapters to syllabus, questions with examId='JEE'
- Different marking schemes: Already abstracted in `MarkingScheme`
- Different question formats: `QuestionType` extensible
- Backend: Replace Zustand persist with Prisma + NextAuth + DB
- Real AI: Connect to LLM API with RAG over verified notes

---

## 📝 License

MIT - Educational purpose.

Built for NEET aspirants who want control over their learning journey.

**Learn → Practice → Test → Analyze → Understand mistakes → Revise → Practice again → Improve**
