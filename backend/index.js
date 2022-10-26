import express from "express";
import mysql from "mysql2/promise";
import cors from  "cors";
import makeMemebersDatabase from "./members.database.js";

(async () => {
    const app = express();

    const db = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"bandMembers"
    });
    const members = makeMemebersDatabase({ database: db })

    app.use(express.json());
    app.use(cors());


    app.get("/", (req, res) => {
        res.json("hello this is the backend");
    })

    app.get("/members", async (req, res) => {
        const membersList = await members.findAll()
        if (membersList) {
            res.status(200).json(membersList)
        } else {
            res.sendStatus(204)
        }
    })

    app.post("/members", async (req, res) => {
        const member = await members.create(req.body)
        if (member) {
            res.status(201).json(member)
        } else {
            res.sendStatus(500)
        }
    });

    app.put("/members/:id", async (req, res) => {
        const member = await members.update(req.params.id, req.body)
        if (member) {
            res.status(200).json(member)
        } else {
            res.sendStatus(500)
        }
    });

    app.delete("/members/:id", async (req, res) => {
        const member = await members.remove(req.params.id)
        if (member) {
            res.sendStatus(204)
        } else {
            res.sendStatus(500)
        }
    });

    app.listen(process.env.PORT || 8800, () => {
        console.log("Connected to backend!");
    })
})()
