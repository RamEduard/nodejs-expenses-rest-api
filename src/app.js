import router from "./routes/index.js";
import { Server } from "./server.js";
import db from "./models/index.js";

async function boot() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const serverObj = new Server(3000);
  serverObj.useJsonParser();
  serverObj.use(router);

  serverObj.start();
}

boot();
