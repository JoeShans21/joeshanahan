const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const mime = require('mime');
const fs = require('fs');
const path = require('path');
app.use(fileUpload());
app.post('/api/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let sampleFile = req.files.sampleFile;
  sampleFile.mv('/media/2TB/files/' + req.files.sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });
});
app.get('/api/download', function(req, res){
  let filename = req.query.file;
  var file = '/media/2TB/files/' + filename;
  var mimetype = mime.getType(file);
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);
  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});
app.get('/api/allfiles', function(req, res) {
  fs.readdir('/media/2TB/files', function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    var all = []
    files.forEach(function (file) {
        all.push(file)
    });
    res.json(all)
  });
})
app.listen(8080);