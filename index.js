'use strict';

// The Bible
const bible = require('./json/t_asv.json');
const keys = require('./json/key_english.json');

// Dependencies
const express = require('express');
const _ = require('underscore');

// App config
const PORT = 8090;

// Create app
const app = express();

// Endpoint
app.get('/', function(req, res) {
    res.send({"quote": bible["resultset"]["row"][Math.floor(Math.random() * bible["resultset"]["row"].length)]["field"][4]});
});

app.get('/detail', function(req, res) {
    var row = Math.floor(Math.random() * bible["resultset"]["row"].length);
    var book = _.findWhere(keys["resultset"]["keys"], {b: bible["resultset"]["row"][row]["field"][1]})["n"]
    var chapter = bible["resultset"]["row"][row]["field"][2]
    var verse = bible["resultset"]["row"][row]["field"][3]
    res.send({
        "book": book,
        "chapter": chapter,
        "verse": verse,
        "reference": book + " " + chapter + ":" + verse,
        "quote": bible["resultset"]["row"][row]["field"][4]
    });
});

app.get('/keys', function(req, res) {
    res.send(keys["resultset"])
})

// Start app
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);