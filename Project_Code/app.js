// We first require our express package
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bcrypt = require('bcryptjs');
const bodyparser = require('body-parser');
const static = express.static(__dirname + '/public');
const configRoutes=require('./routes');
const roomFunctions=require('./data/room');
const userFunctions=require('./data/user');

// socket.io session and cookie session
const sharedsession = require("express-socket.io-session");
const cookie = require('cookie');

// We create our express instance:
const app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', static);

// for parsing json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended:true
}));

// creaitng cookie
app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}))

// 1.Middleware :runs every time
app.use('/',function(req, res, next) {
  var str = "["+new Date().toUTCString() + "]: " + req.method + "  " + req.originalUrl;
  if(req.session.uMail){
    str = str + ' (Authenticated User)';
  }else{
    str = str + ' (Non-Authenticated User)';
  }
  console.log(str);
  next();
});

// 2.Middleware for user route
app.get('/user', async (req, res, next) => {
  let sess = req.session; 
  if(!sess.uMail){
    //If a user is not logged in
    res.status(403).render('error',{title:"error",message:"user is not logged in!!"});
  }else{
    next();
  }
  // else if user is already logged in, then they will be taken to user.js in routes  
});

// 2.Middleware for room route
app.use('/room', async (req, res, next) => {
  let sess = req.session; 
  if(!sess.uMail){
    //If a user is not logged in
    res.status(403).render('error',{title:"error",message:"user is not logged in!!"});
  }else{
    next();
  }
  // else if user is already logged in, then they will be taken to user.js in routes  
});

// calling the routes folder
configRoutes(app);

// We can now navigate to localhost:3000
server =app.listen(3000, function() {
  console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});

const io=require("socket.io")(server);

// creating a shared cookie based off on express session
// io.use(sharedsession(session, {
//   autoSave:true
// }));

io.on('connection', async function(socket){
  console.log('a user connected');
  //var userObj = await userFunctions.getUserByEmail(req.session.uMail)

  // this will be called when send is pressed
  socket.on('chat message', function(msg){    
    console.log('message: ' + msg);
    
    //userObj.firstName + " " + userObj.lastName + ": " +
    // This will emit the event to all connected sockets
    io.emit('chat message',msg);
});

});