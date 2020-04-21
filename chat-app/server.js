const app = require('express')(),
  server  = require("http").createServer(app),
  io = require("socket.io")(server);
  mysql = require('mysql');
  passwordHash = require('password-hash');
  express = require('express');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://root:Ipodgenius21@cluster0-m6l65.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { user: q.user };
  dbo.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    if (result[0] == null) {
      var obj = { first: q.first, last: q.last, user: q.user, pass: q.pass };
      dbo.collection("users").insertOne(obj, function(err, response) {
        if (err) throw err;
        console.log(q.user + " has signed up.");
        res.end("Signed up");
        db.close();
      });
    }
    else {
        res.end("Username is taken");
    }
    db.close();
  });
});
  


var connection = mysql.createConnection({
	host: 'sql9.freemysqlhosting.net',
	user: 'sql9251151',
	password: 'w73z9SwvYP',
	database: 'sql9251151'
});

app.use(express.static('public'));


io.on('connection', function(client) {
	console.log('Client Conected')
	client.emit('test');
	client.on('getmessages', function(){
		connection.query('SELECT * FROM messages', function(err, rows){
			for (let value of rows){
				var out = value.content
				out=out.replace('<', '&lt;')
				out=out.replace('>', '&gt;')
				client.emit('thread', value.content, value.author);
			}
		});
	});
	client.on('signup', function(first, last, email, user, pass) {
		var hashedPass = passwordHash.generate(pass);
		MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chat_app_db");
      var query = { user: user };
      dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result[0] == null) {
          var obj = { first: first, last: last, user: user, pass: hashedPass };
          dbo.collection("users").insertOne(obj, function(err, response) {
            if (err) throw err;
            console.log(q.user + " has signed up.");
            res.end("Signed up");
            db.close();
          });
        }
        else {
            res.end("Username is taken");
        }
        db.close();
      });
    });
		client.emit('signinsendback', 4, user)
	});

	client.on('signin', function(user, pass){
		connection.query('SELECT * FROM chat_users WHERE u_username="' + user + '"', function(err, rows){
			try {
				var hashedPassword=rows[0].u_password;
                console.log("rows: " + rows)
				var result=passwordHash.verify(pass, hashedPassword)
				if (result){
					client.emit('signinsendback', 1, user)
				}
				else {
					client.emit('signinsendback', 2, user)
				}
			}
            catch (err){
				if (err="TypeError: Cannot read property 'u_password' of undefined"){
					client.emit('signinsendback', 3, "Account does not exist")
				}
			}
		});
	});

	client.on('newuser', function(username){
		client.broadcast.emit('newuserserver', username);
	});

	client.on('messages', function(data, user){
		console.log("someone is sending message")
		connection.query('INSERT INTO messages (content,author) VALUES ("'+data+'", "'+user+'");');
		client.emit('thread', data, user);
		client.broadcast.emit('thread', data, user);
		console.log('someone recieved messages');
	});

	client.on('getusername', function(){
		client.emit('sendbackuser', socket.handshake.session.username);
	});
});

server.listen(8000);