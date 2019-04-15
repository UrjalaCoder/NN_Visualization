const express = require("express");
const path = require('path');
const pythonShell = require('python-shell');
let app = express();

app.use(express.static(path.join(__dirname, "/dist")));

app.post("/train", (req, res) => {
    var options = {
        args: [
            req.query.input_data
        ]
    }

    PythonShell.run('./network_controller_train.py', options, (err, data) => {
        if(err) res.send(JSON.stringify({'error': err.message, 'data': null}));
        res.send(JSON.stringify({'error': null, 'data': data}))
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(3000, function() {
    console.log("Server started...");
});
