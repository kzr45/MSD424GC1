// Import required modules
var express = require("express");
// var bcrypt = require("bcrypt");
var dbcon = require("../database");

// Get database connection
var connection = dbcon.getConnection();
connection.connect();

// Create router
var router = express.Router();

// Handle GET requests, return all records from user_db table
router.get("/", (req, res) => {
    connection.query("SELECT * FROM user_db", (err, records, fields) => {
        if (err) {
            console.log("Error while fetching data: " + err);
            res.status(500).send("Error while fetching data");
        } else {
            res.send(records);
        }
    });
});

// Handle GET request to fetch user information by email
router.get("/userInfo", (req, res) => {
    const { email } = req.query; // 获取请求的查询参数中的email

    if (!email) {
        return res.status(400).send("Email is required");
    }

    // 查询数据库，获取与提供的email匹配的用户信息
    connection.query("SELECT * FROM user_db WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.log("Error while fetching user by email: " + err);
            res.status(500).send("Error while fetching user by email");
        } else {
            if (results.length > 0) {
                res.send(results[0]); // 假设email是唯一的，返回匹配的第一个用户信息
            } else {
                res.status(404).send("User not found");
            }
        }
    });
});

// Handle user registration
router.post("/regist", (req, res) => {
    var { username, password, roleid, phone, nickname, gender, email } = req.body;

    // Check if all fields are provided
    if (!username || !password || !roleid || !phone || !nickname || !gender || !email) {
        return res.status(400).send("All fields are required");
    }

    // Perform database insert operation
    connection.query(
        "INSERT INTO user_db (username, password, roleid, phone, nickname, gender, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, password, roleid, phone, nickname, gender, email],
        (err, result) => {
            if (err) {
                console.error("Error while inserting data: " + err);
                res.send({ insert: "failed" });
            } else {
                res.send({ insert: "success" });
            }
        }
    );
});

// Handle user login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    // Query the database to find the user
    connection.query("SELECT * FROM user_db WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.log("Error while fetching user: " + err);
            return res.status(500).send("Error while fetching user");
        }
        if (results.length > 0) {
            if (password === results[0].password) {
                res.send({ login: "success", user: { username: results[0].username, email: results[0].email } });
            } else {
                res.status(401).send({ login: "failed", message: "Incorrect password" });
            }
        } else {
            res.status(404).send({ login: "failed", message: "User not found" });
        }
    });
});

// Handle request to update user information
router.put("/updateUser", (req, res) => {
    var { username, password, roleid, phone, nickname, gender, email } = req.body;
    
    if (!username || !password || !roleid || !phone || !nickname || !gender || !email) {
        return res.status(400).send("All fields are required for updating a user");
    }

    // Build SQL query to update user information
    var updateQuery = `UPDATE user_db SET password = ?, roleid = ?, phone = ?, nickname = ?, gender = ?, email = ? WHERE username = ?`;

    // Perform the update operation
    connection.query(updateQuery, [password, roleid, phone, nickname, gender, email, username], (err, result) => {
        if (err) {
            console.error("Error while updating user: " + err);
            res.status(500).send("Error while updating user");
        } else {
            if (result.affectedRows > 0) {
                res.send({ update: "success" });
            } else {
                res.status(404).send({ update: "failed", message: "User not found" });
            }
        }
    });
});

// Export the router
module.exports = router;
