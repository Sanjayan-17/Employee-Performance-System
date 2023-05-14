const app = express();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var multer = require('multer');
const port = 5000;
var {
	GridFsStorage
} = require('multer-gridfs-storage');

app.use(express.static(__dirname + '/'))

app.get('/', (req, res) => {
    res.sendFile('index.html',{root:__dirname});
});

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});