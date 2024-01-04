const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const app = express()

const db = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASS,
    database: process.env.DB
})

db.connect(() => console.log('connected to database'))

app.use(cors())

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next()
})

app.get('/', (req, res) => {
    try {
        index = path.join(__dirname, 'index.html')
        res.sendFile(index)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/api', (req, res) => {
    res.json({ message: "Successfully connected to the API" })
})

app.get('/api/users', (req, res) => {
    try {
        const query = 'SELECT name, loggedIn FROM users'
        db.query(query, (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({error: err})
            }
            console.log(result);
            return res.json(result)
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(process.env.PORT, () => {
    console.log("I'm merry poppins ya'll")
})