const app = require('express')(),
  server  = require("http").createServer(app),
  io = require("socket.io")(server);
  mysql = require('mysql');
  passwordHash = require('password-hash');
	express = require('express');
	MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://root:Ipodgenius21@cluster0-m6l65.mongodb.net/test?retryWrites=true&w=majority";

app.use(express.static('public'));

io.on('connection', function(client) {
	console.log('Client Conected')
	client.emit('test');
	client.on('getmessages', function(){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("chat_app_db");
			dbo.collection("messages").find({}).toArray(function(err, result) {
				if (err) throw err;
				for (let msg of result) {
					client.emit('thread', msg.content, msg.author);
				}
				db.close();
			})
		});
	});
	client.on('signup', function(first, last, email, user, pass) {
		let hashedPass = passwordHash.generate(pass);
		let output;
		MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chat_app_db");
      var query = { user: user };
      dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result[0] == null) {
          var obj = { first: first, last: last, user: user, pass: pass };
          dbo.collection("users").insertOne(obj, function(err, response) {
            if (err) throw err;
            output = 4;
            db.close();
          });
        }
        else {
            output = 5;
        }
        db.close();
      });
    });
		client.emit('signinsendback', output, user)
	});

	client.on('signin', function(user, pass){
		MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chat_app_db");
      var query = { user: user }
      dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result[0] == null) {
          client.emit('signinsendback', 3, "Account does not exist");
        }
        else {
					var realPass = result[0].pass;
          if (pass == realPass) {
            console.log(user + " has signed in.");
            client.emit('signinsendback', 1, user);
          }
          else {
            client.emit('signinsendback', 2, user);
          }
        }
        db.close();
      });
      db.close();
    });
	});

	client.on('newuser', function(username){
		client.broadcast.emit('newuserserver', username);
	});

	client.on('messages', function(data, user){
		console.log("someone is sending message")
		MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chat_app_db");
			var obj = { content: data, author: user };
			dbo.collection("messages").insertOne(obj, function(err, response) {
				if (err) throw err;
				db.close();
			});
    });
		client.emit('thread', data, user);
		client.broadcast.emit('thread', data, user);
		console.log('someone recieved messages');
	});

	client.on('getusername', function(){
		client.emit('sendbackuser', socket.handshake.session.username);
	});
});

server.listen(8000);