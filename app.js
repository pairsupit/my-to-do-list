const express = require(`express`);
const mysql = require(`mysql`);
const cors = require(`cors`);
// const books = require(`./db.json`);
var bodyParser = require('body-parser');

const app = express();
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json()
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

const db = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `my-to-do-list`
});

db.connect((err) => {
    if (err) throw err;
    console.log(`connect my app to mysql is complete!`);
});

app.get(`/`, (req,res) => {
    console.log('This is path http://localhost:3000');

    let sql = `SELECT * FROM todo`;
    db.query(sql,(err,results) => {
        if(err) throw err;
        // console.log(results[0]);
        // console.log(typeof results);
        res.send(results);
        // res.send(`select all from todo table in my-to-do-list database `);
    });
})

app.post(`/insert`, jsonParser, (req,res) => {
    console.log(req.body);
    let titleStr = req.body.title;
    let descriptionStr = req.body.description;
    let post = {title: titleStr ,description: descriptionStr }
    let sql = `INSERT INTO todo SET ?`;
    db.query(sql, post, (err,results) => {
        if(err) throw err;
    });
})

app.delete(`/delete`, (req,res) => {
    console.log(`this is path http://localhost:3000/delete/${id}`);
    // console.log(req.body);
    // console.log(res.body);
    // let sql = `DELETE FROM todo WHERE title=`;
    db.query(sql, post, (err,results) => {
        if(err) throw err;
        console.log();
    });
})

//listen
const port = 3000;
app.listen(port, () => {
    console.log(`We are on port ${port}!`);
});

//log error
db.on('error', (err) =>
    console.log(err)
)