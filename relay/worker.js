// Low Poly Racer relay: one Durable Object per room, passes messages between the host and players over WebSockets.
const send = (ws, o) => { try { ws.send(JSON.stringify(o)); } catch (e) {} };

export class Room {
  constructor(state) { this.state = state; }
  async fetch(req) {
    if (req.headers.get('Upgrade') !== 'websocket') return new Response('room ok');
    const url = new URL(req.url), role = url.searchParams.get('role');
    const [client, server] = Object.values(new WebSocketPair());
    const host = this.state.getWebSockets('host')[0];
    const fail = err => { server.accept(); send(server, { err }); server.close(1000, err); };
    if (role === 'host') {
      if (host) fail('unavailable-id');
      else { this.state.acceptWebSocket(server, ['host']); send(server, { ready: 1 }); }
    } else {
      const id = (url.searchParams.get('id') || '').replace(/[^\w-]/g, '').slice(0, 20) || crypto.randomUUID().slice(0, 8);
      if (!host) fail('peer-unavailable');
      else if (this.state.getWebSockets('c:' + id).length) fail('unavailable-id');
      else { this.state.acceptWebSocket(server, ['c:' + id]); send(server, { ready: 1 }); send(host, { open: id }); }
    }
    return new Response(null, { status: 101, webSocket: client });
  }
  webSocketMessage(ws, msg) {
    if (typeof msg !== 'string' || msg.length > 4000) return;
    const tag = this.state.getTags(ws)[0];
    let m; try { m = JSON.parse(msg); } catch (e) { return; }
    if (tag === 'host') {
      for (const c of this.state.getWebSockets('c:' + m.to)) send(c, { d: m.d });
    } else {
      const host = this.state.getWebSockets('host')[0];
      if (host) send(host, { from: tag.slice(2), d: m });
    }
  }
  webSocketClose(ws) { this.gone(ws); }
  webSocketError(ws) { this.gone(ws); }
  gone(ws) {
    const tag = this.state.getTags(ws)[0];
    if (!tag) return;
    if (tag === 'host') { for (const c of this.state.getWebSockets()) if (c !== ws) try { c.close(1000, 'host left'); } catch (e) {} }
    else { const host = this.state.getWebSockets('host')[0]; if (host) send(host, { close: tag.slice(2) }); }
    try { ws.close(); } catch (e) {}
  }
}

export default {
  async fetch(req, env) {
    const m = new URL(req.url).pathname.match(/^\/room\/([A-Za-z0-9]{5})$/);
    if (!m) return new Response('low-poly-relay ok');
    return env.ROOM.get(env.ROOM.idFromName(m[1].toUpperCase())).fetch(req);
  }
};
