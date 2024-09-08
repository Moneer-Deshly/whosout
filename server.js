import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// <lobbyKey:players[]>
// can use sets in the future if usernames cant be duped

const lobbies = new Map()

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {

    socket.on("create", (val)=>{
      if(!lobbies.get(val.lobbyId)){
        lobbies.set(val.lobbyId, [val.username])
      }
      else{
        const players = lobbies.get(val.lobbyId)
        players.push(val.username)
        lobbies.set(val.lobbyId, players)
      }

      io.emit("lobbiesUpdate", Array.from(lobbies));
    })

    socket.on("join", (val)=>{
      if(!lobbies.get(val.lobbyId)){
        socket.emit("error", "invalid lobby code")
      }
      else{
        const players = lobbies.get(val.lobbyId);
        players.push(val.username);
        lobbies.set(val.lobbyId, players);
      }
      io.emit("lobbiesUpdate", Array.from(lobbies));
    })


  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
