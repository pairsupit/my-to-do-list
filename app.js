const express = require(`express`);
const mysql = require(`mysql`);
const cors = require(`cors`);
const books = require(`./db.json`);

const app = express();
app.use(cors());


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
        console.log(results[0]);
        console.log(typeof results);
        res.send(results);
        // res.send(`select all from todo table in my-to-do-list database `);
    });
})

app.get(`/insert`, (req,res) => {
    let post = {title:"from app.js",description:"This is first post insert form app.js"}
    let sql = `INSERT INTO todo SET ?`;
    db.query(sql,post,(err,results) => {
        if(err) throw err;
        console.log(results);
    });
});

//this call gonna give me json type
// app.get('/', (req, res) => {
//     res.json(books)
// })

//listen
const port = 3000;
app.listen(port, () => {
    console.log(`We are on port ${port}!`);
});

//log error
db.on('error', (err) =>
    console.log(err)
)