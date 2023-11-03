import express, { Router, Request, Response } from "express";
import User from "../models/user";
import { validateAge } from "../utils/calculator";
const router: Router = express.Router();

//In-mem users repo v1.0.5
const users: User[] = [];

router.get("/", (req: Request, res: Response) => {
   res.send(users);
});

router.get("/:id", (req: Request, res: Response) => {
   const id = req.params.id;
   if (!id) return res.status(401).send("Invalid request");

   const user = users.find((u) => u.id === parseInt(id));
   if (!user) return res.status(404).send("User not found");

   res.send(user);
});

router.post("/", (req: Request, res: Response) => {
   const { name, phone, age } = req.body;
   if (!name) return res.status(401).send("Please provide name");
   if (!phone) return res.status(401).send("Please provide phone number");
   if (!age) return res.status(401).send("Please provide age");

   if (!validateAge(age)) return res.status(401).send("User must be of age 18 or above");

   const user = { id: users.length + 1, name: name, phone: phone, age: age };
   users.push(user);

   res.status(201).send(user);
});

router.delete("/:id", (req: Request, res: Response) => {
   const id = req.params.id;
   if (!id) return res.status(401).send("Invalid request");

   const user = users.find((u) => u.id === parseInt(id));
   if (!user) return res.status(404).send("User not found");

   const index = users.indexOf(user);
   users.splice(index, index + 1);

   console.log(JSON.stringify(user));

   res.send(user);
});

export default router;
