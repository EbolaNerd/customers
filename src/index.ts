import express, { Application } from "express";
import "dotenv/config";
import customerRoute from "./routes/customer";

const app: Application = express();
app.use(express.json());
//Route handlers
app.use("/api/customer", customerRoute);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
   console.log(`Starting Customer Service. Listening on PORT ${PORT}`);
});

module.exports = server;
