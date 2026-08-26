# MASTER PROMPT — NEET-First AI Learning & Exam Preparation Platform
# Version: 2.0 — AI-Optimized, 2500 Words, Implementation-Ready
# Purpose: This prompt is designed for an AI coding agent to build a complete, production-grade NEET-first platform. It is structured for machine parsing with explicit schemas, constraints, and deliverables.

---

## 1. ROLE AND CONTEXT FOR AI

You are an expert full-stack AI engineer building a NEET-first educational ecosystem. You are working inside a Next.js 16 App Router repository at `/home/user/Study-1` on branch `arena/01a039cc-study-1`. Your task is to build, not prototype. Every feature must be functional, linked, and data-driven.

**Core Context:**
- Target Exam: NEET UG initially, architecture must support JEE, CUET, and other exams without rebuild
- Target User: Class 11/12 NEET aspirant in India, 16-19 years old, wants control over learning
- Philosophy: `Learn → Practice → Test → Analyze → Understand Mistakes → Revise → Practice Again → Improve`
- Fundamental Rule: Student remains in control. Platform RECOMMENDS, never FORCES. Every recommendation must have options: Revise Now / Practice Now / View Analysis / Ignore for Now
- Data Principle: NO FAKE ANALYTICS. No preset 523/720 scores. Analytics load ONLY after user generates real data via practice/tests. Empty states must explain this intentionally. Estimates must be clearly labeled as ESTIMATES with basis explained, never guaranteed

---

## 2. PRODUCT VISION - WHAT NOT TO BUILD

DO NOT build:
- Simple notes website
- Simple MCQ website
- Generic productivity dashboard
- Single giant dashboard dumping all features

DO BUILD:
- Complete digital learning + examination ecosystem
- Combination of: digital textbook + interactive classroom + question bank + PYQ archive + mock-test platform + mistake notebook + revision system + performance analytics + AI tutor + focus toolkit
- But these must NOT feel glued together. They must form one coherent ecosystem with clear information architecture where every major capability has its own separated section

---

## 3. INFORMATION ARCHITECTURE - REQUIRED ROUTES

You must implement these routes with full functionality. Each route is a separate section, not a tab inside dashboard.

**Primary Routes (Mandatory):**
- `/` Home: Quick actions (choose what you want), recent activity (real data), performance snapshot (real only, empty state when no data), optional recommendations, current goals, recently studied, continue learning, quick practice, recent tests. Home must NOT feel like compulsory daily task list
- `/learn` Learn Ecosystem: Structure NEET → Subject → Class → Unit/Chapter → Topic. Example: NEET → Biology → Class 11 → Human Physiology → Breathing and Exchange of Gases. Topic page must provide Detailed Learning, Short Notes, Quick Revision, Important Points, Visual Learning with interactive components
- `/learn/[subject]` Subject page: Class 11 and Class 12 chapters grouped, weightage, topics preview
- `/learn/[subject]/[chapter]` Chapter page: Topics list, quick actions (View Notes, PYQs, Chapter Test), mastery indicator
- `/learn/[subject]/[chapter]/[topic]` Topic page: Tab selector (Detailed, Short, Quick Revision 2 min, Important Points, Visual), flashcards, mini concept checks with instant feedback, interactive blocks, practice CTAs, AI Tutor context
- `/notes` Notes System: Filters for type (detailed/short/quick-revision/important-points/visual) and subject. Cards showing verified vs AI badges. Organized by subject/chapter/topic, not one giant document
- `/practice` Practice Engine: Powerful builder where student chooses subject, chapter, topic, subtopic, question type, difficulty (easy/moderate/difficult/mixed), number of questions (5/10/20/30/50/custom), time limit (none/1min per Q/2min/custom), PYQ/custom, previously incorrect, mixed. Example must be possible: Biology → Human Physiology → Breathing → PYQs → Mixed Difficulty → 20 Questions. Preview panel showing filtered questions count, PYQ/Easy/Moderate/Difficult breakdown. Real stats from store
- `/practice/session` Practice Session Player: Question palette, timer, check answer, explanation, mistake auto-added to bank, next/prev, finish → result
- `/practice/session/result` Result analysis: Correct/incorrect/unattempted, accuracy, time, question-wise review, links to mistakes/analytics
- `/tests` Tests & Examination Engine: Quick Tests, Topic Tests, Chapter Tests, Subject Tests, Custom Tests, Full NEET Mock (180 Qs, 180 min, +4/-1, NTA pattern). Test cards with Q count, duration, difficulty. Create Custom Test builder
- `/tests/[id]` Test Player: Serious exam interface with countdown timer, question navigation, mark for review, skip, clear, answer changes, question palette with colors (answered/marked/not visited/current), answered/marked/not attempted counts, submission confirmation modal with warning about unattempted
- `/tests/[id]/analysis` Test Analysis: Total score, accuracy, correct/incorrect/unattempted, time spent, avg time per Q, subject/chapter/topic/difficulty/question-type performance. PLUS meaningful interpretation: "You performed well on conceptual Biology but lost marks on statement-based" and "Your Physics accuracy reasonable but avg solving time significantly higher on numerical". Improvement plan optional
- `/mistakes` Mistake Bank: Every incorrect stored with original Q, student answer, correct answer, explanation, topic, chapter, difficulty, date attempted, time taken, timesRepeated, resolved boolean, category. Category options: concept-gap, calculation-error, misread, memory, careless, time-pressure, unclassified. Category editable, not forced. Filters: all/unresolved/resolved + category. Actions: Revise Topic, Practice Similar, Ask AI why wrong, Mark Resolved, Reattempt
- `/revision` Revision System: Spaced revision due (topics studied 5 days ago), unresolved mistakes count, weak topics count, custom revision session builder (short notes only, mistakes only, weak topics, recently studied), smart revision AI suggested optional with Ignore, recently studied topics with mastery %, quick revision notes list
- `/analytics` Performance & Score Improvement: MUST BE REAL DATA ONLY. If no attempts, show empty state explaining intentionally no fake data, what will appear after tests, why no fake. If has data: total score latest, avg accuracy real computed from attempts, study time real from store, tests count real, score trends bar chart from real attempts, subject trends, chapter mastery from topicMastery, mistake types from real mistakes, speed analysis real avg, estimated NEET score clearly labeled as estimate with basis: `Math.round((avgAccuracy/100)*720*0.85)` and explanation never guaranteed, attempt history real, improvement over time real comparisons
- `/focus` Focus & Study Tools: Study timer, custom timer, Pomodoro (25min), stopwatch, session tracking, break reminders, focus mode, full-screen, session history, time spent per subject. Supportive, not primary purpose. Real focus time from store
- `/search` Search & Navigation: Fast intelligent search across subjects, chapters, topics, questions, PYQs, notes, concepts, tests, mistakes. Natural queries: "Questions on capacitors", "Short notes for respiration", "My wrong questions from genetics", "Physics PYQs". Results with type badge, title, subtitle, link, relevance sorted. Try examples chips
- `/ai-tutor` AI Integration: Chat interface with context awareness (topicId or questionId from query params). AI understands what student is studying. Capabilities: concept explanations grounded in verified NCERT, doubt solving, alternative explanations, simplifying difficult concepts, generating examples, creating personalized practice, analyzing mistakes, identifying patterns, revision suggestions, optional study plans, explaining why answer wrong, creating custom quizzes, adjusting difficulty, summarizing material, answering follow-ups. Messages must show grounded badge: "✓ Grounded in verified NCERT • AI-generated but validated • Distinction maintained". Quality & Reliability card explaining trusted vs AI distinction
- `/library` Library: Tabs for Subjects/Chapters/Topics/Questions/Notes using real data from syllabus.ts, questions.ts, notes.ts. Each tab shows real counts
- `/bookmarks` Bookmarks: Empty state when no bookmarks, real bookmarks when user saves. No fake preset
- `/history` History: Real timeline from attempts and sessions, no fake history
- `/goals` Goals: User creates own goals, progress tracked from real data, no fake preset goals
- `/planner` Planner: Weekly view Mon-Fri with tasks, checkboxes, optional AI suggested plan with Apply/Ignore, philosophy: supportive not forcing
- `/community` Community: Doubt forum, leaderboard optional real tests, study groups, recent discussions
- `/profile` Profile: Real progress from store, no fake
- `/settings` Settings: Preferences (exam focus NEET, AI assistance, recommendations), Data & Privacy (real data only, export, clear), Architecture explanation

All routes must be linked from Sidebar and Topbar and Home quick actions. No orphan pages.

---

## 4. DATA MODELS - FUTURE-PROOF ARCHITECTURE

Implement these TypeScript interfaces in `/lib/types.ts`. Architecture must support NEET first but allow JEE without rebuild.

```typescript
ExamType = 'NEET' | 'JEE' | 'CUET' | 'OTHER'
Subject { id, name, shortName, examId: ExamType, classLevel: '11'|'12'|'both', color, icon, chapters: ChapterId[] }
Chapter { id, subjectId, name, classLevel, unit?, weightage?, topics: TopicId[], order }
Topic { id, chapterId, subjectId, name, subtopics?, order, importance: 'low'|'medium'|'high'|'very-high' }
NoteType = 'detailed'|'short'|'quick-revision'|'important-points'|'visual'
Note { id, topicId, chapterId, subjectId, type: NoteType, title, content: { sections: NoteSection[] }, verified: boolean, source: 'ncert'|'curated'|'ai'|'expert', updatedAt }
QuestionType = 'mcq'|'statement-based'|'assertion-reason'|'diagram-based'|'numerical'|'conceptual'|'match-the-following'
Difficulty = 'easy'|'moderate'|'difficult'
QuestionSource = 'ncert'|'pyq'|'curated'|'ai-generated'|'expert'
Question { id, examId, subjectId, chapterId, topicId, subtopic?, type, difficulty, source, year?, statement, options: {id,text,isCorrect}[], correctOptionId, explanation, detailedExplanation?, tags, verified, timeExpectedSeconds }
TestType = 'quick'|'topic'|'chapter'|'subject'|'custom'|'full-mock'|'pyq'
Test { id, examId, type, title, description, subjectId?, chapterId?, topicId?, questionIds, durationMinutes, marking: {correct, incorrect, unattempted, totalQuestions, durationMinutes}, difficulty, createdAt }
TestAttempt { id, testId, examId, startedAt, submittedAt, answers: UserAnswer[], score, total, accuracy, timeSpentSeconds, status }
MistakeEntry { id, questionId, attemptId, subjectId, chapterId, topicId, userAnswerId, correctAnswerId, category: 'concept-gap'|'calculation-error'|'misread'|'memory'|'careless'|'time-pressure'|'unclassified', timesRepeated, lastAttempted, resolved, notes? }
```

Store in `/lib/store/useStore.ts` using Zustand with persist middleware. Store: attempts, mistakes, sessions, topicMastery, recommendations, focusTimeSeconds, currentStreak, totalStudyTimeSeconds. Actions: addAttempt, addMistake, resolveMistake, updateMistakeCategory, addSession, updateTopicMastery, dismissRecommendation, addFocusTime. Persist only real user data, not fake.

Mock data in `/lib/data/syllabus.ts` (3 subjects, 22 chapters, 38 topics), `/lib/data/questions.ts` (18+ questions with PYQs 2020-2023, multiple types, verified), `/lib/data/notes.ts` (detailed/short/quick with sections: heading, paragraph, list, table, formula, important, example, interactive). All data must be real syllabus-aligned, not fabricated PYQs.

---

## 5. UI/UX REQUIREMENTS - NO CLEAN PAGE

Current site looks clean. You must make it MUCH better with multiple pages and links, using data from current website's app code.

**Sidebar Requirements (300px, fixed, grouped):**
- Logo with GraduationCap, NEET Prep, Learn Practice Excel, badges NEET FIRST (black) + JEE Ready Architecture (gray)
- Main section: Home, Learn (Structured syllabus), Notes (Detailed/Short/Quick), Practice (Custom Q builder), Tests (Mocks & chapter tests), Mistakes (Your mistake notebook) with unresolved count badge, Revision (Spaced & weak), Analytics (Real performance data) with tests count, Focus (Pomodoro & timer) - each with icon, label, description, active state black bg
- Study Tools: Library, Bookmarks, History, Goals, Planner, Search, AI Tutor
- Subjects: Biology (amber), Physics (blue), Chemistry (emerald) with Q counts, icons, hover →
- More: Community, Profile, Settings
- Bottom: User avatar, name, real stats (tests count, mistakes), link to profile
- Insight card: gradient black to zinc-800, shows different text based on hasData: if no tests "Take your first test to unlock..." else "You've taken X tests..."

**Topbar Requirements:**
- Left: NEET 2026 + real test count or "Take a test to see estimated score"
- Right: Search bar with Command K, Planner link, Focus button black, Bell with red dot if hasData, streak badge amber, Library icon
- Sticky, backdrop-blur, border-b

**Home Requirements:**
- Header with greeting, description of philosophy, badges for subjects/chapters/topics counts, real attempts badge
- 4 stat cards with Progress component: Study Time (real totalStudyTimeSeconds), Accuracy (real avgAccuracy or -- if no data), Tests Taken (real attempts.length), Mistakes (real unresolved). Each with icon, progress bar, subtext real or empty state
- Quick actions: 8 cards grid 2x4 md 4x2, each with emoji, label, desc from real data (e.g., PYQs count real), hover shadow, chevron
- Continue Learning: 3 items with topic, chapter, progress bar, time left, color dot
- Subjects Deep Dive: 3 cards using getChaptersBySubject real data, showing 3 chapters each with weightage
- Performance: If hasData show 3 cards Latest Score/Avg Accuracy/Improvement with real data, else empty state with icon, title "No analytics yet", explanation, CTA buttons Take First Test / Practice 10 Qs
- Right column: Recommendations (optional) with priority badges, reason, action buttons Revise Now / Ignore, note "never force"; Explore Ecosystem with 10 links (Learn, Practice, Tests, Analytics, Library, Bookmarks, History, Goals, Planner, Community) each with icon, label, desc; Recent Activity real from attempts or empty state; Study Streak black card with 7 days

**Analytics Requirements:**
- If no data: empty state with icon, title "No analytics yet - and that's intentional", 3 cards explaining what/how/no fake, CTA buttons, 2 cards explaining why no fake and what happens after first test
- If has data: 4 stat cards with Progress, score trends bar chart from real attempts (map attempts to divs with height (score/total)*180), subject performance with Progress, mastery from topicMastery, mistake analysis from real mistakes, speed real avg, estimated score black card with estimate Math.round((avgAccuracy/100)*720*0.85) clearly labeled as estimate with basis, attempt history real, next steps buttons

**Other Pages:**
- Library: Tabs component with 5 tabs showing real counts, each tab grid of cards from real data
- Practice: Preview with real filtered questions, stats real from store with empty state
- All pages must have many internal links to avoid clean page feeling. Every card should link somewhere. Use real syllabus data to create links

**UI Components to Create:**
- Button (variants default/outline/ghost/secondary/destructive, sizes default/sm/lg/icon, rounded-xl)
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter (rounded-2xl, border zinc-200, shadow-sm)
- Badge (variants default/secondary/outline/success/warning/destructive, rounded-full)
- Tabs, TabsList, TabsTrigger, TabsContent (for Library and topic tabs)
- Progress (h-2, bg-zinc-100, bg-zinc-900)
- Separator (h-px or w-px bg-zinc-200)

**Design System:**
- Colors: zinc-900 black primary, zinc-50/100 backgrounds, amber-50/blue-50/emerald-50 for subjects, amber for warnings, emerald for success
- Rounded: 2xl for cards, xl for buttons, full for badges
- Typography: font-sans, tracking-tight for headings, 13px/12px/11px for body/small
- Shadows: shadow-sm on hover, no heavy shadows
- No dark mode required, light mode only with #fcfcfc background

---

## 6. FUNCTIONAL REQUIREMENTS PER MODULE

**Learn Module:**
- Detailed Learning: structured explanations, concepts, definitions, important facts, examples, diagrams (placeholder), tables/comparisons, NCERT-aligned
- Interactive Learning: expandable concepts (details/summary), interactive diagrams (placeholder), mini concept checks with 2-4 options, instant feedback correct/incorrect with explanation, flashcards Q/A with show answer, quick questions, "What happens if...?" blocks
- Student chooses depth via tabs, not forced

**Practice Module:**
- Builder UI with subject → chapter → topic cascading filters
- Count selector 5/10/20/30/50/custom input
- Difficulty selector mixed/easy/moderate/difficult
- Type selector all/PYQ/previously incorrect/mixed
- Time limit optional
- Start Practice creates session with questionIds sliced to count, navigates to /practice/session?ids=...
- Session: current question with badges (subject, type, difficulty, PYQ year, verified), statement, options with letter circles, select, check answer, show explanation with correct/incorrect icons, time taken, palette grid 5 cols with colors for answered/correct/incorrect/current, progress, next/prev, finish → result
- Result: correct/total/time/accuracy, analysis meaningful, question-wise review, links to practice again/mistakes/analytics

**Tests Module:**
- Test list grouped: Quick & Topic, Chapter, Full Mocks (border-zinc-900)
- Test card: title, description, type badge, Q count, duration, difficulty, Start Test button
- Custom Test builder placeholder with select for type
- Player: header with title, Q count/duration/marking badge, timer red if <5min, submit button, question area with Q number, subject/difficulty badges, mark for review flag button, statement, options border-2 with selected state black, prev/next/clear, palette sidebar 340px with grid 5 cols colors, answered/marked/not visited/current legend, answered/marked/not attempted counts, submit button, submission confirmation modal with unattempted count warning

**Mistakes Module:**
- Filters: all/unresolved/resolved + category all/concept-gap/calculation/misread/memory/careless/time-pressure
- Stats: unresolved count, repeated mistakes count, fixed after revision %
- Mistake card: badges subject/chapter/topic/timesRepeated, date, statement, your answer red, correct emerald, explanation in zinc-50 border, actions Revise Topic/Practice Similar/Ask AI, right sidebar category select (editable, optional note), Mark Resolved/Reattempt buttons
- Empty state when filter yields 0

**AI Tutor Module:**
- Chat with messages array role user/ai content grounded boolean
- Initial AI message with context topic/question
- Input with send button, example chips: Explain simply, Give example, Why wrong, Create 5 Qs, Summarize
- AI responses grounded in verified content, with badge "Grounded in verified NCERT"
- Sidebar: What AI Can Do list (10 capabilities), Quality & Reliability black card, Current Question Context if questionId present, Quick Actions buttons
- No fabrication, distinction maintained

**Focus Module:**
- Timer modes: Pomodoro (25min), Custom (input minutes), Stopwatch
- Circular progress with clipPath based on timeLeft
- Play/Pause/Reset buttons rounded-full
- Subject selector biology/physics/chemistry
- Sessions Today, Focus Today, Total Studied cards
- Session History list with subject/topic/duration/time
- Focus Mode black card, Time Spent per Subject

**Search Module:**
- Input with search icon, placeholder natural query example
- Try chips with 6 examples
- Results computed from subjects, chapters, topics, questions (filter statement/tags), notes (title) when query length >1, sorted by relevance, slice 20, each card with type badge, title, subtitle, link, →
- No results card with suggestion
- When no query: Recent Searches, Popular Topics, Quick Access

---

## 7. QUALITY, RELIABILITY, AND CONSTRAINTS

- Academic accuracy extremely important
- Verified content distinguished from AI-generated with badges ✓ Verified vs AI
- Question answers, explanations, formulas, marking schemes validated before authoritative
- Do NOT fabricate NEET questions, PYQs, statistics, official exam information
- Estimated scores clearly labeled as estimates, basis explained, never guaranteed
- No preset data or fake analytics - analytics loaded after user enters data
- Use real data from lib/data/ for syllabus, questions, notes to make UI better and add multiple pages/links
- Do not add primitive fake analytics like 342 Qs hardcoded
- All stats must be computed from Zustand store (attempts, mistakes, sessions, topicMastery, focusTimeSeconds, totalStudyTimeSeconds) or empty state
- Build must pass: `npm run build` with 24+ routes, no TypeScript errors
- Dev server must run on 0.0.0.0:3000 for preview
- Commit to branch arena/01a039cc-study-1, push to origin
- Use Tailwind CSS 4, no external UI library beyond lucide-react, zustand, clsx, tailwind-merge
- No deletion of .git directory

---

## 8. DELIVERABLES CHECKLIST FOR AI

Before finishing, verify:
- [ ] Home has real stats, empty states, 8+ quick actions, subjects deep dive, many links
- [ ] Learn has 3 levels subject/chapter/topic with tabs, flashcards, concept checks, real syllabus data
- [ ] Notes has filters, verified badges, organized
- [ ] Practice builder with cascading filters, preview real, session player, result, real stats
- [ ] Tests list grouped, player with timer/palette/mark for review/submission modal, analysis with meaningful insights
- [ ] Mistakes with filters, categorization editable, real data
- [ ] Revision with spaced due, unresolved, weak topics, custom builder, smart suggestion optional
- [ ] Analytics with no fake data, empty state explaining intentionally, real data computed, estimates labeled
- [ ] Focus with Pomodoro/custom/stopwatch, real tracked time
- [ ] Search with natural queries, real data from syllabus/questions/notes
- [ ] AI Tutor with context awareness, grounded badges, 10 capabilities listed
- [ ] Library with 5 tabs real data
- [ ] Bookmarks, History, Goals, Planner, Community, Profile, Settings pages all exist and linked
- [ ] Sidebar 300px grouped Main/Study Tools/Subjects/More with real counts, insight card
- [ ] Topbar with search, planner, focus, bell, streak, library
- [ ] UI components: Button, Card, Badge, Tabs, Progress, Separator
- [ ] Store uses Zustand persist, real data only
- [ ] No hardcoded fake analytics like 342 Qs, 523/720, 68%→74% fake - all real or empty
- [ ] Build passes, 24+ routes
- [ ] Dev server runs on 0.0.0.0:3000
- [ ] Committed and pushed to arena/01a039cc-study-1

---

## 9. FINAL INSTRUCTION

Build the platform as described. Prioritize product architecture, functionality, educational experience, data structure, question engine, testing engine, personalization, reliability, and real-data-only analytics over visual branding. Visual design should be modern, educational, trustworthy, but not at cost of functionality. Ensure every page has many internal links so site does not look like just a clean page. Use data from current website's app code (syllabus, questions, notes) to make UI much better.

When done, run `npm run build` to verify, then `npm run dev -- --port 3000 --hostname 0.0.0.0` to show preview, then commit and push.

This prompt is ~2500 words and designed for AI to understand more clearly than human - it has explicit schemas, constraints, checklists, and implementation-ready details.

