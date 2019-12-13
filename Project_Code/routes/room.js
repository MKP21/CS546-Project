const express = require('express');
const router = express.Router();
let roomFunctions = require('../data/room');
let userFunctions = require('../data/user');

router.get('/joinRoom', async (req, res) => {
  try {
    res.status(400).render('joinRoom', { title: "Join a room", roomid: req.session.roomid });
  } catch (e) {
    console.log(e)
    res.status(400).render('joinRoom', { title: "Join a room", error: e, roomid: req.session.roomid });
  }
});

router.post('/joinRoom', async (req, res) => {
  try {
    // get the room from the entry code
    var roomObj = await roomFunctions.checkEntryCode(req.body.invitecode);
    if (roomObj.none) {
      throw roomObj.none;
    } else {
      // join room
      var userObj = await userFunctions.getUserByEmail(req.session.uMail);
      m = await roomFunctions.addUser(userObj._id, roomObj._id);

      //redirect to homepage
      //console.log(m);
      res.render('joinRoom', { title: "error", error: m });
    }
  } catch (e) {
    console.log(e)
    res.status(400).render('joinRoom', { title: "error", error: e });
  }
});
// renders edit room
router.get('/:id/edit', async (req, res) => {
  try {
    if (!req.session.roomid) {
      res.redirect('/user');
    }
    m = req.session.roomid;

    res.render('editroom', { title: "Edit Room", roomid: m });
  } catch (e) {
    res.render('editroom', { title: "Edit Room", message: e, roomid: m })
  }
});

// implements updation on room details
router.post('/updateroom', async (req, res) => {
  try {
    var userobj = await userFunctions.getUserByEmail(req.session.uMail);
    var uid = userobj._id;
    let rid = req.session.roomid;
    let title = req.body.title;
    let des = req.body.description;
    let limit = parseInt(req.body.limit);
    let x = await roomFunctions.editRoom(rid, uid, title, des, limit);
    if (x == true) {
      res.render('editroom', { message: "Room updated Successfully ! ", roomid: rid });
    }
    else {
      res.render('editroom', { message: "Room could not be updated! " });
    }

  } catch (e) {
    res.render('error', { title: "error", message: e })
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
    var listOnline = await roomFunctions.getonlineusers(m);
    var userObj = await userFunctions.getUserByEmail(req.session.uMail);
    var roomsList = userObj.roomList;
    for (let i = 0; i < roomsList.length; i++) {
      var rm = await roomFunctions.getRoom(roomsList[i].roomId)
      roomsList[i].roomName = rm.roomTitle;
    }

    res.render('chatbox', {
      title: roomObj.roomTitle,
      usermail: req.session.uMail, // for socket.io
      roomsList: roomsList,
      roomId: m,
      history: roomObj.chat,
      listOnline: listOnline,
      invitecode: roomObj.inviteCode,
      desc: roomObj.roomDesc
    });
  } catch (e) {
    console.log(e)
    res.status(400).render('error', { title: "error", message: e });
  }
});

module.exports = router;