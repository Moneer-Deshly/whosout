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
// map<lobbyId, {creator: string, players:[]}>

app.prepare().then(async () => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  
  await redisClient.connect();


  io.on("connection", async(socket) => {
    socket.on("create", async (val)=>{
      // set a new map in our redis db
      // players must be stringified because arrays are an invalid data type
      await redisClient.hSet(
        val.lobbyId,
        {
          'creator': val.username,
          'players': JSON.stringify(["p1", "p2", "p3"]),
        }
      )

      //io.emit("lobbiesUpdate", Array.from(lobbies));
    })

    socket.on("join", async(val)=>{
      const exists = await redisClient.exists(val.lobbyId)
      if(!exists){
        socket.emit("error", "invalid lobby code")
        return;
      }

      else{
        // parse the stringified players array from the map
        const players = JSON.parse(await redisClient.hGet(val.lobbyId, "players"))

        // using hSet with an existing key just updates the map with the values we provide
        // creator wont change here as its not a provided field
        await redisClient.hSet(
          val.lobbyId,
          {
            'players': JSON.stringify([...players, val.username]),
          }
        )
      }
      //io.emit("lobbiesUpdate", Array.from(lobbies));
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
