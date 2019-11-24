const user = require('./data/user');
const room = require('./data/room');


// async function usermain(){
// //add users
//     try{
//         var newUser = await user.createUser('Michael','Scott','ms@dundermifflin.com','pewdiepie','Teacher');
//         var newUser1 = await user.createUser('Dright','Schrute','ds@dundermifflin.com','pewdiepie1','Student');
//         var newUser2 = await user.createUser('Jim','Halpert','jh@dundermifflin.com','pewdiepie2','Student');
//         var newUser3 = await user.createUser('Pam','Beesly','pb@dundermifflin.com','pewdiepie2','Student');
//         var newUser4 = await user.createUser('Kevin','Malone','km@dundermifflin.com','pewdiepie3','Student');
//         var newUser5 = await user.createUser('Andy','Bernard','ab@dundermifflin.com','pewdiepie3','Student');
//         var newUser6 = await user.createUser('Erin','Hanron','eh@dundermifflin.com','pewdiepie3','Student');
//         var newUser7 = await user.createUser('Toby','Flenderson','tf@dundermifflin.com','pewdiepie3','Student');
//         var newUser8 = await user.createUser('Angela','Martin','am@dundermifflin.com','pewdiepie3','Student');
//         var newUser9 = await user.createUser('Ryan','Howard','rh@dundermifflin.com','pewdiepie3','Student');
//         var newUser10 = await user.createUser('Creed','Bratton','cb@dundermifflin.com','pewdiepie3','Student');
//         var newUser11 = await user.createUser('Darryl','Philbin','dp@dundermifflin.com','pewdiepie3','Student');
//         var newUser12 = await user.createUser('Stanley','Hudson','sh@dundermifflin.com','pewdiepie3','Student');
//         var newUser13 = await user.createUser('Kelly','Kapoor','kk@dundermifflin.com','pewdiepie3','Student');
//         var newUser14 = await user.createUser('Meredith','Palmer','mp@dundermifflin.com','pewdiepie3','Student');
//         var newUser15 = await user.createUser('Oscar','Martinez','om@dundermifflin.com','pewdiepie3','Student');
//         var newUser16 = await user.createUser('Phylis','Vance','pv@dundermifflin.com','pewdiepie3','Student');
//         var newUser17 = await user.createUser('Roy','Anderson','ra@dundermifflin.com','pewdiepie3','Student');
        
//     }catch (e){
//         console.log(e);
//     }

// //// get user by email and id
//     try{
//         var newUser = await user.getUserByEmail('ms@dundermifflin.com');
//         console.log(newUser);
//         console.log(newUser._id + "");        

//         var newUserbyId = await user.getUser(newUser._id);
//     }catch (e){
//         console.log(e);
//     }

// //// delete user
//     try{
//         var toBeDeleted = await user.getUserByEmail('ra@dundermifflin.com');
//         console.log(toBeDeleted);

//         var deleted = await user.deleteUser(toBeDeleted._id);
//     }catch (e){
//         console.log(e);
//     }

// //// change password
//     try{
//         var edituser = await user.getUserByEmail('jh@dundermifflin.com');

//         var updatedPassword = await user.changepassword(edituser._id,'pewdiepie2','pewdiepie1');
//         console.log(updatedPassword);
//     }catch(e){
//         console.log(e);
//     }

// //// login & logout
//     try{
//         var edituser = await user.userLogin('ms@dundermifflin.com','pewdiepie');
//         var dituser = await user.userLogin('jh@dundermifflin.com','pewdiepie1');
//         var ituser = await user.userLogin('ds@dundermifflin.com','pewdiepie1');
//         // var updatedPassword = await user.changepassword(edituser._id,'pewdiepie2','pewdiepie1');
//         console.log(dituser);

//         //var loggedOut = await user.userLogout('jh@dundermifflin.com');
//     }catch(e){
//         console.log(e);
//     }



// }


async function roomMain(){
    //create room
    try{
        var creator = await user.getUserByEmail('ms@dundermifflin.com');
    }catch(e){
        console.log(e);
    }

    try{
        var newRoom = await room.createRoom("Dunder Mifflin","All employees of DM Scranton",creator._id,30);
    }catch(e){
        console.log(e);
    }
    

}


//usermain();
roomMain();