# Pody Bot / UniPods AI

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

## Progressive Web App (PWA) & Installation

Pody Bot is configured as an installable web app across desktop and mobile browsers.

### Installation Features

- **Web App Manifest**: Configured in `app/manifest.ts` with standalone display mode, `#FCFCFB` theme and background colors, root start URL and scope, and 192x192 / 512x512 app icons.
- **App Icons**: 192px and 512px square icons (`public/icons/icon-192.png`, `public/icons/icon-512.png`) and an Apple touch icon (`public/icons/apple-touch-icon.png`) with proportional logo spacing.
- **Shared State & First-Visit Invitation**: On the first eligible visit in a browser where installation is available (or iOS guidance applies), a compact "Install Pody Bot" modal invitation appears. Dismissing the modal ("Not now") persists in `localStorage` (`pody-install-invitation-seen-v1`) so visitors are not repeatedly prompted.
- **Navigation Install Action**: "Install Pody Bot" button is integrated in the desktop sidebar and full-screen mobile menu between primary navigation and Recent Chats. The button is automatically hidden when running in standalone mode or after installation.
- **Cross-Browser Guidance**:
  - **Chromium / Edge / Android**: Captures `beforeinstallprompt` and triggers native install dialog on click.
  - **iOS / Safari (iPhone/iPad)**: Detects iOS and presents step-by-step guidance (*"Open your browser's Share menu, choose Add to Home Screen, then tap Add"*).
  - **Other Browsers (Firefox / Desktop Safari)**: Displays browser-menu guidance without claiming installation completed.
- **Programmatic Trigger**: `usePwaInstall().requestInstallInvitation()` is exposed globally for future post-registration onboarding flows.

## Offline Support & Service Worker

- **Production Service Worker**: Registered in production builds (`public/sw.js`). In development (`NODE_ENV !== "production"`), the service worker is disabled to avoid stale caching during active code editing.
- **Branded Offline Fallback**: Caches `/offline.html`, `/offline.css`, `/offline.js`, and `/icons/icon-192.png`. When network navigation fails, the offline page displays a branded message and a "Retry" button.
- **Navigation-Only Fallback**: Navigations use the network first and fall back to the cached offline page when disconnected.
- **Data Safety**: Service worker explicitly does **not** cache chat messages, attachments, API requests, or authentication responses.
- **Cache Lifecycle & Updates**: Caches are versioned (`pody-offline-v1`). Outdated cache versions are purged upon service worker activation. Next.js serves `sw.js` with `Cache-Control: no-cache, no-store, must-revalidate`.

## HTTPS Requirements & Localhost Testing

- Progressive Web App features and Service Workers require a secure origin (**HTTPS**) in production.
- **Localhost Exception**: Browsers treat `http://localhost` and `http://127.0.0.1` as secure contexts, enabling full testing locally without SSL certificates.
- **Testing Service Worker Locally**:
  ```sh
  npm run build
  npm run start -- --port 3001
  ```
  Open `http://localhost:3001` to test the production service worker, offline fallback (via DevTools Network Throttling -> Offline), and PWA installation prompts.
- **Development Precautions**: During local development (`npm run dev`), the service worker is not registered. If you previously tested a production build on localhost, unregister the service worker in Chrome DevTools (*Application* -> *Service Workers* -> *Unregister*) or use an Incognito window to avoid unexpected caching.

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

For manual checks, visit all three routes, toggle the desktop sidebar using mouse and keyboard, open the mobile menu, test the installation invitation and sidebar button, verify the offline page in production mode, and select/remove image and PDF attachments.

## Git Hygiene

`.gitignore` excludes dependencies, Next.js build output, TypeScript caches, local environment files, logs, test reports, and local layout screenshots. Environment templates such as `.env.example` remain eligible for version control.

Keep `package-lock.json`, source code, and required public assets versioned. Do not commit credentials or local `.env` files.

