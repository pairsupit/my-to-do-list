const express = require(`express`);
const mysql = require(`mysql`);
const cors = require(`cors`)

const app = express();
app.use(cors())


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
    console.log('get');
    res.send(`get`);
});

app.get(`/select`, (req,res) => {
    console.log('select');
    res.send(`select`);
});

app.get(`/insert`, (req,res) => {
    let post = {title:"from app.js",description:"This is first post insert form app.js"}
    let sql = `INSERT INTO todo SET ?`;
    db.query(sql,post,(err,results) => {
        if(err) throw err;
        console.log(results[0]);
        res.send(`note from app.js is add`);
    });
});

//listen
const port = 3000;
app.listen(port, () => {
    console.log(`We are on port ${port}!`);
});