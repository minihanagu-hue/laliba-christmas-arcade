# Four original pixel scenes

| Levels | Scene | Design |
|---|---|---|
| 1–3 | 雪夜市集 / snow-market | Indigo sky, snowy mountains, decorated fir trees and a cabin |
| 4–6 | 暖光部落 / lantern-village | Berry-colored sky, lanterns and warmly lit market huts |
| 7–9 | 極光雪林 / aurora-forest | Teal and lavender aurora bands over layered evergreen trees |
| 10+ | 星空慶典 / star-festival | Plum sky with static pixel fireworks and golden festive accents |

Original SVG geometry with crispEdges, 720×420 viewBox. No externally sourced art, fonts, cultural emblems or animations. Scenes only replace the existing .arcade background; the central black board and game logic are preserved. DOM observation of #level triggers scene changes, including returning to scene 1 after restart. No score or player-data writes. No flash or motion is introduced at level-up.

scenes.html offers a static comparison gallery; illustrative scores are not real player records. Desktop uses centered cover; mobile uses left-bottom positioning to keep decorations visible in the narrow layout. Offline HTML embeds the SVGs.

Validation: tests/scenes.test.cjs covers all boundaries (1/3/4/6/7/9/10/99), restart and invalid-level fallback. Browser preview checks SVG loading, readability and responsive layout. Level transitions are covered by the automated observer test rather than claiming a full level-10 playthrough.
