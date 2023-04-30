const express = require('express');
const fs = require('fs');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var https = require('https');

const bodyParser = require("body-parser");
  
// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// var connection = mysql.createPool({
//     host: "cooplukerb-do-user-13916037-0.b.db.ondigitalocean.com",
//     port: "25060",
//     user: "erikadmin",
//     password: "AVNS_yjEe4pMgD-L8jQn5Zqg",
//     database: "hosting_db",
//     connectionLimit: 100
// });

var connection = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    // password: "",
    database: "hosting_db",
    connectionLimit: 100
});

app.get('/', (req, res) => {
    // var connection = mysql.createConnection(options);

    connection.query("SELECT * FROM users", (err, result, fields) => {
        if (err) throw err;
    });
    res.send("Hello World!");

})

app.post('/signup', (req, res) => {
    connection.query(`SELECT userName FROM \`users\` WHERE userName = '${req.query.username}';`, function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            var ad = 2;
            console.log(req.query.admin)
            if (req.query.admin == "true") {
                console.log("ADMIN ACCOUNT")
                ad = 1;
            }
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.query.password, salt, function (err, passwordHash) {
                    connection.query(`INSERT INTO users (userName, userEmail, userPassword, permissionID)
                    VALUES ('${req.query.username}','${req.query.email}','${passwordHash}', ${ad});`, function (err2, result2, fields2) {
                        if (err) throw err;
                        res.send(true);
                    });
                });
            });
        } else {
            res.send(false)
        }
    });
    console.log("hi");
    // res.send("Hello World!");

})

app.post('/login', (req, res) => {
    // var connection = mysql.createConnection(options);

    connection.query(`SELECT * FROM \`users\` WHERE userName = '${req.query.username}';`, function (err, result, fields) {
        if (err) throw err;
        if (result.length == 1) {
            bcrypt.compare(req.query.password, result[0].userPassword, (err, match) => {
                if (err) { throw err };
                if (!match) {
                    res.status(401);
                    res.send("Fail");
                } else {
                    res.send({ userid: result[0].userID, username: result[0].userName, admin: result[0].permissionID })
                }
            })
        } else {
            res.status(400);
            res.send("Fail");
        }
    });
    // connection.end();
})

app.post('/comment', (req, res) => {
    // var connection = mysql.createConnection(options);

    connection.query(`INSERT INTO comments (userID, commentText)
        VALUES (${req.query.userid},'${req.query.commenttext}');`, function (err, result, fields) {
        if (err) throw err;
        res.send(true);
    });
    // connection.end();
})

app.get('/comments', (req, res) => {
    // var connection = mysql.createConnection(options);

    connection.query(`SELECT comments.commentText, users.userName FROM comments
    INNER JOIN users ON comments.userID = users.userID;`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
    // connection.end();
})

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

app.listen(3001, () => {
    console.log("Success!");
    console.log(`Server Running on Port 3001`);
})

// https.createServer(options, app).listen(3001, () => {
//     console.log("Success!");
//     console.log(`Server Running on Port 3001`);
// })