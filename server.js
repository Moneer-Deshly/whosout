import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { createClient } from 'redis';
import 'dotenv/config'

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-15667.c338.eu-west-2-1.ec2.redns.redis-cloud.com',
        port: 15667
    }
});

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// struct of lobbies
// idk how jsdoc works so ty AI 

/**
 * Represents a player in the game.
 * @typedef {Object} Player
 * @property {string} username - The username of the player.
 * @property {string} socketId - The socket ID of the player.
 */

/**
 * Represents a game lobby.
 * @typedef {Object} GameLobby
 * @property {string} lobbyId - The unique identifier for the lobby.
 * @property {Player} creator - The creator of the lobby.
 * @property {Player[]} players - An array of players in the lobby.
 */

app.prepare().then(async () => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  
  await redisClient.connect();


  //TODO
  // clean up lobbies when they are done / when someone disconnects
  // prevent user from spamming join button
  
  io.on("connection", async(socket) => {
    socket.on("create", async (val)=>{
      // set a new obj in our redis db
      /**@type {GameLobby} */
      const lobby = {
        creator:{
          username: val.username,
          socketId: socket.id
        },
        players: [{
          username: val.username,
          socketId: socket.id
        }],
        lobbyId: val.lobbyId,
      }

      // lobby must be stringified as objects dont work in redis
      await redisClient.set(val.lobbyId ,JSON.stringify(lobby))
      socket.join(val.lobbyId)
    })

    socket.on("join", async(val)=>{
      if(!val.lobbyId || !val.username){
        socket.emit("error", "missing fields")
        return;
      }
      
      const exists = await redisClient.exists(val.lobbyId)
      if(!exists){
        socket.emit("error", "invalid lobby code")
        return;
      }

      const _lobby = await redisClient.get(val.lobbyId)
      if(!_lobby){
        socket.emit("error", "error fetching lobby")
        return;
      }

      // parse the stringified lobby
      /**@type {GameLobby} */
      const lobby = JSON.parse(_lobby)
      lobby.players = [...lobby.players, {username: val.username, socketId: socket.id}]

      await redisClient.set(val.lobbyId ,JSON.stringify(lobby))
      socket.join(val.lobbyId)
      io.to(val.lobbyId).emit("lobbiesUpdate", lobby.players)
      
    })

    socket.on("startGame",async(val)=>{
      const exists = await redisClient.exists(val.lobbyId)
      if(!exists){
        socket.emit("error", "invalid lobby code")
        return;
      }

      const _lobby = await redisClient.get(val.lobbyId)
      if(!_lobby){
        socket.emit("error", "error fetching lobby")
        return;
      }

      // parse the stringified lobby
      /**@type {GameLobby} */
      const lobby = JSON.parse(_lobby)
      io.to(val.lobbyId).emit("game-starting", lobby.lobbyId)

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
