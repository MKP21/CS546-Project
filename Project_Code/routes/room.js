const express = require('express');
const router = express.Router();
let roomFunctions = require('../data/room');

// when user selects a room, this page will be rendered, it has the chat
router.get('/:id', async (req, res) => {
  try {
    // open chat
    // get chat history
    // get user room list from req.session.uMail
    // get list of online users
    let m = req.url;
    m = m.substring(1);
    var roomObj = await roomFunctions.getRoom(m);
    
    res.render('chatbox',{title:roomObj.roomTitle,usermail:req.session.uMail,roomId:m});
  } catch (e) {
    console.log(e)
    res.status(400).render('error',{title:"error",post:e});
  }
});

module.exports = router;