const user = require('./data/user');
const room = require('./data/room');


async function seedmain(){
//add users
    try{
        var newUser = await user.createUser('Michael','Scott','ms@dundermifflin.com','pewdiepie');
        var newUser1 = await user.createUser('Dright','Schrute','ds@dundermifflin.com','pewdiepie1');
        var newUser2 = await user.createUser('Jim','Halpert','jh@dundermifflin.com','pewdiepie2');
        var newUser3 = await user.createUser('Pam','Beesly','pb@dundermifflin.com','pewdiepie2');
        var newUser4 = await user.createUser('Kevin','Malone','km@dundermifflin.com','pewdiepie3');
        var newUser5 = await user.createUser('Andy','Bernard','ab@dundermifflin.com','pewdiepie3');
        var newUser6 = await user.createUser('Erin','Hanron','eh@dundermifflin.com','pewdiepie3');
        var newUser7 = await user.createUser('Toby','Flenderson','tf@dundermifflin.com','pewdiepie3');
        var newUser8 = await user.createUser('Angela','Martin','am@dundermifflin.com','pewdiepie3');
        var newUser9 = await user.createUser('Ryan','Howard','rh@dundermifflin.com','pewdiepie3');
        var newUser10 = await user.createUser('Creed','Bratton','cb@dundermifflin.com','pewdiepie3');
        var newUser11 = await user.createUser('Darryl','Philbin','dp@dundermifflin.com','pewdiepie3');
        var newUser12 = await user.createUser('Stanley','Hudson','sh@dundermifflin.com','pewdiepie3');
        var newUser13 = await user.createUser('Kelly','Kapoor','kk@dundermifflin.com','pewdiepie3');
        var newUser14 = await user.createUser('Meredith','Palmer','mp@dundermifflin.com','pewdiepie3');
        var newUser15 = await user.createUser('Oscar','Martinez','om@dundermifflin.com','pewdiepie3');
        var newUser16 = await user.createUser('Phylis','Vance','pv@dundermifflin.com','pewdiepie3');
        var newUser17 = await user.createUser('Roy','Anderson','ra@dundermifflin.com','pewdiepie3');

        var mic = await user.getUserByEmail('ms@dundermifflin.com');
        var dw = await user.getUserByEmail('ds@dundermifflin.com');
        var newRoom = await room.createRoom("Dunder Mifflin","All employees of DM Scranton",mic._id,30);
        var roomss = await user.roomList('ms@dundermifflin.com');
        var adduse = await room.addUser(dw._id,newRoom);
        // add dw to the room
        


        // send messages
        // upvote/downvote
        
        var dlogin = await user.userLogin('ds@dundermifflin.com','pewdiepie1');
        var mlogin = await user.userLogin('ms@dundermifflin.com','pewdiepie');
        var dw = await user.getUserByEmail('ds@dundermifflin.com');
        var mic = await user.getUserByEmail('ms@dundermifflin.com');
        var send = await room.sendMessage(mic._id,mic.roomList[0].roomId,"I'm the best manager there is!!");
        var send2 = await room.sendMessage(dw._id,dw.roomList[0].roomId,"That's right Michael!!");

        var quit = await user.userLogout('ms@dundermifflin.com');
        var quit2 = await user.userLogout('ds@dundermifflin.com');
        
    }catch (e){
        console.log(e);
    }




}


async function trialMain(){
    //create room
    try{



 
    }catch(e){
        console.log(e);
    }

}


seedmain();
//trialMain();
