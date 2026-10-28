# Rodrigo B. Alderite Jr. — Portfolio

My personal portfolio: a one-page website built with **React**, **TypeScript** and **Vite**.
It has a dark and a light theme, a typing animation, floating technology logos, a custom cursor,
my projects (TransitHub and LifeHub), a timeline and a contact form.

---

## 1. Run it on your computer

You need **Node.js 22 or newer** (20.19 also works). Check in a terminal:

```bash
node -v
```

If it prints nothing or a lower number, install the **LTS** version from <https://nodejs.org>.

Then:

1. Unzip the project and open the folder in **VS Code** (File → Open Folder…).
2. Open a terminal inside VS Code (Terminal → New Terminal).
3. Install the dependencies (only the first time, takes a minute):

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the address it prints, usually <http://localhost:5173>.
   Leave the terminal running. Every time you save a file, the page updates by itself.
   Press `Ctrl + C` in the terminal to stop it.

---

## 2. Where to edit things

| What you want to change                               | File                     |
| ----------------------------------------------------- | ------------------------ |
| Name, headline, typing roles, email, GitHub, LinkedIn | `src/config/site.ts`     |
| Resume, photo, availability badge, location, form     | `src/config/site.ts`     |
| Projects (text, team, links, screenshots, checklists) | `src/data/projects.ts`   |
| Skills and where you use each one                     | `src/data/skills.ts`     |
| Timeline (school, projects, dates, next goal)         | `src/data/experience.ts` |
| About section text                                    | `src/data/about.ts`      |
| Logos floating around the hero                        | `src/data/navigation.ts` |
| Every technology logo and its colors                  | `src/data/tech.ts`       |
| Browser tab title and link-preview text               | `index.html`             |
| Colors of both themes                                 | `src/styles/tokens.css`  |

**Rule of thumb:** anything set to `null` is a placeholder. On the page it shows as a dashed
yellow box with a pencil icon. Replace `null` with your real value (keep the quotes) and save.

```ts
// before
email: null,
// after
email: 'rodrigo@example.com',
```

---

## 3. Placeholders still to fill in

| Placeholder                       | Where                                               |
| --------------------------------- | --------------------------------------------------- |
| Email                             | `email` in `src/config/site.ts`                     |
| GitHub profile                    | `socials.github` in `src/config/site.ts`            |
| LinkedIn profile                  | `socials.linkedin` in `src/config/site.ts`          |
| Resume link                       | `resumeUrl` in `src/config/site.ts` (see below)     |
| Profile photo                     | `profileImage` in `src/config/site.ts` (see below)  |
| Availability badge                | `availability` in `src/config/site.ts`              |
| Year level                        | `yearLevel` in `src/config/site.ts`                 |
| Location (optional, hidden now)   | `location` in `src/config/site.ts`                  |
| Timeline dates and next goal      | `start`, `end`, `title` in `src/data/experience.ts` |
| Repository and live demo links    | `links` of each project in `src/data/projects.ts`   |
| Project screenshots               | `image` of each project in `src/data/projects.ts`   |
| SafeTrack, Lost and Found details | their entries in `src/data/projects.ts` (drafts)    |

### Add your photo

1. Create the folder `public/images` and put your photo there, for example `profile.jpg`
   (a portrait about 800 × 1000 pixels works best).
2. In `src/config/site.ts`:

   ```ts
   profileImage: { src: './images/profile.jpg', alt: 'Portrait of Rodrigo B. Alderite Jr.' },
   ```

### Add your resume

Put the PDF in `public/` (for example `public/resume.pdf`), then set `resumeUrl: './resume.pdf'`.

### Add project screenshots

Put them in `public/images/projects/` (16:10 images such as 1280 × 800 look best), then in
`src/data/projects.ts`:

```ts
image: { src: './images/projects/transithub.png', alt: 'TransitHub route map of Batangas City' },
```

Until then, each card shows a drawn illustration with a "Screenshot coming soon" tag.

### Update LifeHub's progress

In `src/data/projects.ts`, move items from the **Planned next** list into **Working so far**.

---

## 4. The contact form

The form checks every field and never pretends a message was sent. How it delivers depends on
`src/config/site.ts`:

- **Only `email` is set:** the button says "Continue in email app". It opens the visitor's own
  email app with the message filled in, and they press Send there.
- **`contactFormEndpoint` is set:** messages go straight to your inbox through a form service.
  The free plan of [Formspree](https://formspree.io) works with no code changes:
  1. Sign up and create a new form.
  2. Copy its endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
  3. Paste it: `contactFormEndpoint: 'https://formspree.io/f/abcdwxyz',`
- **Neither is set (right now):** the form says it isn't connected yet.

The sending code lives in `src/lib/contact.ts` if you want to use another service.

---

## 5. Commands

| Command             | What it does                                                   |
| ------------------- | -------------------------------------------------------------- |
| `npm run dev`       | Starts the site at http://localhost:5173 while you work on it  |
| `npm run build`     | Checks the TypeScript, then builds the final site into `dist/` |
| `npm run preview`   | Shows the built `dist/` site, to test it before publishing     |
| `npm run typecheck` | Only checks the TypeScript for mistakes                        |
| `npm run lint`      | Looks for common bugs with oxlint                              |
| `npm run format`    | Tidies the formatting of every file with Prettier              |
| `npm run check`     | Lint + build in one go, a good habit before publishing         |

---

## 6. Put it online

Run `npm run build`. The finished website is the `dist/` folder. Some free options:

- **Netlify:** go to <https://app.netlify.com/drop> and drag the `dist` folder onto the page.
- **Vercel:** import your GitHub repository at <https://vercel.com/new>; it detects Vite by itself.
- **GitHub Pages:** works too; the site uses relative paths, so it runs from a sub-folder like
  `https://your-username.github.io/portfolio/`.

After it's online, open `index.html` and change `content="/og-image.png"` to the full address,
for example `content="https://your-site.com/og-image.png"`, so link previews show the image.

---

## 7. How it's built

```
src/
  config/site.ts     ← your details (start here)
  data/              ← projects, skills, timeline, about text, logos
  components/
    layout/          ← navbar, theme toggle, custom cursor, footer
    hero/            ← hero, typing animation, floating logos
    sections/        ← About, Skills, Projects, Experience, Contact
    projects/        ← project cards and their illustrations
    contact/         ← contact form and contact links
    ui/              ← small reusable pieces (buttons, badges, cards…)
  hooks/             ← reusable React logic (theme, typing, scroll…)
  lib/               ← plain helpers (theme storage, form sending…)
  styles/            ← fonts, colors (tokens.css), base styles
public/              ← files copied as-is (favicon, link-preview image)
```

- **No CSS framework or animation library.** Plain CSS with design tokens (CSS variables) keeps
  both themes in one place, and the animations use CSS plus a few small hooks. That keeps the
  site fast and the code easy to follow.
- **Accessibility:** works with the keyboard (try Tab), has a "Skip to content" link, respects
  the "reduce motion" setting of your device, lets visitors pause the hero animation and turn off
  the custom cursor (footer). The custom cursor never shows on phones or tablets.
- **Theme:** the first visit follows the device's light/dark setting; after a click on the
  sun/moon button, the choice is remembered.

---

## Credits

- Fonts: [Inter](https://github.com/rsms/inter) and
  [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), SIL Open Font License 1.1
  (see `src/assets/fonts/`).
- Icons via [react-icons](https://react-icons.github.io/react-icons/): Lucide (ISC),
  Simple Icons (CC0), Font Awesome Free (CC BY 4.0) and Tabler (MIT). Technology logos are
  trademarks of their owners and are shown only to name the tools used.
