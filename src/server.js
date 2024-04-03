import express from "express";

export class Server {
  constructor(portNumber) {
    if (!portNumber) {
      throw new Error("Server has not portNumber defined");
    }
    this.app = express();
    this.portNumber = portNumber;
  }

  start() {
    this.app.listen(this.portNumber, () => {
      console.log(`Server is listening on http://127.0.0.1:${this.portNumber}`);
    });
  }

  useJsonParser() {
    return this.app.use(express.json());
  }

  use(router) {
    return this.app.use(router);
  }
}
