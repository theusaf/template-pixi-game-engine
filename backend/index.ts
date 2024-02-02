import * as Gluon from "@gluon-framework/gluon";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(dirname, "../dist")));

const port = await getListeningPort();
const window = await Gluon.open(`http://localhost:${port}`, {
  allowHTTP: true,
});

const closeInterval = setInterval(() => {
  if (window.closed) {
    clearInterval(closeInterval);
    console.log("Window closed, exiting");
    process.exit(0);
  }
}, 2000);

async function getListeningPort() {
  let port = 3050;
  for (let i = 0; i < 50; i++) {
    try {
      await bindToPort(port);
      return port;
    } catch (err) {
      port++;
    }
  }
  throw new Error("No available port found");
}

function bindToPort(port: number) {
  return new Promise<void>((resolve, reject) => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      resolve();
    }).on("error", (err: {errno?: string}) => {
      if ("EADDRINUSE" === err?.errno) {
        console.log(`Error: ${err}`);
        reject(err);
      }
    });
  });
}
