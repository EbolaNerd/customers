import express, { Application } from "express";
import "dotenv/config";
import users from "./routes/users";

const app: Application = express();
app.use(express.json());
//Route handlers
app.use("/api/users", users);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
});

module.exports = server;
