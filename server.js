var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var TODOS_COLLECTION = 'todos';

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create database
var db;
var url = 'mongodb://127.0.0.1:27017/todos';

mongodb.MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log('Database connection successful');
    var server = app.listen(process.env.PORT || 3030, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*
 * "/todos"
 * GET: find all todos
 * POST: create todo
 */

app.get('/todos', function (req, res) {
   db.collection(TODOS_COLLECTION).find({}).toArray(function (err, docs) {
       if (err) {
           handleError(res, err.message, 'Failed get todos');
       } else {
           res.status(200).json(docs);
       }
   });
});

app.post("/todos", function(req, res) {
    var newTodo = req.body;
    newTodo.createDate = new Date();

    if (!(req.body.description)) {
        handleError(res, "Invalid user input", "Must provide a description.", 400);
    }

    db.collection(TODOS_COLLECTION).insertOne(newTodo, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new todo.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});








