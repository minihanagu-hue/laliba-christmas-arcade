# Pixel UI verification — 2026-11-16

## Scope and files

- `index.html`: shared class and color attributes on existing native controls; stylesheet link. IDs, labels and event wiring preserved. Existing circular arcade controller retains its dedicated styling.
- `pixel-button.css`: shared CSS fallback, five palettes, default/hover/pressed/disabled/focus states, 44px minimum height, responsive spacing, reduced-motion rule, opt-in transparent PNG nine-slice mapping.
- `public/assets/ui/buttons/README.md`: 20 expected filenames and replacement instructions. No PNG button assets have been supplied or invented.
- `tests/pixel-buttons.html`: standalone state preview, with no game data access.
- `tests/pixel-ui-results.md`: this record.
- `downloads/NEON-BLOCKS.html`: regenerated self-contained offline version.
- Local build helper `work/rebuild-offline-current.py`: added the shared stylesheet to its inline list (outside the published project).

## Verification

- Browser computed styles: all five palettes render; default has raised inset bevel; each pressed sample translates down 3px; all five disabled samples are native disabled buttons and use grayscale(1) brightness(.7).
- Hover: clicked and inspected each color's default sample; all five matched :hover and displayed the pixel-glint background. Pressed rule follows hover so pressed feedback takes priority.
- Native gameMode select becomes disabled during gameplay and receives the grey disabled skin.
- Keyboard P pauses/resumes; R resets a nonzero score (36) to zero. Native select/input behavior stays intact; no key-handler changes.
- Pointer workflow at mobile width: start, hard drop, pause and finish functioned. Existing controller pointer/repeat/multitouch tests passed. Physical iOS/Android touch and OS callouts were not tested on a real device in this run.
- Finished game: 36 points appeared on the podium and persisted as personal best after browser reload.
- Leaderboard opens/closes; history tab and rank tab switch; switching classic to 60-second leaderboard correctly shows zero completed timed games, then classic restores existing results.
- Layout: inspected 390x844, 768x1024 and default 1280x720. document scrollWidth <= innerWidth in all three. Primary actions have >=44px height. Mobile circular controller remains present.
- Visible keyboard focus checked in the game UI. CSS prefers-reduced-motion explicitly removes transitions; no motion emulator or real device accessibility setting was used.
- Browser warning/error log for final desktop preview: empty.
- Core source byte comparisons against GitHub main before publication: game.js, records.js, challenge.js, controls.js, portraits.js all unchanged. No storage keys or formats changed.
- Existing test suites: challenge.test.cjs, controls.test.cjs, portraits.test.cjs, camera.test.cjs all PASS.
- PNG rendering cannot be validated until assets are supplied. PNG mode remains opt-in, so production requests no absent button PNGs.

Run the existing suites with Node. Open tests/pixel-buttons.html to inspect the state samples.
