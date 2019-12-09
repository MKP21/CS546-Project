const express = require('express');
const router = express.Router();
const data = require('../data');

// when user selects a room, this page will be rendered, it has the chat
router.get('/:id', async (req, res) => {
  try {
    // open chat
    // get chat history
    // get user room list from req.session.uMail
    // get list of online users
      res.render('chatbox')
  } catch (e) {
    console.log(e)
    res.status(400).render('error',{title:"error",post:e});
  }
});

module.exports = router;