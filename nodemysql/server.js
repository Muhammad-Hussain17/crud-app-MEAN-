const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');  // Import the cors package

const server = express();

// Enable CORS for all origins or configure it for a specific origin
server.use(cors());  // Allow all origins (you can restrict this later if needed)

server.use(bodyParser.json());

// Establish the DB connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbsmschool",
});

db.connect(function (error) {
    if (error) {
        console.log("Error connecting to DB");
    } else {
        console.log("Successfully connected to DB");
    }
});

server.listen(8088, function (error) {
    if (error) {
        console.log("Error...!!!");
    } else {
        console.log("Server started on port 8088");
    }
});

// Create records
server.post("/api/student/add", (req, res) => {
    let details = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Student creation failed" });
        } else {
            res.send({ status: true, message: "Student created successfully" });
        }
    });
});

// View records
server.get("/api/student/", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// Search records
server.get("/api/student/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM student WHERE id =" + studentid;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error connecting to DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// Update records
server.put("/api/student/update/:id", (req, res) => {
    let sql =
        "UPDATE student SET stname = '" +
        req.body.stname +
        "', course = '" +
        req.body.course +
        "', fee = '" +
        req.body.fee +
        "' WHERE id = " +
        req.params.id;

    db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Student update failed" });
        } else {
            res.send({ status: true, message: "Student updated successfully" });
        }
    });
});

// Delete records
server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student WHERE id =" + req.params.id + "";
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Student deletion failed" });
        } else {
            res.send({ status: true, message: "Student deleted successfully" });
        }
    });
});