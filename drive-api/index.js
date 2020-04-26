const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const mime = require('mime');
const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload());

app.post('/rpi2/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/media/pi/2TB/files/' + req.files.sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
app.get('/rpi2/download', function(req, res){
  let filename = req.query.file;
  var file = '/media/pi/2TB/files/' + filename;
  var mimetype = mime.getType(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});
app.get('/rpi2/allfiles', function(req, res) {
  fs.readdir('/media/pi/2TB/files', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    var all = []
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        all.push(file)
    });
    res.json(all)
  });
})
app.listen(8080);
