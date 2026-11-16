# User-supplied game music

Files copied unchanged from the user's audio_segments folder. Filenames describe BGM/SFX/clip type and source positions, not musical mood. This initial assignment is by file type, sequence and segment length; no musical genre identification is claimed.

| Scene | File | Approx duration |
|---|---|---|
| Market menu | bgm_01_0s.mp3 | 39s |
| Classic | bgm_03_50s.mp3 | 68s |
| 60-second challenge | bgm_06_152s.mp3 | 27s |
| 180-second challenge | bgm_09_234s.mp3 | 19s |
| 300-second challenge | bgm_10_253s.mp3 | 19s |
| Final 15 seconds | bgm_11_273s.mp3 | 15s |
| Records and results | bgm_12_292s.mp3 | 22s |

BGM loops via one audio element; raw excerpts may have audible loop boundaries. Existing synthesized effects remain intact. SFX and unclassified clip files have not been copied into the public game or assigned without clearer context.

Sound is OFF by default, enabled through the existing sound button. BGM follows the master volume at 50% amplitude to leave room for effects, and has its own checkbox. Playback pauses while the game is paused or the page is hidden; opening records uses the records track. Files load on demand. Playback errors are displayed without blocking the game. The standalone download embeds all seven MP3s. music.js observes existing UI state and does not modify game logic or stored data.
