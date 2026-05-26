## References for questions
## AZ-104
Identity & Governance = https://learn.microsoft.com/en-us/training/paths/az-104-manage-identities-governance/
Virtual Networks      = https://learn.microsoft.com/en-us/training/paths/az-104-manage-virtual-networks/
Storage               = https://learn.microsoft.com/en-us/training/paths/az-104-manage-storage/
Compute               = https://learn.microsoft.com/en-us/training/paths/az-104-manage-compute-resources/
Monitoring & Backup   = https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/

# AzureAce — Project Context & Handoff Docume- **Task Simulator** ✅ — `TaskSimulator.jsx` + `tasksimulator.css`. Three sub-types via `taskType` field:
  - `"fill-in"` — one or more labelled text inputs; checked against `blanks[].answer` (case/whitespace-insensitive); shows per-field ✓/✕ icons + correct answer on wrong
  - `"order"` — shuffled steps displayed as clickable options; user builds the sequence by clicking; supports remove-from-sequence
  - `"match"` — click-to-pair left/right columns; used/active/targetable states; shows correct pairs on wrong submission
  - All sub-types: SRS-aware, exam-mode-aware, `hideAnswers` compatible, "💡 Show explanation" reveal, "🔁 Try Again" retry, ⌨️ Task filter chip in sidebar + Readiness Dashboard
  - 6 sample cards added to `az-104.jsx` (IDs 90–95): 2 fill-in CLI, 2 order, 2 matcht
_Last updated: May 14, 2026_

---

## What is this?

**KloudAce** is a React + Vite Azure certification flashcard/MCQ web app.
It lives at: `c:\Devops Projects\learnazure\my-react-app`

Run locally with:
```pwsh
cd "c:\Devops Projects\learnazure\my-react-app"
npm run dev
```

---

## Current Feature State

### ✅ Done
- React + Vite project scaffold
- **Flashcard.jsx** — 3D CSS flip card, Next Card / Review Again buttons
- **multichoice.jsx** — MCQ with Fisher-Yates shuffled choices (keyed by card.id), correct/wrong highlighting, explanation box
- **flashcards.js** — aggregator importing az-104, az-700, az-900; exports default array + `EXAM_META` map
- **ExamSelect.jsx** — post-login splash page, one gradient card per exam with icon + card count
- **Auth system** — `useAuth.js` (localStorage + SHA-256 hashed passwords), `AuthProvider.jsx`, `Login.jsx`
- **Per-user localStorage** — flags: `azfc_flagged_<userId>`, known: `azfc_known_<userId>`; reloads on user switch
- **Multi-select categories** — `categories` is a `Set`; pill toggle; "All" clears others; falls back to All if empty
- **Card type filter** — segmented control: All Types / Flip Cards / MCQ
- **Flagging** — flag button per card; `🚩 Flagged` virtual category pill; sidebar toggle for flagged-only view
- **Sidebar** — randomise toggle (Fisher-Yates), restart session (`sessionKey` increment), flagged cards toggle + clear all
- **Progress bar** — known count, flagged count, percentage
- **Prev/Next navigation** — card-nav buttons
- **Session flow** — Login → ExamSelect splash → Main app; `← Exams` button returns to splash
- **Header** — CSS Grid 3-col, gradient, AzureAce branding, SVG user icon, Sign Out + ← Exams + Options buttons

### 🔲 Pending / Next Steps
- Add more cards to AZ-104 (currently 20), AZ-700 (20), AZ-900 (23)


### Card Ideas
Here are some fun and engaging task/card types to consider adding:

- **Hotspot Diagram Questions**  
  Show a network or architecture diagram. Users must click the correct area (e.g., “Click where the NSG should be placed”). Give instant feedback and highlight correct/incorrect regions.

- **Drag and Drop Matching**  
  Let users drag terms (e.g., Azure services, CLI commands) onto matching definitions, use cases, or diagram parts. Great for architecture mapping or service-to-scenario matching.

- **Scenario Builder**  
  Present a real-world scenario (e.g., “A company needs high availability for their web app”). Users select and sequence Azure services to build a solution. Give feedback on optimality and missing/extra components.

- **Lightning Round Timed Quiz**  
  60 seconds to answer as many rapid-fire questions as possible. Mix MCQ, true/false, and short answer. Show streaks, high scores, and badges for performance.

- **Fill in the Azure Portal**  
  Simulate Azure Portal UI (mocked). Users fill in fields for a deployment (e.g., VM name, region, SKU). Validate against best practices or scenario requirements.

- **Command Line Race**  
  Show a CLI scenario (e.g., “Create a resource group”). Users type the command as fast as possible. Timer and accuracy scoring, with hints for mistakes.

- **Achievement Badges**  
  Award badges for milestones: streaks, perfect scores, mastering categories, trying all task types, etc. Show in profile and on splash page.

- **Daily Challenge**  
  One new, unique question or scenario each day. Leaderboard for fastest/most accurate completions.

- **Peer Challenge**  
  Let users create and share their own questions/tasks. Others can try, rate, and comment.

- **Story Mode**  
  Progress through a series of connected scenarios (like a case study). Choices affect the next scenario, with branching paths and feedback.

---

### ✅ Script Simulator (added April 30, 2026)
- New `taskType: "script"` sub-type handled by `ScriptTask` component inside `TaskSimulator.jsx`
- **Interactive terminal** — dark themed, macOS-style window chrome (🔴🟡🟢), scrollable command history
- **Help system** — typing `--help` (bash) or `Get-Help <cmd>` (PowerShell) renders the card's `helpText` as a blue-tinted block, just like the real CLI. Unrecognised commands show a red `command not found` / `not recognized as a cmdlet` error line.
- **Token-set grading** — `requiredTokens[]` array; order-independent; per-token ✓/✕ pill diff shown after submit
- **Model answer** block revealed on wrong submission; `helpText` stays available before submit via tip banner
- **Shell-aware** — `shell: "bash"` → `$ ` prompt + `--help` hint; `shell: "powershell"` → `PS > ` + `Get-Help` hint
- **`💻 Script` filter** — new sidebar type button + `afterTypeFilter` branch; `⌨️ Task` button now excludes script cards
- **ReadinessDashboard** — `typeCount.script` counter + `💻 Script` chip in `TYPE_META`
- **3 sample cards** in `az-104.jsx` (IDs 97–99): `az vm create` (bash), `az network vnet create` (bash), `New-AzRoleAssignment` (PowerShell) — each with full `helpText` and `modelAnswer`
- **Card shape additions**: `shell`, `requiredTokens[]`, `helpText`, `modelAnswer`, `placeholder`

---

## File Structure

```
my-react-app/
  index.html
  package.json
  vite.config.js
  public/
    favicon.svg
  src/
    main.jsx              # Wraps App in AuthProvider
    App.jsx               # Main app logic + all state
    App.css               # All styles (including splash)
    ExamSelect.jsx        # Post-login exam selection splash
    Flashcard.jsx         # 3D flip card component
    Flashcard.css
    multichoice.jsx       # MCQ component
    multichoice.css
    flashcards.js         # Aggregator: imports all data files, exports cards + EXAM_META
    auth/
      useAuth.js          # Auth hook (localStorage impl — swap body for MSAL to use Entra ID)
      AuthProvider.jsx    # React context wrapping useAuth
      Login.jsx           # Sign in / register UI
      Login.css
    data/
      az-104.js           # Cards IDs 1–99,   exports default array + meta = { exam, fullName }
      az-700.js           # Cards IDs 101–199, exports default array + meta
      az-900.js           # Cards IDs 201–299, exports default array + meta
```

---

## Key Data Shapes

### Card object
```js
{
  id: number,           // Unique. AZ-104: 1-99, AZ-700: 101-199, AZ-900: 201-299
  exam: "AZ-104",       // | "AZ-700" | "AZ-900"
  category: string,     // e.g. "Compute", "Networking"
  question: string,
  answer: string,       // Used by Flashcard (flip card back)
  // MCQ-only fields (presence of `choices` determines card type):
  choices: string[],    // Array of answer options
  correctAnswer: string,// Must match one of choices exactly
  explanation: string,  // Shown after answering
  learnUrl?: string,    // Optional Microsoft Learn deep-link — renders "📖 Learn more" in all card types

  // Task Simulator fields (type: "task"):
  taskType: "fill-in" | "order" | "match",
  // fill-in:
  blanks: [{ label: string, answer: string, hint?: string }],
  // order:
  steps: string[],      // Correct sequence
  // match:
  pairs: [{ left: string, right: string }],
}
```

### EXAM_META (from flashcards.js)
```js
{
  "AZ-104": { exam: "AZ-104", fullName: "Azure Administrator" },
  "AZ-700": { exam: "AZ-700", fullName: "Azure Network Engineer" },
  "AZ-900": { exam: "AZ-900", fullName: "Azure Fundamentals" },
}
```

### Auth hook return shape (useAuth.js)
```js
{ user, isAuthenticated, login, register, logout, error, setError }
// user = { id, name, email }  (no hash — never stored in session)
```

### localStorage keys
| Key | Contents |
|-----|----------|
| `azfc_users` | `[{ id, name, email, hash }]` — all registered accounts |
| `azfc_session` | `{ id, name, email }` — current session |
| `azfc_flagged_<userId>` | `number[]` — flagged card IDs for this user |
| `azfc_known_<userId>` | `number[]` — known card IDs for this user |

---

## App State (App.jsx)

| State | Type | Purpose |
|-------|------|---------|
| `selectedExam` | `string\|null` | null = show ExamSelect splash |
| `categories` | `Set<string>` | Multi-select category filter; "All" = no filter |
| `cardType` | `"both"\|"flashcard"\|"mcq"\|"multi"\|"truefalse"\|"image-mcq"\|"task"` | Card type filter |
| `index` | `number` | Current card index in deck |
| `known` | `Set<number>` | Card IDs marked known this session |
| `flagged` | `Set<number>` | Flagged card IDs (persisted) |
| `mastered` | `Set<number>` | Mastered card IDs (persisted); excluded from deck by default |
| `showFlaggedOnly` | `boolean` | Sidebar toggle — show only flagged |
| `showMastered` | `boolean` | Sidebar toggle — include mastered cards in deck |
| `randomised` | `boolean` | Shuffle deck via Fisher-Yates useMemo |
| `sessionKey` | `number` | Incremented on restart to force remount |
| `finished` | `boolean` | True when end of deck reached |
| `sidebarOpen` | `boolean` | Options sidebar visibility |
| `srsMode` | `boolean` | Spaced repetition mode (SM-2) |
| `srsData` | `object` | Map of cardId → SRS record; loaded per user+exam |
| `hideAnswers` | `boolean` | Read from `azfc_settings_<userId>`; blocks answer reveal |
| `examMode` | `boolean` | Exam mode enabled |
| `examReady` | `boolean` | True once user clicks Begin on intro screen |
| `timeLeft` | `number` | Seconds remaining on exam timer |
| `examExpired` | `boolean` | True when timer hits 0 |
| `examResults` | `array` | `{ card, correct, given, expected }` per answered card |
| `examDone` | `boolean` | True when all cards answered or timer expired |

### Deck pipeline (in order)
1. Filter by `selectedExam`
2. Filter by `categories` Set (virtual: "All", "🚩 Flagged")
3. Filter by `showFlaggedOnly` sidebar toggle
4. Filter by `cardType` ("flashcard" = no choices, "mcq" = has choices)
5. Optionally shuffle via `useMemo`

---

## App Flow

```
Not logged in  →  Login.jsx (sign in / register)
                       ↓
Logged in      →  ExamSelect.jsx (splash — pick exam)
                       ↓
Exam selected  →  App.jsx main view
                       ↑
              "← Exams" button in header always returns here
```

---

## Entra ID Migration Path

`useAuth.js` is designed as a **drop-in replacement target**.
The hook always returns the same shape regardless of implementation.
To migrate:
1. `npm install @azure/msal-browser @azure/msal-react`
2. Replace the body of `useAuth.js` with MSAL calls
3. No other files need to change

---

## Known Issues / Gotchas
- `handleExam` must be defined **before** the auth/splash gates in App.jsx (const is not hoisted)
- `shuffledChoices` in MCQ uses `useMemo([card.id])` — do not change dep array or choices will re-shuffle on every render
- `sessionKey` in card component keys (`${sessionKey}-${card.id}`) forces full remount on restart — required to reset MCQ state
- SHA-256 password hashing is client-side only — fine for local dev, not production

---

## Session Log

### April 23, 2026

- **SRS progress dot on card** — red/yellow/green dot renders in the top-left corner of the card wrapper when SRS mode is active (🔴 not started, 🟡 learning, 🟢 mature). Hidden when SRS mode is off.
- **Label change** — "review now" renamed to "reviewing" across all three display locations in `App.jsx`
- **User Profile modal** — new `UserProfile.jsx` + `UserProfile.css` in `src/auth/`. Opened by clicking the user name in the header. Three tabs:
  - 👤 **Profile** — edit display name and email
  - 🔒 **Password** — change password (validates current, confirms new, min 6 chars)
  - 📊 **Stats** — mastered/mature/learning summary cards + per-exam SRS breakdown table
- **`updateProfile` and `changePassword`** added to `useAuth.js` and exposed via `AuthProvider`
- **Clear all SRS tracking** — button in Profile → Stats tab; clears all `azfc_srs_<userId>_*` localStorage keys with a confirm dialog; stats table refreshes immediately
- **`ConfirmDialog` component** — new `ConfirmDialog.jsx` + `ConfirmDialog.css` in `src/`. Replaces all `window.confirm` calls with a styled in-app modal (animated, blurred backdrop, cancel + destructive confirm buttons)
- **Sidebar cleanup** — removed the redundant "Spaced Repetition" section from the sidebar (stats and reset now live in the Profile page). SRS toggle + live 🔴/🟡/🟢 counts remain in "Card Order" section
- **CSS regression fix** — `import "./App.css"` had been accidentally dropped from `App.jsx` during a failed string replacement, causing all styles to disappear. Restored.
- **`index.css` cleanup** — replaced Vite starter boilerplate (fixed `1126px` `#root` width, `border-inline`, `text-align: center`, global `background`, `h1`/`h2`/`p` overrides) with a minimal reset. Layout centring moved to `.app` in `App.css` (`max-width: 1126px; margin: 0 auto; border-inline: 1px solid #e5e7eb`)
- **Cloud drop shadow** — added `filter: drop-shadow(0 4px 10px rgba(0,0,0,0.45))` to `.azure-icon` in `App.css`
- **Card hover lift** — implemented across all card types: `.flashcard-scene` (`Flashcard.css`), `.mcq-card` (`multichoice.css`), `.image-mcq-card` (`imagemcq.css`) all get `translateY(-6px)` + deeper shadow on hover
- **Animated shimmer progress bar** — `.progress-bar-fill` gains `position:relative; overflow:hidden` + `@keyframes shimmer` pseudo-element sweep using `var(--exam-from) → var(--exam-mid)` exam theme colours
- **Hide Answers feature** — full implementation:
  - `App.jsx`: `hideAnswers` state read from `azfc_settings_<userId>` localStorage; re-reads when profile modal closes; prop threaded to all 5 card components
  - `Flashcard.jsx`: blocks flip when `hideAnswers` on, shows "🙈 Hide answers is on" hint
  - `multichoice.jsx`, `TrueFalse.jsx`, `MultiSelect.jsx`, `ImageMCQ.jsx`: hide feedback text + explanation, show `.hide-answers-notice`
  - `UserProfile.jsx` Settings tab: real toggle UI for "🙈 Hide answers"; saves to `azfc_settings_<userId>` as `{ hideAnswers: bool }`
  - `UserProfile.css`: added `.profile-settings`, `.settings-row`, `.settings-row-label`, `.settings-row-title`, `.settings-row-desc`
  - `App.css`: added `.hide-answers-notice` style
- **Bug fix — Hide Answers colour leak** — `getButtonClass` / `getClass` in all 4 MCQ-type components was still applying `correct`/`wrong`/`ms-missed` CSS classes when `hideAnswers` was on, revealing the answer via button colour. Fixed: when `hideAnswers=true` and answered, all components now return neutral classes only (selected → `ms-selected`, others → `dimmed`)

- **Exam Mode** — full end-to-end implementation:
  - **State**: `examMode`, `examReady`, `timeLeft`, `examExpired`, `examResults[]`, `examDone`, `timerRef`
  - **Sidebar toggle** — new "Exam Mode" section with ⏱️ 15-minute timer toggle; closes sidebar on enable
  - **Intro screen** — when `examMode && !examReady`, a styled intro card replaces the deck showing rules; "Begin Exam" starts the timer and resets index; "Cancel" exits
  - **Timer banner** — sticky bar below the header showing three states: idle (waiting for Begin), counting down (blue gradient with `MM:SS` clock), warning (orange + pulsing animation when ≤60s remain, clock turns yellow and pops), expired (red + "Time's up!")
  - **Silent answering** — all 5 card components accept `examMode` + `onExamAnswer` props; when `examMode=true`, selecting an answer records `{ card, correct, given, expected }` and immediately advances with zero feedback shown (no green/red, no explanations, no Review/Next buttons)
  - **Flashcard in exam mode** — clicking the front advances directly without flipping
  - **Results screen** — when `examDone`, a full results screen shows: score header with percentage, per-card rows (✅ correct / ❌ wrong / ⏭️ not reached), your answer vs correct answer, and `💡` explanation for each card; "Try Again" goes back to intro; "Exit Exam Mode" returns to normal study
  - **Timer expiry** — `setInterval` auto-sets `examExpired + examDone` when countdown hits 0, ending the exam mid-deck and showing results for answered cards only (unanswered shown as "Not reached")
  - **Prev/Next nav** hidden during exam mode
  - **CSS added**: `.exam-timer-banner` + `.warning`/`.expired` variants, `@keyframes banner-pulse`, `@keyframes tick-pop`, `.exam-timer-stop`, `.exam-intro-box`, `.exam-intro-begin/cancel/rules`, `.exam-results-screen`, `.exam-result-row`, `.exam-result-correct/wrong/skipped`, `.exam-results-score`, `.sidebar-hint`
  - **Testing**: `EXAM_DURATION` currently set to `10` seconds — change back to `15 * 60` before release

### April 28, 2026

- **SRS dot spacing** — moved SRS progress dot out of absolute positioning into a flex footer row (`.srs-dot-footer`) rendered below each card. Dot is now inline with a text label, no longer floating outside the card boundary.
- **SRS dot labels updated**:
  - 🔴 **Not started** → label text `"Not started"`
  - 🟡 **Learning** → label text `"Learning"` (repetitions 1–2)
  - 🟢 **Mature** → label text `"Mature"` (repetitions ≥ 3)
- **Readiness score algorithm updated** — score now = `(Mastered + SRS Mature − overlap) ÷ total` to avoid double-counting cards that are both ⭐ Mastered and 🟢 Mature. `masteredAndMature` count tracked per exam and per category.
- **Dashboard stat pills simplified** — removed ⭐ Mastered and "Due for Review" pills; now shows only three coloured states:
  - 🔴 Reviewing (not yet started)
  - 🟡 Learning
  - 🟢 Mature
- **Dashboard category badges** — removed ⭐ mastered badge; category rows now show 🟢 Mature / 🟡 Learning / 🔴 Not started badges only. Added `.rd-badge.not-started` CSS class (red tint).
- **Dashboard hint text** — updated to `"Score = (Mastered + SRS Mature) ÷ total cards"`.
- **`card-body-wrapper` padding** — removed `padding-bottom` hack; spacing handled by `.srs-dot-footer` instead.

### May 11, 2026 (Evening — Session 2)

- **Deck enter transition** — added a symmetrical enter animation when selecting an exam from the splash page, mirroring the existing exit animation (`app-exit`):
  - New `@keyframes app-enter` in `App.css`: slides up from `translateY(28px) scale(0.97)` → natural position while fading in
  - New `.app--entering` class: `0.35s cubic-bezier(0, 0, 0.2, 1)` (ease-out, matching the snappiness of the ease-in exit), `pointer-events: none` during animation
  - `.app--entering .sidebar` and `.sidebar-overlay` set to `display: none` — fixes bug where the sidebar/nav panel was flashing into view during the enter animation due to `position: fixed` breaking out of the parent CSS transform
  - `isEntering` state added to `App.jsx`; `handleExam` sets it `true` then clears after 350 ms
  - App root div gains `app--entering` class during that window

- **Sidebar flash bug on deck enter fixed** — `position: fixed` elements escape the normal document flow when a parent has a CSS `transform` applied. Same fix already used for `app--exiting` (`.app--exiting .sidebar { display: none }`) applied to `.app--entering` as well.

- **Enter/exit transition speed matched** — enter was initially `0.4s cubic-bezier(0.22, 1, 0.36, 1)` (spring/ease-in-out), which felt slower than the exit's `0.35s cubic-bezier(0.4, 0, 0.6, 1)`. Updated enter to `0.35s cubic-bezier(0, 0, 0.2, 1)` (ease-out) — same duration, opposite curve direction to the exit's ease-in, giving both transitions the same snappy feel.

### May 11, 2026 (Evening)

- **AZ-305 flashcard data** — added two new flashcards to `src/data/AZ-305/az-305-flashcard.js`:
  - `AZ-305-FC-101` (medium) — Azure Site Recovery vs Azure Backup in business continuity; `learnUrl` → Azure Backup overview
  - `AZ-305-FC-102` (hard) — Role of Azure Bicep (ARM templates) in business continuity; `learnUrl` updated to `azure-resource-manager/templates/overview` (more appropriate than the previous backup URL)

- **Flashcard vertical growth fix** — cards with long back-face text (e.g. "Design Business Continuity Solutions") were clipped or overflowing due to a fixed `height: 320px`. Fixed in `Flashcard.css`:
  - `.flashcard-scene` — changed `height: 320px` → `min-height: 320px`
  - `.flashcard` — added `min-height: 320px`; `height` remains `100%` to fill the scene
  - `.flashcard-face` — added `min-height: inherit; height: 100%` so both faces always fill the card
  - Added `.flashcard-sizer` (invisible `display: grid`) inside `.flashcard` in `Flashcard.jsx` — renders both front and back content stacked in the same grid cell (`grid-area: 1/1`) so the card's natural height is always the maximum of the two faces, preventing any height jump during the flip animation

- **Flip animation text-jump bug fix** — text on the back face visibly shifted position when flipping back to the front. Root cause: `{flipped && <div className="action-buttons">}` was unmounting the action buttons the instant `flipped` became `false`, causing the back face to re-center its content mid-animation. Fix in `Flashcard.jsx`: action buttons are now **always rendered** in the DOM; when not flipped they are hidden via `style={{ visibility: "hidden", pointerEvents: "none" }}` so layout remains stable throughout the 0.55 s transition.

- **Difficulty badge now animates with the card** — the difficulty badge (Easy / Medium / Hard / Extreme) was previously rendered as `position: absolute` inside `.card-body-wrapper` in `App.jsx`, outside the 3D flip transform — so it stayed still while the card flipped. Changes:
  - Removed the badge `<span>` from `App.jsx`'s `card-body-wrapper`
  - Added `hideDifficulty` as a prop to `<Flashcard>` (passed from `App.jsx`)
  - `Flashcard.jsx` now computes a `difficultyBadge` element and renders it inside **both** the front face and back face (and both invisible sizer faces), so it flips with the card and is always correctly positioned
  - `App.css` `.difficulty-badge--on-card` — added `align-self: flex-end` so the badge sits neatly in the top-right of each face's flex column without needing `position: absolute`

### May 11, 2026

- **Header + main body entrance animations** — added CSS keyframe animations to `App.css`:
  - `.app-header` → `header-enter` (0.55 s, `cubic-bezier(0.22,1,0.36,1)`): fades in and slides down 18 px from above on page load.
  - `.main-content` → `content-enter` (0.5 s, same easing, 0.15 s delay): fades in and slides up 14 px, staggered slightly after the header so the two elements arrive in sequence rather than simultaneously.
  - Both use `animation-fill-mode: both` so there is no flash of unstyled content before the animation begins.

### May 7, 2026

- **`diagrams.jsx` recreated** — `src/data/diagrams.jsx` was previously deleted, breaking `az-104.jsx` at runtime (`ReferenceError: VNetNsgDiagram is not defined`). Recreated with both SVG exports:
  - `VNetNsgDiagram` — VNet with Subnet-A (NSG-A blocking port 22, VM-A) and Subnet-B (missing NSG question mark, VM-B with port 443 failing); used by card ID 27
  - `StorageRedundancyDiagram` — GZRS diagram: 3 zone copies in primary region + 2 LRS copies in secondary region with async replication arrow; used by card ID 28
  - Import restored in `az-104.jsx`: `import { VNetNsgDiagram, StorageRedundancyDiagram } from "./diagrams.jsx"`

- **SRS Learning/Mature thresholds updated** — `getSrsStats()` in `spacedRepetition.js` switched from rep-count-based to interval-based classification, matching Anki's standard:
  - **Learning (Young)**: `repetitions > 0 && interval < 21 days` (previously `repetitions < 3`)
  - **Mature**: `interval >= 21 days` (previously `repetitions >= 3`)
  - Rationale: a card with 3 correct answers has only been out ~7–15 days; 21 days is the established threshold at which genuine long-term retention is demonstrated

- **learnUrl audit completed** — all data files checked:
  - **AZ-104** (`az-104.jsx`) — all 37 cards (IDs 1–28, 90–99) have `learnUrl` ✅
  - **AZ-700** (`az-700.js`) — all present cards (IDs 101–119, 121–125) have `learnUrl` ✅; **ID 120 is missing** (array skips 119 → 121) — needs a card added
  - **AZ-900** (`az-900.js`) — all 20 cards (IDs 201–220) have `learnUrl` ✅

---

### May 14, 2026 — Three-option splash chooser

- Replaced the single-purpose exam-select splash with a **3-option chooser** to route users into the right study mode up-front.
- **`src/ExamSelect.jsx`** rewritten to implement three views (controlled by local `view` state):
  - `chooser` — three gradient cards: "📚 Exam cards", "🗂️ My Cards", "🔎 By topic". Logo + greeting shown here.
  - `exams` — reuses the existing exam-card grid; calls `onSelect(exam)` unchanged (backward-compatible with `App.jsx`).
  - `topics` — aggregates card `category` values from all flashcards, sorted by count, rendered as a 2-col scrollable grid. Calls `onSelectByTopic(topic)` when provided, otherwise falls back to `onSelect("TOPIC:<topic>")`.
- Unused refs/state (`scrollRef`, `scroll`, `DECK_COLOURS`) removed from the component.
- Prop `onSelectCustomDeck` replaced by `onSelectByTopic`; `onOpenDecks` retained for "My Cards" action.
- **`src/App.css`** — added CSS for new classes:
  - `.splash-chooser-grid` — 3-col grid of choice cards
  - `.splash-choice-card`, `.splash-choice-icon`, `.splash-choice-title`, `.splash-choice-desc`, `.splash-choice-cta`
  - `.splash-back` — small back button used in exams/topics subviews
  - `.splash-topics-list` — 2-col scrollable grid
  - `.splash-topic-card`, `.splash-topic-name`, `.splash-topic-count`
- **Followups / TODOs:**
  - Wire `onSelectByTopic` in `App.jsx` — filter `examDeck` by `card.category === topic` and set a suitable `selectedExam` label (e.g. `"TOPIC:<topic>"`).
  - Optionally persist `preferredStudyMode` in `azfc_settings_<userId>` so returning users can skip the chooser.
  - Responsive: collapse `.splash-chooser-grid` to 1-col on narrow viewports.
  - **[TODO] Custom card inline edit — refresh on save:** After editing a custom card, the active flashcard deck in App.jsx is not refreshed. User must navigate away and back. Fix: `handleEditCardFromDeck` (or a new save handler) should re-run `handleCustomDeck` / update `deck` state in place so the card content updates immediately without leaving the study view.
  - **[TODO] Custom card inline edit — inline editor UI:** The current "Edit card" button opens the full `CustomDecks` modal/deck editor. Replace with a lightweight inline editor rendered directly below the flashcard (question, answer, ID fields + Save/Cancel buttons) so the user never leaves the study flow. The `CustomDecks` modal edit view can remain for bulk deck management.
  - **[TODO] Prev/Next nav buttons cause layout bounce:** The Previous and Next buttons shift position between cards because card height varies per content. Fix by giving the card container a stable min-height (e.g. locked to the tallest card in the session, or a CSS `min-height` on `.card-body-wrapper` / `.flashcard-scene`) so the nav buttons stay anchored and don't jump around as the user moves through the deck.
---

### May 14, 2026 - Three-option splash chooser
- Replaced single-exam splash with a 3-option chooser (views: `chooser` | `exams` | `topics`) in `src/ExamSelect.jsx`:
  - **Exam cards** - navigates to the existing exam-card grid; calls `onSelect(exam)` unchanged.
  - **My Cards** - opens the Custom Decks modal via `onOpenDecks`; no App.jsx changes required.
  - **By topic** - aggregates all card `category` values from `flashcards`, sorted by count; calls `onSelectByTopic(topic)` when wired, otherwise falls back to `onSelect('TOPIC:<topic>')`.
- Added a `← Back` button in the exams and topics subviews to return to the chooser.
- New CSS classes added to `App.css`: `.splash-chooser-grid`, `.splash-choice-card`, `.splash-choice-icon/title/desc/cta`, `.splash-back`, `.splash-topics-list`, `.splash-topic-card`, `.splash-topic-name/count`.
- Removed unused `useRef`/`useEffect`/`DECK_COLOURS` from `ExamSelect.jsx` (were leftover from the old custom-deck carousel).
- Followups:
  - Wire `onSelectByTopic` in `App.jsx` to filter `examDeck` by category across all exams.
  - Optionally persist `preferredStudyMode` in `azfc_settings_<userId>` to skip the chooser on return visits.

---

## App Improvement Ideas

### Quick wins (1–2 hours each)
- **Search bar** — find any card by keyword across all exams
- **Streak calendar** — visual heatmap of daily study activity
- **Card bookmarks** — save specific cards to a "revisit" list separate from flags
- **Sound effects** — subtle audio feedback on correct/incorrect answers

### Medium effort (half a day)
- **Daily goal** — set a target number of cards per day, progress ring in the header
- **Leaderboard** — anonymous ranking by cards studied / streak (requires Supabase)
- **Share a card** — generate a shareable link to a specific card
- **Print/export** — export a deck to PDF for offline study

### Test pipeline (backlog)
- **Vitest** as the test runner (native Vite/ES module support), **React Testing Library** for component tests
- Priority test targets: SRS logic (`spacedRepetition.js`), card filtering/free-tier gating, `cardLoader.js` with mocked Supabase
- GitHub Actions: add a `test` job that runs before the Azure deploy step so failing tests block deployment

### Bigger features
- **Developer admin panel (card management UI)** — developer-only panel (gated by `isDeveloper`) with a type-aware form for creating/editing individual cards and a bulk JSON import mode. Replaces the migration scripts now that local card data is stripped and Supabase is the sole source of truth.
- **AWS / GCP exam content** — unlock the coming soon platforms
- **Practice exam simulator** — timed mock exam with pass/fail scoring and review
- **AI-generated explanations** — "explain this answer" button powered by Claude API
- **Mobile app** — wrap the PWA or build React Native

### Monetisation / growth
- **Payment system** — integrate Paddle or LemonSqueezy (both act as Merchant of Record, handling UK/EU VAT automatically). Flow: user clicks Upgrade → hosted checkout → webhook sets `is_premium = true` via Supabase Admin SDK. Needs a small serverless function (Azure Functions or Supabase Edge Function) to receive the webhook.
- **Referral system** — share a link, both users get bonus cards unlocked
- **Team/org accounts** — company can bulk-assign premium to employees
- **Progress reports** — weekly email summary of SRS maturity and weak areas
