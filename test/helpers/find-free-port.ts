import { createConnection } from "node:net";

const maxPort = 65534;

function getRandomPort(): number {
  return Math.floor(Math.random() * (maxPort - 1024 + 1)) + 1024;
}

function isFreePort(port: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const socket = createConnection({ port });
    // can connect, port is not available
    socket.on("connect", function () {
      socket.end();
      resolve(false);
    });
    // can't connect, port is available
    socket.on("error", (e: NodeJS.ErrnoException) => {
      socket.destroy();
      if (e.code === "ECONNREFUSED") {
        resolve(true);
      } else {
        reject(e);
      }
    });
  });
}

export async function findFreePort(maxTries = 20): Promise<number> {
  let tries = 0;
  let port = getRandomPort();

  while (port < maxPort) {
    if (await isFreePort(port)) {
      return port;
    }
    port = getRandomPort();

    tries++;
    if (tries > maxTries) {
      break;
    }
  }
  throw new Error("No available ports");
}
