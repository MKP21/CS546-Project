const express = require('express');
const router = express.Router();
const roomFunctions=require('../data/room');
const userFunctions=require('../data/user');

// this will render user's homepage
router.get('/', async (req, res) => {
    try {
        // get user's date by email present in req.session.uMail
        var userObj = await userFunctions.getUserByEmail(req.session.uMail);

        // get room list
        var roomsList = userObj.roomList;

        // add roomnames to roomList
        for(let i=0;i<roomsList.length;i++){
          //console.log(roomsList[i]);
          //var m = roomsList[i].roomId;
          
          var rm = await roomFunctions.getRoom(roomsList[i].roomId)
          roomsList[i].roomName = rm.roomTitle;
        }
        // render home page with the roomlist and user object to personalize the handlebar      
        res.render('homepage',{title:"Dashboard",roomsList:roomsList})
    } catch (e) {
      console.log(e)
      res.status(400).render('error',{title:"error",post:e});
    }
});

// this will go to edit user details



module.exports = router;