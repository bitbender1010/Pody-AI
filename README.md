# Pody AI / UniPods AI

A frontend prototype for the UNDP Hackathon Assistant, helping participants find information about the UniPods AI Innovation Programme. Programme content is currently hardcoded from supplied team materials and WhatsApp messages.

## Stack

- Next.js 15 with the App Router
- React 19 and TypeScript
- Tailwind CSS 3 and Lucide icons
- npm with a committed dependency lockfile

## Local Setup

Use Node.js 22 LTS and npm. No API keys or environment variables are required for the current frontend.

```sh
npm ci
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001).

Run only one development server for this project. If port 3001 is occupied, stop the existing project server before starting another. The explicit port flag keeps the preview on 3001; plain `npm run dev` uses Next.js's default port selection.

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution policy blocks `npm.ps1`.

## Pages and Current Behavior

| Route | Purpose |
| --- | --- |
| `/` | Chat welcome screen, composer, and three suggested questions |
| `/faq` | Expandable programme FAQs |
| `/support` | Programme support contacts |

The desktop sidebar scrolls as a whole and can be collapsed and reopened. Its collapsed state persists across client-side route navigation, but resets on reload. Mobile navigation uses a compact menu.

The attachment button opens a picker for images and PDFs. Selected files can be removed; images show previews. Other declared file types are rejected in the browser. Files stay in local component state and are not uploaded.

## Prototype Limitations

- Send and microphone buttons are not connected to handlers or a backend.
- Suggested questions fill and focus the message field for editing without sending. Hardcoded answers remain available as hover tooltips.
- Recent conversations, the profile name, and the greeting are static placeholders. There is no authentication or saved conversation history.
- Attachments are not processed, uploaded, or persisted. File-size limits and server-side content validation are not implemented.
- The English/French label is present, but automatic language detection and AI responses are not implemented.
- Programme dates, schedules, and contacts are static source material. Confirm them with programme organizers before treating them as current information.

## Project Structure

```text
app/           Routes, root layout, and global styles
components/    Shared navigation, composer, FAQ, and support UI
data/          Hardcoded questions, FAQs, recents, and contacts
lib/           Shared utilities
public/        Static assets, including the supplied UNDP logo
```

Edit `data/suggested-questions.ts`, `data/faqs.ts`, and `data/support.ts` to update programme information. Shared theme values live in `tailwind.config.ts`; global typography lives in `app/globals.css`.

## Build and Validation

Stop the development server before building: development and production builds share the `.next` output directory.

```sh
npm run build
npm run start -- --port 3001
```

The production build performs compilation and TypeScript checks. To check types independently after Next.js has generated its types:

```sh
npx tsc --noEmit
```

There is no committed automated test suite yet. The `lint` script exists, but ESLint configuration still needs to be completed; it is not currently a configured standalone validation gate.

For manual checks, visit all three routes, toggle the desktop sidebar using mouse and keyboard, open the mobile menu, and select/remove image and PDF attachments. Check that unsupported files show an error and the composer remains visible at standard desktop viewport sizes.

## Git Hygiene

`.gitignore` excludes dependencies, Next.js build output, TypeScript caches, local environment files, logs, test reports, and local layout screenshots. Environment templates such as `.env.example` remain eligible for version control.

Keep `package-lock.json`, source code, and required public assets versioned. Do not commit credentials or local `.env` files.
