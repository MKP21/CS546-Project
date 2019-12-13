const express = require('express');
const router = express.Router();
let roomFunctions = require('../data/room');
let userFunctions = require('../data/user');

router.get('/joinRoom', async (req, res) => {
  try {
    res.status(400).render('joinRoom',{title:"Join a room"});
  } catch (e) {
    console.log(e)
    res.status(400).render('joinRoom',{title:"Join a room",error:e});
  }
});

router.post('/joinRoom', async (req, res) => {
  try {
    // get the room from the entry code
    var roomObj = await roomFunctions.checkEntryCode(req.body.invitecode);
    if(roomObj.none){
      throw roomObj.none;
    }else{
      // join room
      var userObj = await userFunctions.getUserByEmail(req.session.uMail);
      m = await roomFunctions.addUser(userObj._id,roomObj._id);
      
      //redirect to homepage
      console.log(m);
      res.render('joinRoom',{title:"error",error:m});
    }
  } catch (e) {
    console.log(e)
    res.status(400).render('joinRoom',{title:"error",error:e});
  }
});

// when user selects a room, this page will be rendered, it has the chat
router.get('/:id', async (req, res) => {
  try {
    // open chat
    // get chat history
    // get user room list from req.session.uMail
    // get list of online users
    let m = req.url;
    m = m.substring(1);
    req.session.roomid = m;
    var roomObj = await roomFunctions.getRoom(m);
    var send = await roomFunctions.sendMessage("ms@dundermifflin.com",m,"I'm the best manager there is!!");
    var send2 = await roomFunctions.sendMessage("ds@dundermifflin.com",m,"That's right Michael!!");
    
    res.render('chatbox',{title:roomObj.roomTitle,usermail:req.session.uMail,roomId:m});
  } catch(e){
    console.log(e)
    res.status(400).render('error',{title:"error",post:e});
  }
});


module.exports = router;