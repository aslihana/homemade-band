import express from "express";
import mysql from "mysql";
import cors from  "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bandMembers"
});

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.json("hello this is the backend");
})

app.get("/members", (req, res) => {
    const q =  "SELECT *  FROM members";
    db.query(q, (err, data) => {
        if(err) 
            return res.json(err);
        
        return res.json(data);
    })
})

app.post("/members", (req, res) => {
    const q = "INSERT INTO members (`position`, `experience`, `wage`, `name`) VALUES (?)";
    const values = [
        req.body.position,
        req.body.experience,
        req.body.wage,
        req.body.name,
    ];
    
    /* ["position from backend", "experience from backend", 10000, "name from backend"]; */


    db.query(q, [values], (err, data) => {
        if(err)
            return res.json(err);
        
        return res.json("Member has been added.");
    });
});

app.delete("/:id", (req, res) => {
    const memberId = req.params.id;
    const q = "DELETE FROM members WHERE id = ?";

    db.query(q, [memberId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Member has been deleted successfully.");
    });
});

app.put("/:id", (req, res) => {
    const memberId = req.params.id;
    const q = "UPDATE members SET `position` = ?, `experience` = ?, `wage` = ?, `name` = ? WHERE id = ?";

    const values = [
        req.body.position,
        req.body.experience,
        req.body.wage,
        req.body.name,
    ]

    db.query(q, [...values, memberId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Member has been updated successfully.");
    });
});

app.listen(8800, () => {
    console.log("Connected to backend!");
})