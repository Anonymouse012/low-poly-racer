# Low Poly Racer

A low poly racing game that runs in your browser, with peer-to-peer multiplayer.

**Play:** https://anonymouse012.github.io/low-poly-racer/

## Controls

| Key | Action |
| --- | --- |
| W / ↑ | Accelerate |
| S / ↓ | Brake (the back end slides, and the car turns in harder) |
| A D / ← → | Steer |
| Space | Handbrake (drift) |
| R | Put the car back on the track |
| M | Mute / unmute sound |
| Esc | Back to the main menu (or use the Menu button, top centre) |

On phones and tablets, on-screen buttons appear.

## Tracks

Four tracks, picked from the menu: **Grand Circuit** (1.5 km, flat, the original), **Mountain Loop** (tight and twisty, climbs up to 17 units, autumn colours), **Coastal Sprint** (fast and flowing with gentle hills, sandy) and **Skyway** (a figure of eight: you climb up and over a bridge, then pass underneath it). The page reloads when you pick one. In multiplayer the first letter of the room code says which track it uses (A, B, C or D), so joining a room loads the right track automatically.

Raised road gets a concrete deck and pillars. Going uphill slows the car and downhill speeds it up.

To add a track, add an entry to the `TRACKS` list in `index.html`: a name, ground and sky colours, and a list of `[x, z, height]` points (height is optional). Where the track crosses itself, make the upper road at least 11 units higher. Keep the points on a closed loop, with a straight start section, corners no tighter than about 30 units, and at least 40 units between parts of the track.

## Choosing a map and weather

Click **Drive solo** or **Host a race** and a second screen lets you pick the map (each card shows the layout and your best lap and best 3-lap race on it, saved on your device) and the weather, then **Start** or **Create room**. Picking a different map reloads the page, then starts straight away. Joining a room skips this screen: the host's map and weather are used.

## Weather

Pick **Clear, Sunset, Night, Rain, Snow or Fog** on the menu (it's remembered on your device). Rain and snow cut grip, and snow settles: the longer it falls, the whiter the ground, road and trees get, and the slipperier the road becomes, so you can see your tyre marks in it. It melts away when you switch to another weather. Night turns your headlights on. In multiplayer the host picks the weather for everyone.

## Racing

Pick a name and a car colour on the menu (they're remembered on your device). **Drive solo** starts a 3-lap time trial with a 3-2-1 countdown, and a results card shows your time at the end.

## Multiplayer

1. One player clicks **Host a race** and gets a 5-letter room code.
2. Everyone else enters the code and clicks **Join**, or opens the invite link (tap the room label to copy it).
3. Everyone can practise until the host clicks **Start race**. Then all cars line up on the grid, the countdown runs, and the first to finish 3 laps wins. The host can click **Race again** on the results card.
4. Cars bump into each other (a shove, not a wreck).

Players connect directly to each other using WebRTC through [PeerJS](https://peerjs.com/). The host's browser relays everyone's position, so a race works best with 2-6 players. Some strict networks block direct connections, and those players won't be able to join. Multiplayer also needs to reach `peerjs.com`, so school or work networks that block it can't host or join (solo play still works there).

## How it's built

Everything is in one file, `index.html`. [three.js](https://threejs.org/) draws the game and PeerJS handles multiplayer. Both load from a CDN, so the page needs an internet connection but nothing has to be installed or built.

To change the game, edit `index.html` and commit. GitHub Pages republishes the site within a minute or two.

## Tuning the car

The handling numbers are near the top of the `update()` function in `index.html`:

- `VMAX`: top speed
- the `38` in the engine line: how hard it accelerates
- `grip`: how quickly sideways sliding fades (lower means more drift)
- `yaw`: how sharply the car turns at different speeds
- `LAPS`: how many laps a race lasts

All sounds are generated in the browser, so there are no audio files.

## Relay server (for networks that block PeerJS)

`relay/` is a small Cloudflare Worker that passes messages between players over WebSockets, for school or work networks that block peerjs.com. To use it, deploy it (Cloudflare dashboard, Workers & Pages, Create, Import a repository, set the root directory to `relay`), then open the game once with `?relay=low-poly-relay.YOURNAME.workers.dev`. The address is remembered on that device, and invite links include it. `?relay=off` goes back to PeerJS. To make it the default for everyone, put the address in `DEFAULT_RELAY` near the top of `index.html`.
