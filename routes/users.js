/*
User main routes:
Create user
Read user
Update user
Delete user
-
Validate user
Follow user
Unfollow user

*/

// Models
const User = require('../models/user.model');
const Post = require('../models/post.model');

// Middleware
const router = require('express').Router();
const mongoose = require('mongoose');

// Auth
const auth = require('../middleware/auth');
const { loginValidation, registerValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Form Data
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


// -> Create User (X)
router.post('/register', upload.single('file'), async (req,res) =>{

  console.log(req.file);
  //VALIDATE THE DATA BEFORE ADDING USER
  const { error } = await registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  

  //CHECK IF DUPLICATE EMAIL
  User.findOne({username:req.body.username})
  .then(username=>{if(username)res.status(400).send('User exists')})

  //STORE REQUIRED VALUES
  const username = req.body.username;
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(req.body.password, salt);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const isVisible = req.body.isVisible;

  //OPTIONAL VALUES
  const description = req.body.description ? req.body.description : "";
  const followers = { id: new mongoose.Types.ObjectId() };
  const followings = { id: new mongoose.Types.ObjectId() };
  const image = req.file.path;
  

  const newUser = new User({
    firstname,
    lastname,
    email,
    username,
    description,
    image,
    passHash,
    isVisible,
    followers,
    followings
  });

  newUser.save()
  .then(newUser => {
    res.json(newUser);
    console.log("Submitted user success: " + newUser)
  })
  .catch(err => {
    res.status(400).json("Error registering: " + err);
    console.log("Error registering: " + err);
  });

});

// -> Read user (X) | All users, for testing
router.route('/getUsers').get((req,res) => {

  User.find()
  .populate('followers.followers')
  .populate('followings.followings')
  .then((user) => res.json(user))
  .catch(err => res.status(400).json("Error getting all users: " + err));
});

// -> Read user (X) | One User by user.username
router.route('/profile/username/:username').get((req,res) =>{
  
  User.findOne({username: req.params.username})
  .populate('followers.followers')
  .populate('followings.followings')
  .then((user) => res.json(user))
  .catch(err => res.status(400).json("Error: " + err));
  
});

// -> Validate user (X) | Login, return token
router.post('/login', async (req,res)=>{
  //VALIDATE THE DATA BEFORE ADDING USER
  const { error } = await loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

 //CHECK IF DUPLICATE EMAIL
 const user = await User.findOne({username:req.body.username})
 if (!user) return res.status(400).send('User not found');
 
 //VALIDATE PASSWORD
 const validPass = await bcrypt.compare(req.body.password, user.passHash);
 if(!validPass) return res.status(400).send('Invalid password');

 //CREATE & ASSIGN TOKEN
 const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

 User.findOne({username:req.body.username})
 .then(user => {
   res.header('auth-token', token).send({
     token,
     isAuthenticated:true,
     user
   });
 })
 .catch(err => res.status(400).json("Error finding user from login: " + err));
});

// -> Validate user (X) | One User by user.email
router.get('/checkEmail/:email', async (req,res)=>{
  User.findOne({email:req.params.email})
  .then(users =>{
    if(users){res.send({
      isEmailValid: false,
      emailValidMessage:'Email already registered'
    })}
    else{res.send({
      isEmailValid:true,
      emailValidMessage:null
    })}
  })
  .catch(err => res.status(400).json("Error checking for email: " + err));
});

// -> Validate user (X) | One User by user.username
router.get('/checkUsername/:username', async (req,res)=>{
  User.findOne({username:req.params.username})
  .then(users =>{
    if(users){res.send({
      isUsernameValid: false,
      usernameValidMessage:'Username already registered'
    })}
    else{res.send({
      isUsernameValid:true,
      usernameValidMessage:null
    })}
  })
  .catch(err => res.status(400).json("Error checking for username: " + err));
});

// -> Validate user (X) | Check if logged in user equals this user or not
router.route('/profile/:id').get((req,res) =>{
  if(req.body.activeUserId === req.params.id){
    User.findById(req.params.id)
    .populate('followers.followers')
    .populate('followings.followings')
    .then((user) => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
  }
  else {
    // If does not match hide email and password
    User.findById(req.params.id)
    .select('-email -passHash')
    .populate('followers.followers')
    .populate('followings.followings')
    .then((user) => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
  }
});

// -> Update User including their Image
router.post('/updateWithImage/:id', upload.single('file'), (req,res) =>{

  console.log(req.file);

  User.findByIdAndUpdate(req.params.id)
  .then((user) =>{

    if(req.body.username)user.username = req.body.username;
    if(req.file.path)user.image = req.file.path;
    if(req.body.password)user.passHash = bcrypt.hashSync(req.body.password,10);
    if(req.body.firstname)user.firstname = req.body.firstname;
    if(req.body.lastname)user.lastname = req.body.lastname;
    if(req.body.email)user.email = req.body.email;
    if(req.body.isVisible)user.isVisible = req.body.isVisible;
    if(req.body.description)user.description = req.body.description;
    
    user.save()
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error: ' + err));

  })
  .catch(err=>res.status(400).json('Error: ' + err));
  
});

// -> Update User without their Image
router.post('/updateNoImage/:id', (req,res) =>{

  User.findByIdAndUpdate(req.params.id)
  .then((user) =>{

    if(req.body.username)user.username = req.body.username;
    if(req.body.password)user.passHash = bcrypt.hashSync(req.body.password,10);
    if(req.body.firstname)user.firstname = req.body.firstname;
    if(req.body.lastname)user.lastname = req.body.lastname;
    if(req.body.email)user.email = req.body.email;
    if(req.body.isVisible)user.isVisible = req.body.isVisible;
    if(req.body.description)user.description = req.body.description;
    
    user.save()
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error: ' + err));

  })
  .catch(err=>res.status(400).json('Error: ' + err));
  
});

/*
FOLLOW USER (X)
2 parts:
activeUserId = person logged in
targetUserId = person to follow/unfollow
> activeUserId adds activeUserId to targetUserId array of user.followers
> activeUserId adds targetUserId to activeUserId array of user.followings
*/

router.route('/addFollower/:id').post((req,res) =>{
  
  //Check if activeUser is the targetUser
  if(req.body.activeUserId === req.params.id){
    return res.json('You are the user'); 
  }
  else {

    //Check if activeUser already following targetUser
    User.findById(req.params.id)
    .then(user =>{
      let followList = (user.followers.followers).includes(req.body.activeUserId);
      if(followList === false){

        //Add activeUser to targetUser followers
        User.findByIdAndUpdate(req.params.id)
        .then(user =>{
          user.followers.followers = [...user.followers.followers,req.body.activeUserId];
          user.save()
          .then(()=>{

            //Add targetUser to activeUser followers
            User.findByIdAndUpdate(req.body.activeUserId)
            .then(user =>{
              user.followings.followings = [...user.followings.followings,req.params.id];
              user.save()
              .then(res.json(true))
              .catch(err=>res.status(400).json('Error adding target user to active user followings: ' + err));

            })
            .catch(err=>res.status(400).json('Error finding active user: ' + err));

          })
          .catch(err=>res.status(400).json('Error adding active user to target user followers: ' + err));

        })
        .catch(err=>res.status(400).json('Error finding target user: ' + err));

      } 
      else {
        res.json('Already following ' + user.username);
      }
    })
    .catch(err=>res.status(400).json('Error checking if active user is following target user: ' + err));

  }
});

/* 
UNFOLLOW USER (X)
2 parts:
thisUser = person logged in
targetUser = person to follow/unfollow
> thisUser removes thisUser to targetUser array of user.followers
> thisUser removes targetUser to thisUser array of user.followings
*/
router.route('/removeFollower/:id').post((req,res) =>{

  //Check if activeUser is the targetUser
  if(req.body.activeUserId === req.params.id){
    return res.json('You are the user'); 
  }
  else { 
  //Check if activeUser NOT following targetUser
  User.findById(req.params.id)
  .then(user =>{
    let followList = user.followers.followers;
    if(followList.includes(req.body.activeUserId)){
      
      //Remove activeUser from targetUser followers
      User.findByIdAndUpdate(req.params.id)
      .then(user =>{

        //Get position of activeUser in targetUser followings
        let activeUserIdPosition = user.followers.followers.indexOf(req.body.activeUserId);
        user.followers.followers.splice(activeUserIdPosition, 1);
        user.save()
        .then(()=>{

          //Remove targetUser from activeUser followers
          User.findByIdAndUpdate(req.body.activeUserId)
          .then(user =>{
            let targetPosition = user.followers.followers.indexOf(req.params.id);
            user.followings.followings.splice(targetPosition, 1);
            user.save()
            .then(res.json(false))
            .catch(err=>res.status(400).json('Error removing target user from active user followings: ' + err));

          })
          .catch(err=>res.status(400).json('Error removing target user from active user followings: ' + err));

        })
        .catch(err=>res.status(400).json('Error removing active user from target user followers: ' + err));

      })
      .catch(err=>res.status(400).json('Error finding target user: ' + err));

    }
    else {
      res.json('Not following ' + user.username);
    }
  })
  .catch(err=>res.status(400).json('Error checking if active user is following target user: ' + err));

  }

});

module.exports = router;