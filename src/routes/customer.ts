import express, { Router, Request, Response } from "express";
import Customer from "../models/customer";
import { validateAge } from "../utils/calculator";
const router: Router = express.Router();

//In-mem customers repo v1.0.5
const customers: Customer[] = [];

router.get("/", (req: Request, res: Response) => {
   res.send(customers);
});

router.get("/:id", (req: Request, res: Response) => {
   const id = req.params.id;
   if (!id) return res.status(401).send("Invalid request");

   const user = customers.find((u) => u.id === parseInt(id));
   if (!user) return res.status(404).send("Customer not found");

   res.send(user);
});

router.post("/", (req: Request, res: Response) => {
   const { name, phone, age } = req.body;
   if (!name) return res.status(401).send("Please provide name");
   if (!phone) return res.status(401).send("Please provide phone number");
   if (!age) return res.status(401).send("Please provide age");

   if (!validateAge(age)) return res.status(401).send("Customer must be of age 18 or above");

   const customer = { id: customers.length + 1, name: name, phone: phone, age: age };
   customers.push(customer);

   res.status(201).send(customer);
});

router.delete("/:id", (req: Request, res: Response) => {
   const id = req.params.id;
   if (!id) return res.status(401).send("Invalid request");

   const customer = customers.find((u) => u.id === parseInt(id));
   if (!customer) return res.status(404).send("Customer not found");

   const index = customers.indexOf(customer);
   customers.splice(index, index + 1);

   console.log(JSON.stringify(customer));

   res.send(customer);
});

export default router;
