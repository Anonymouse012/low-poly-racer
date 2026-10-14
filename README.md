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

On phones and tablets, on-screen buttons appear.

## Multiplayer

1. One player clicks **Host a race** and gets a 5-letter room code.
2. Everyone else enters the code and clicks **Join**, or opens the invite link (tap the room label to copy it).
3. Cars pass through each other, so nobody gets wrecked.

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
