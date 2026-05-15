# AzureAce — New Machine Setup Instructions

> Follow these steps on the new laptop to get the development environment up and running from scratch.

---

## 1. Prerequisites

Install the following tools before cloning or copying the project.

### Node.js (required)
- Download and install **Node.js LTS** from [https://nodejs.org](https://nodejs.org)
- This also installs **npm** automatically
- Minimum recommended version: **Node 18+**
- Verify after install:
  ```powershell
  node -v
  npm -v
  ```

### Git (recommended)
- Download from [https://git-scm.com](https://git-scm.com)
- Needed if you're cloning from a remote repo or using version control
- Verify:
  ```powershell
  git --version
  ```

### Visual Studio Code (recommended editor)
- Download from [https://code.visualstudio.com](https://code.visualstudio.com)

#### Recommended VS Code Extensions
| Extension | ID |
|---|---|
| ESLint | `dbaeumer.vscode-eslint` |
| Prettier | `esbenp.prettier-vscode` |
| Git Lens | `eamodio.gitlens` |

---

## 2. Transfer the Project

### Option A — Copy from old laptop
Copy the entire `azureace` folder to the new machine. Suggested destination:

```
C:\Devops Projects\azureace\
```

> ⚠️ **Do NOT copy the `node_modules` folder** — it is large and will be regenerated. If it was included in the copy, delete it before continuing.

### Option B — Clone from Git remote
If the project is hosted on GitHub/Azure DevOps:

```powershell
git clone <your-repo-url> "C:\Devops Projects\azureace"
```

---

## 3. Install Dependencies

Open a terminal (PowerShell) and navigate to the app folder:

```powershell
cd "C:\Devops Projects\azureace\azureace-app"
```

Install all npm packages:

```powershell
npm install
```

This reads `package.json` and installs everything into a new `node_modules` folder. It should complete in under a minute.

---

## 4. Run the Development Server

```powershell
npm run dev
```

Vite will start the local dev server. You'll see output like:

```
  VITE v8.x.x  ready in Xms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open **http://localhost:5173** in your browser.

---

## 5. Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Build optimised production output to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## 6. Project Structure Overview

```
azureace/
└── azureace-app/          ← React app root
    ├── src/
    │   ├── App.jsx        ← Main application shell
    │   ├── App.css        ← Global component styles
    │   ├── ExamSelect.jsx ← Splash / chooser / exam select screens
    │   ├── Flashcard.jsx  ← Flashcard component
    │   ├── Flashcard.css
    │   ├── CustomDecks.jsx← Custom deck management modal
    │   ├── flashcards.js  ← Flashcard data + EXAM_META registry
    │   ├── data/          ← Per-exam question data (AZ-900, AZ-104…)
    │   └── auth/          ← Auth context, login, user profile
    ├── public/
    │   └── favicon.svg
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 7. Local Data & Storage

- **Custom decks** are stored in the browser's `localStorage` under the key `customDecks`. They are not persisted to a server or file — they exist per browser profile on the machine.
- **SRS (Spaced Repetition) progress** is also stored in `localStorage`.
- If you want to carry over custom decks from the old machine, export them from DevTools → Application → Local Storage on the old machine and import them on the new one.

---

## 8. Environment & Config Notes

- No `.env` files are required for basic local development.
- If auth features (Azure AD / MSAL) are configured, you may need to set up environment variables. Check `src/auth/` for any references to `import.meta.env.VITE_*` variables and create a `.env.local` file accordingly:
  ```
  VITE_CLIENT_ID=your-azure-app-client-id
  VITE_TENANT_ID=your-azure-tenant-id
  ```
- `.env.local` is gitignored by default and must be created manually on each machine.

---

## 9. Troubleshooting

| Problem | Fix |
|---|---|
| `npm install` fails | Make sure Node 18+ is installed. Try `npm cache clean --force` then retry. |
| Port 5173 already in use | Run `npm run dev -- --port 3000` to use a different port |
| Blank page in browser | Check browser console for errors; make sure you ran `npm install` first |
| `node_modules` missing errors | Run `npm install` from inside `azureace-app/` |
| Git not tracking changes | Run `git init` inside `azureace-app/` if not already a repo |

---

## 10. Recommended Dev Workflow

1. Open VS Code: `code "C:\Devops Projects\azureace"`
2. Open the integrated terminal (`Ctrl + \``)
3. `cd azureace-app && npm run dev`
4. Open http://localhost:5173 in browser
5. Edit source files — changes hot-reload instantly

---

*Last updated: May 2026*
