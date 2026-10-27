# TopWash Klaukkala

Website for TopWash, an automatic car wash at Klaukkalantie 74, 01800 Klaukkala.
The site is in Finnish and is a single page: services and payment methods,
opening hours, contact details with a map, and the company details in the
footer.

Owner: ATMD Oy (Y-tunnus 2470070-6).

Built with React 19, TypeScript and Vite, with the React Compiler enabled.

## Getting started

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

The dev server prints the local URL (by default http://localhost:5173).

## Scripts

| Script                 | What it does                                            |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | Start the dev server with hot reload                    |
| `npm run build`        | Type check and build the production site into `dist/`   |
| `npm run preview`      | Serve the built `dist/` locally                         |
| `npm test`             | Run the tests once                                      |
| `npm run test:watch`   | Re-run the tests on every change                        |
| `npm run lint`         | Lint with ESLint                                        |
| `npm run typecheck`    | Type check with `tsc`                                   |
| `npm run format`       | Format all files with Prettier                          |
| `npm run format:check` | Fail if any file is not formatted                       |
| `npm run check`        | Format check, lint, type check and tests, in that order |

Run `npm run check` before deploying.

## Project structure

```
index.html            Page shell: title, meta description, favicon links
public/               Static files served as-is
  favicon.ico, *.png  Favicons and app icons
  site.webmanifest    Home screen icon manifest
  imgs/               Logo and banner
src/
  App.tsx             The whole page, split into section components
  App.test.tsx        Tests
  index.css           Styles
  main.tsx            Entry point
  test/setup.ts       Shared test setup
```

## Editing content

Business details are constants at the top of `src/App.tsx`:

- `ADDRESS`, `PHONE`, `PHONE_HREF`, `EMAIL`, `FACEBOOK_URL`, `MAP_QUERY`:
  contact details and map location
- `COMPANY`, `BUSINESS_ID`: owner company and Y-tunnus shown in the footer
- `OPEN_HOUR`, `CLOSE_HOUR`: drive the "Avoinna nyt" / "Suljettu" badge
- `HOURS`: the opening hours list, Monday first. Add a `note` to a day for
  holidays (for example `note: 'Pyhäinpäivä'`)
- `PAYMENTS`: the payment method cards

The tests check several of these values, so update `src/App.test.tsx` when you
change them.

## Tests

Tests use Vitest and React Testing Library in a simulated browser (jsdom). They
cover the open/closed badge at the opening-hour boundaries, today's highlight in
the hours list, the mobile menu, the contact links and the footer. Tests that
depend on the time fix the clock, so they give the same result on any day.

## Favicons

The icons in `public/` were generated from `public/imgs/topwash-logo.jpg`. The
small sizes (16, 32 and 48 px) use only the arch and car, because the "TOP WASH"
text is unreadable at that size. The 180, 192 and 512 px icons use the full
logo. If the logo changes, regenerate all of them.
