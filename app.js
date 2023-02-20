const express = require('express');
const connectDB = require('./server/database/dbConnection');
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors');
// const User = require('./server/UserController');
const homeRoute = require('./server/routes/homeRoute')
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080

connectDB()

// support parsing of application/json type post data
app.use(bodyparser.json());
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

app.use(cors());

app.use('/', require('./server/routes/router'));
// app.post('/', homeRoute.home)


//Save Nft by token id
// app.get('/nftdatabytoken', nftfetch.saveNftByToken);
// app.get('/deletenftdata', nftfetch.deleteAllNftData);

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });