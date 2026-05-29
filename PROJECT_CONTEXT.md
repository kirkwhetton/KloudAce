# KloudAce — Project Context & Handoff Document

_Last updated: May 28, 2026_

---

## References for Questions

### AZ-104 Microsoft Azure Administrator Associate
| Topic | URL |
|-------|-----|
| Identity & Governance | https://learn.microsoft.com/en-us/training/paths/az-104-manage-identities-governance/ |
| Virtual Networks | https://learn.microsoft.com/en-us/training/paths/az-104-manage-virtual-networks/ |
| Storage | https://learn.microsoft.com/en-us/training/paths/az-104-manage-storage/ |
| Compute | https://learn.microsoft.com/en-us/training/paths/az-104-manage-compute-resources/ |
| Monitoring & Backup | https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/ |
---

### AZ-900 Microsoft Azure Fundamentals
| Topic | URL |
|-------|-----|
| Describe Cloud Concepts | https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/ |
| Describe Azure Architecture & Services | https://learn.microsoft.com/en-us/training/paths/azure-fundamentals-describe-azure-architecture-services/ |
| Describe Azure Management & Governance | https://learn.microsoft.com/en-us/training/paths/describe-azure-management-governance/ |
---

### AZ-700 Microsoft Azure Network Engineer Associate
| Topic | URL |
|-------|-----|
| Core Networking Infrastructure | https://learn.microsoft.com/en-us/training/modules/introduction-to-azure-virtual-networks/ |
| Hybrid Connectivity | https://learn.microsoft.com/en-us/training/modules/design-implement-hybrid-networking/ |
| Application Delivery Services | https://learn.microsoft.com/en-us/training/modules/load-balancing-https-traffic-azure/ https://learn.microsoft.com/en-us/training/modules/load-balancing-non-https-traffic-azure/ |
| Private Access | https://learn.microsoft.com/en-us/training/modules/design-implement-private-access-to-azure-services/ |
| Security & Monitoring | https://learn.microsoft.com/en-us/training/modules/design-implement-network-security-monitoring/ |
---

### AZ-305 Microsoft Azure Solutions Architect Expert
| Topic | URL |
|-------|-----|
| Design Identity, Governance and Monitoring Solutions | https://learn.microsoft.com/en-us/training/paths/design-identity-governance-monitor-solutions/ |
| Design Business Continuity Solutions | https://learn.microsoft.com/en-us/training/paths/design-business-continuity-solutions/ |
| Design Data Storage Solutions | https://learn.microsoft.com/en-us/training/paths/design-data-storage-solutions/ |
| Design Infrastructure Solutions | https://learn.microsoft.com/en-us/training/paths/design-infranstructure-solutions/ |
---

## What is this?

**KloudAce** is a React + Vite Azure certification flashcard/MCQ web app. Cards are stored in Supabase and loaded at runtime — there is no bundled card data.

Run locally with:
```pwsh
cd "/Users/kirkwhetton/Documents/AzureAce"
npm run dev
```

---

## Current Feature State

### ✅ Done

**Core**
- React + Vite project scaffold
- Supabase backend — cards stored as `{ id, exam, category, type, difficulty, is_free, data }` rows; loaded via `cardLoader.js`
- Auth system — `useAuth.js` backed by Supabase (`is_premium`, `is_developer` flags); `AuthProvider.jsx`, `Login.jsx`
- Per-user localStorage — flags, known, mastered, SRS data, settings all keyed by `azfc_*_<userId>`
- Session flow — Login → ExamSelect splash (3-option chooser) → study deck; `← Exams` returns to splash
- Free-tier gating — `is_free` flag on cards; premium lock shown in sidebar

**Card Types**
- **Flashcard** — 3D CSS flip card with hover lift, difficulty badge flips with card, `hideAnswers` blocks flip
- **MCQ** — Fisher-Yates shuffled choices, correct/wrong highlighting, explanation box
- **Multi-select** — multiple correct answers, per-choice feedback
- **True / False** — binary answer with explanation
- **Image MCQ** — diagram + question footer + MCQ choices
- **Hotspot** — clickable diagram regions with card-box styling and card ID badge
- **Task Simulator** — fill-in, order, and match sub-types; SRS-aware, exam-mode-aware, `hideAnswers` compatible
- **Script Simulator** — interactive terminal (bash/PowerShell), `--help`/`Get-Help` system, token-set grading, model answer reveal

**Study Features**
- Multi-select category filter — pill toggle; "All" / "🚩 Flagged" virtual categories
- Card type filter — sidebar chips for all types
- Difficulty filter — Easy / Medium / Hard / Extreme toggles
- Flagging — 🚩 flag button per card; flagged-only sidebar toggle; keyboard shortcut F
- Mastering — ⭐ mark as mastered to remove from active deck; keyboard shortcut M
- Randomise — Fisher-Yates shuffle toggle; persists per user via `azfc_settings_*`
- Default card types — per-user setting to disable unwanted types by default each session
- Spaced Repetition (SM-2) — full implementation; interval-based Learning/Mature thresholds (21-day); SRS dot footer on cards
- Exam Mode — 60-minute timed mock exam; silent answering; timer banner with warning state; full results screen
- Prev/Next navigation — card-nav buttons + ← → arrow keys
- Progress bar — known count, flagged count, percentage; animated shimmer fill
- Search bar — keyword search across all exams on chooser screen

**Profile & Settings**
- User Profile modal — Profile / Password / Stats / Settings tabs; scrollable with `max-height`
- Hide answers toggle — blocks feedback colour and explanation reveal
- Hide difficulty badges toggle
- Random card order toggle — persists as default across sessions
- Sound effects toggle
- Daily goal — target cards per day; ring progress indicator below progress bar
- Streak tracking — daily study streak with calendar heatmap in Stats tab; streak pill below progress bar
- Theme switcher — Light, Dark, Protanopia, Deuteranopia, Tritanopia
- Settings tab icons updated to match site-wide SVG stroke style

**Dashboard & Stats**
- Readiness Dashboard — SRS maturity, mastered counts, overall readiness score per exam and category
- Per-exam SRS breakdown — expand/collapse categories; granular clear per exam or category
- Streak calendar — 15-week activity heatmap

**Developer Tools**
- DevTools panel — floating dropdown (developer-only, `isDeveloper` flag); recently-added toggle, Card Manager shortcut
- Card Manager (admin panel) — bulk import + single card creation for all card types; gated by `isDeveloper`
- "Recently added" filter — shows cards added in last 25 hours; uses `created_at` from Supabase as fallback

**UX & Polish**
- Guided tour — spotlight-style walkthrough, 9 steps; welcome card with mission statement, exam badges, feature list; auto-shown once per user
- Deck enter/exit transitions — symmetrical slide animations; sidebar hidden during transition to prevent flash
- Header + content entrance animations on page load
- 3-option ExamSelect chooser — Exam cards / My Cards / By topic
- ExamSelect card counts fetched on mount from Supabase (no stale bundled counts)
- Confirm dialogs — styled in-app modal replaces all `window.confirm` calls

**Infrastructure**
- Vitest + React Testing Library test suite
- GitHub Actions CI — test job gates deployment; Azure Static Web Apps deploy on pass

---

### 🔴 v1 Blockers

**Monetisation**
- **Payment system** — Paddle or LemonSqueezy (Merchant of Record, handles VAT). Flow: user clicks Upgrade → hosted checkout → webhook sets `is_premium = true` via Supabase Admin SDK. Needs a small serverless function (Azure Functions or Supabase Edge Function). Consider free beta launch first, then add payments as v1.1.

**Content**
- **AZ-700 content expansion** — currently 49 cards; needs to reach AZ-900/AZ-104 depth before the exam is credibly listed as supported
- **AZ-305 content expansion** — currently 10 cards; same issue

**Launch infrastructure**
- **Landing / marketing page** ✅ Done
- **Terms of Service & Privacy Policy** — required before any paid product goes live, especially for UK/EU users (GDPR)

---

### 🟡 Before public launch (not beta blockers)

- **React Router v6** — URL-based routing so pages are bookmarkable, shareable, and SEO-indexable. Key routes: `/landing`, `/azure`, `/aws`, `/gcp`, `/azure/:exam`, `/azure/:exam/games`. Also requires `staticwebapp.config.json` at the repo root so Azure SWA serves `index.html` for all client-side paths. Skipped for beta — add before going fully public.

---

### 🔲 Pending / To Do

**Splash / Navigation**
- Persist `preferredStudyMode` in `azfc_settings_<userId>` to skip the chooser on return visits
- Responsive: collapse `.splash-chooser-grid` to 1-col on narrow viewports

**Custom Cards**
- Custom card inline edit — refresh deck state on save without navigating away
- Custom card inline editor UI — lightweight editor below the card instead of opening the full modal

**Study UX**
- Prev/Next nav layout bounce — card height varies per card; give `.card-body-wrapper` a stable `min-height` so nav buttons don't shift

---

## Content Standards

### Card difficulty guidelines (AZ-700 and all professional-level exams)
AZ-700 is a configuration and engineering exam — difficulty levels should reflect operational depth, not just awareness:

| Difficulty | Focus |
|---|---|
| **Easy** | Definitions, T/F concept checks, "what is X" flashcards |
| **Medium** | Scenario → which option/command/step to use; "given X requirement, what do you configure?" |
| **Hard** | Step-by-step configuration with specific CLI/PowerShell commands; troubleshooting a broken configuration |
| **Extreme** | End-to-end multi-component setup; fault-finding in real CLI code; complex interacting systems with dependencies |

**Known tech debt:** The AZ-700 match tasks at medium difficulty added during the initial NAT Gateway / Bastion / DNS Resolver / BGP batches (IDs 139, 144, 149, 154) are "what is this term" definitions rather than configuration-focused — they should be replaced with scenario-based config questions or downgraded to easy.

---

## App Improvement Ideas

### Pending
- **Card bookmarks** — save specific cards to a "revisit" list separate from flags
- **Leaderboard** — anonymous ranking by cards studied / streak (requires Supabase query)
- **Share a card** — generate a shareable link to a specific card
- **Print/export** — export a deck to PDF for offline study
- **AWS / GCP exam content** — unlock coming soon platforms
- **AI-generated explanations** — "explain this answer" button powered by Claude API
- **Mobile app** — wrap the PWA or build React Native
- **Achievement badges** — milestones for streaks, perfect scores, mastering categories
- **Daily challenge** — one new question per day with leaderboard

### Monetisation / Growth
- **Payment system** — see v1 Blockers above
- **Referral system** — share a link, both users get bonus cards unlocked
- **Team/org accounts** — company bulk-assigns premium to employees
- **Progress reports** — weekly email summary of SRS maturity and weak areas

---

## File Structure

```
KloudAce/
  index.html
  package.json
  vite.config.js
  scripts/                    # One-off migration/seed scripts
  public/
    favicon.svg
  src/
    main.jsx                  # Wraps App in AuthProvider
    App.jsx                   # Main app logic + all state
    App.css                   # All styles
    ExamSelect.jsx             # Post-login 3-option chooser splash
    GuidedTour.jsx / .css      # Spotlight-style onboarding tour
    DevTools.jsx / .css        # Developer-only floating panel
    Flashcard.jsx / .css
    multichoice.jsx / .css
    MultiSelect.jsx / .css
    TrueFalse.jsx / .css
    ImageMCQ.jsx / .css
    hotspot.jsx / .css
    TaskSimulator.jsx / .css   # fill-in, order, match, script sub-types
    cardLoader.js              # Supabase fetch helpers
    flashcards.js              # Aggregator (bundled fallback + EXAM_META)
    spacedRepetition.js        # SM-2 algorithm
    useStreak.js               # Daily streak hook
    useDailyGoal.js            # Daily goal hook
    useTheme.js                # Theme hook
    ConfirmDialog.jsx / .css
    auth/
      useAuth.js               # Supabase auth hook
      AuthProvider.jsx
      Login.jsx / .css
      UserProfile.jsx / .css
    data/
      AZ-104/                  # Local fallback cards (mostly migrated to Supabase)
      AZ-700/
      AZ-900/
      AZ-305/
```

---

## Key Data Shapes

### Card object (Supabase row)
```js
{
  id: string,           // e.g. "AZ-104-177", "AZ-104-179"
  exam: string,         // "AZ-104" | "AZ-700" | "AZ-900" | "AZ-305"
  category: string,     // e.g. "Compute", "Networking"
  type: string,         // "flashcard" | "mcq" | "multi" | "truefalse" | "image-mcq" | "hotspot" | "task" | "script" | "fault" | "case-study"
  difficulty: string,   // "easy" | "medium" | "hard" | "extreme"
  is_free: boolean,
  created_at: string,   // ISO timestamp — used by "recently added" filter
  data: {               // All card-type-specific fields live here
    question: string,
    explanation?: string,
    learnUrl?: string,
    // MCQ / multi:
    choices?: string[],
    correctAnswer?: string | string[],
    // Task:
    taskType?: "fill-in" | "order" | "match",
    blanks?: [{ label, answer, hint? }],
    steps?: string[],
    pairs?: [{ left, right }],
    // Script:
    shell?: "bash" | "powershell",
    requiredTokens?: string[],
    helpText?: string,
    modelAnswer?: string,
  }
}
```

### localStorage keys
| Key | Contents |
|-----|----------|
| `azfc_session` | `{ id, name, email }` — current session |
| `azfc_flagged_<userId>` | `string[]` — flagged card IDs |
| `azfc_known_<userId>` | `string[]` — known card IDs (session) |
| `azfc_mastered_<userId>` | `string[]` — mastered card IDs (persisted) |
| `azfc_srs_<userId>_<exam>` | `{ [cardId]: SrsRecord }` — SM-2 data per exam |
| `azfc_settings_<userId>` | `{ hideAnswers, hideDifficulty, soundEnabled, randomised, showDevRecent, defaultDisabledTypes[], theme }` |
| `azfc_streak_<userId>` | `{ streak, lastDate, longestStreak, activeDates[] }` |
| `azfc_goal_<userId>` | `{ goal, count, date }` — daily goal progress |
| `azfc_tour_seen_<userId>` | `"1"` — guided tour already shown |

---

## Entra ID Migration Path

`useAuth.js` is designed as a **drop-in replacement target**.
To migrate to MSAL:
1. `npm install @azure/msal-browser @azure/msal-react`
2. Replace the body of `useAuth.js` with MSAL calls
3. No other files need to change — the hook always returns the same shape

---

## Known Issues / Gotchas
- `handleExam` must be defined **before** the auth/splash gates in App.jsx (const is not hoisted)
- `shuffledChoices` in MCQ uses `useMemo([card.id])` — do not change dep array or choices will re-shuffle on every render
- `sessionKey` in card component keys (`${sessionKey}-${card.id}`) forces full remount on restart — required to reset MCQ state
- Supabase `merge-duplicates` upsert does **not** update `created_at` — patch `devAdded` in the `data` JSONB instead when re-seeding a card
- `.env.local` contains `SUPABASE_SERVICE_KEY` — must never be committed (already in `.gitignore`)

---

## AZ-700 Content Backlog

Cards needed to bring AZ-700 to AZ-900/AZ-104 depth (~100 more cards required). Each item below needs ~3 cards across mixed types and difficulties.

### 🔲 Core Networking Infrastructure

- [x] **Azure NAT Gateway** — outbound SNAT, SNAT port exhaustion, when to use NAT Gateway vs Load Balancer outbound rules vs instance-level public IPs (AZ-700-135 to 139)
- [x] **Azure Bastion** — secure RDP/SSH without public IPs, Basic vs Standard vs Developer vs Premium tiers, subnet requirements (AZ-700-140 to 144)
- [x] **Azure DNS Private Resolver** — inbound/outbound endpoints, forwarding rulesets, solving on-premises private endpoint resolution (AZ-700-145 to 149)

### 🔲 Hybrid Connectivity

- [x] **BGP route filtering** — route filters on ExpressRoute Microsoft peering, BGP communities for traffic engineering (AZ-700-150 to 154)
- [x] **ExpressRoute Global Reach** — circuit-to-circuit connectivity, Premium requirement, /29 interconnect range, BGP path selection, CLI configuration (AZ-700-157 to 161)

### 🔲 Application Delivery Services

- [ ] **Application Gateway advanced features** — URL path-based routing, multi-site hosting, cookie-based session affinity, SSL termination and end-to-end SSL, rewrite rules
- [ ] **Cross-region Load Balancer** — global Layer 4 load balancing across regions, how it differs from Traffic Manager and Front Door

### 🔲 Security & Monitoring

- [x] **Web Application Firewall (WAF)** — WAF policy, Detection vs Prevention mode, OWASP CRS, custom rules (geo/IP/rate), exclusions, App Gateway vs Front Door policy types, SKU requirement (AZ-700-162 to 169)
- [x] **Azure DDoS Protection** — three tiers, adaptive tuning, 'Under DDoS Attack' metric, VNet association via plan, CLI fault (missing --ddos-protection-plan) (AZ-700-170 to 174)
- [x] **Azure Firewall Policy** — rule collection groups, DNAT→Network→App processing order, parent-child inheritance, DNS proxy required for FQDN in Network rules (AZ-700-175 to 179)
- [x] **Connection Monitor** — test groups, agent requirement, ChecksFailedPercent/RoundTripTimeMs thresholds, region co-location requirement, fault (wrong region) (AZ-700-180 to 184)
