var express = require('express');
var app = express();

// viewed at http://localhost:8080
app.use('/calculator', express.static('public'))

app.listen(8080);