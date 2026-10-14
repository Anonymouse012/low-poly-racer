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

On phones and tablets, on-screen buttons appear.

## Racing

Pick a name and a car colour on the menu (they're remembered on your device). **Drive solo** starts a 3-lap time trial with a 3-2-1 countdown, and a results card shows your time at the end.

## Multiplayer

1. One player clicks **Host a race** and gets a 5-letter room code.
2. Everyone else enters the code and clicks **Join**, or opens the invite link (tap the room label to copy it).
3. Everyone can practise until the host clicks **Start race**. Then all cars line up on the grid, the countdown runs, and the first to finish 3 laps wins. The host can click **Race again** on the results card.
4. Cars pass through each other, so nobody gets wrecked.

Players connect directly to each other using WebRTC through [PeerJS](https://peerjs.com/). The host's browser relays everyone's position, so a race works best with 2-6 players. Some strict networks block direct connections, and those players won't be able to join.

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
