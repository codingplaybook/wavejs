// drop all db collections

// insert dummy data

/* 
username
password (hash it out)
firstname
lastname
email
isVisible
header
image
*/

const User = require('../models/user.model');
const Post = require('../models/post.model');
const SavedDate = require('../models/savedDate.model');

// Middleware
const router = require('express').Router();
const mongoose = require('mongoose');

// Auth
const auth = require('../middleware/auth');
const { loginValidation, registerValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var arr = [
  {
    username: 'jimbojones',
    passHash:'jim',
    firstname:'jim',
    lastname:'jones',
    email:'jimbojones@testmail.com',
    isVisibile:true,
    header:'Lorem ipsum I have a header that doesn\'\t mean anything lol'
  },
  {
    username: 'loreyharvey',
    passHash:'jim',
    firstname:'lorey',
    lastname:'harvet',
    email:'loreyharvey@testmail.com',
    isVisibile:true,
    header:'Lorem ipsum I have a header that doesn\'\t mean anything lol'
  },
  {
    username: 'arnoldpalmer',
    passHash:'jim',
    firstname:'arnold',
    lastname:'palmer',
    email:'arnoldpalmer@testmail.com',
    isVisibile:true,
    header:'Lorem ipsum I have a header that doesn\'\t mean anything lol'
  },
  {
    username: 'kellyjohnson',
    passHash:'jim',
    firstname:'kelly',
    lastname:'johnson',
    email:'kellyjohnson@testmail.com',
    isVisibile:true,
    header:'Lorem ipsum I have a header that doesn\'\t mean anything lol'
  },
  {
    username: 'jenniferlopez',
    passHash:'jim',
    firstname:'jennifer',
    lastname:'lopez',
    email:'jenniferlopez@testmail.com',
    isVisibile:true,
    header:'Lorem ipsum I have a header that doesn\'\t mean anything lol'
  },
  {
    username: 'richard',
    passHash:'jim',
    firstname:'richard',
    lastname:'sanchez',
    email:'richardsanchez@testmail.com',
    isVisibile:true,
    header:'Lorem ipsum I have a header that doesn\'\t mean anything lol'
  }
];


/* 
Only if 2 days after last upload
1 - Clear uploads folder
2 - Clear Atlas db
3 - create array for users
4 - create array for posts
5 - upload users [defaults/users] // push to users array
6 - add followers to users
7 - upload posts for users [defaults/posts] // push to posts array
8 - add likes & comments to posts
*/

const usersArr = [];
const postsArr = [];

function updateFollowers(){
  //5 Users total

  //User 1
  User.findByIdAndUpdate(usersArr[0][0]._id)
  .then(user=>{
    user.followers.followers = [...user.followers.followers,usersArr[0][1]._id,usersArr[0][2]._id,usersArr[0][3]._id];
    user.followings.followings = [...user.followings.followings,usersArr[0][1]._id,usersArr[0][3]._id,usersArr[0][4]._id];
    user.save();
  })
  .then(()=>{
    //User 2
    User.findByIdAndUpdate(usersArr[0][1]._id)
    .then(user=>{
      user.followers.followers = [...user.followers.followers,usersArr[0][0]._id,usersArr[0][4]._id];
      user.followings.followings = [...user.followings.followings,usersArr[0][0]._id,usersArr[0][2]._id,usersArr[0][4]._id];
      user.save();
    })
    .then(()=>{
      //User 3
      User.findByIdAndUpdate(usersArr[0][2]._id)
      .then(user=>{
        user.followers.followers = [...user.followers.followers,usersArr[0][1]._id,usersArr[0][3]._id,usersArr[0][4]._id];
        user.followings.followings = [...user.followings.followings,usersArr[0][0]._id,usersArr[0][3]._id];
        user.save();
      })
      .then(()=>{
        //User 4
        User.findByIdAndUpdate(usersArr[0][3]._id)
        .then(user=>{
          user.followers.followers = [...user.followers.followers,usersArr[0][0]._id,usersArr[0][2]._id];
          user.followings.followings = [...user.followings.followings,usersArr[0][0]._id,usersArr[0][2]._id,usersArr[0][4]._id];
          user.save();
        })
        .then(()=>{
          //User 5
          User.findByIdAndUpdate(usersArr[0][4]._id)
          .then(user=>{
            user.followers.followers = [...user.followers.followers,usersArr[0][0]._id,usersArr[0][1]._id,usersArr[0][3]._id];
            user.followings.followings = [...user.followings.followings,usersArr[0][1]._id,usersArr[0][2]._id];
            user.save();
          })
          .then(()=>{
            User.find()
            .populate('followers')
            .populate('followings')
            .then((user) => console.log(user))
            .catch(err => res.status(400).json("Error getting all users: " + err));
          })
          .catch(err=>console.log('Error on 5th user: ' + err)); 
        })
        .catch(err=>console.log('Error on 4th user: ' + err)); 
      })
      .catch(err=>console.log('Error on 3rd user: ' + err)); 
    })
    .catch(err=>console.log('Error on 2nd user: ' + err));
  })
  .catch(err=>console.log('Error on 1st user: ' + err));

}

/*function pushComments(){
  console.log(usersArr);
  console.log(postsArr);
}

function pushLikes(){
  
}*/

function pushPosts(){

  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function randomDate(){
    // get a date between 3 months ago and today
    const threeMonths = 7.776*(10**9);
    const todayIs = Date.now();
    return Math.floor(Math.random() * (todayIs - threeMonths)) + threeMonths;
  }
  
  Post.insertMany([
    {
      //0
      description:'Hey so here is a picture! I think it is a mountain',
      type:'image',
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592759908/p-horz-forest_jqhvuz.jpg',
      createdDate:Date.now(),
      link:makeid(10),
      userId:usersArr[0][4]._id,
      likes:{ 
        id: new mongoose.Types.ObjectId(), 
        likes: [
          {
            time:Date.now(),
            userId:usersArr[0][1]._id
          },
          {
            time:Date.now(),
            userId:usersArr[0][2]._id
          },
          {
            time:Date.now(),
            userId:usersArr[0][3]._id
          }
        ] 
      },
      comments:{ 
        id: new mongoose.Types.ObjectId(),
        comments: [
          {
            time:Date.now(),
            userId:usersArr[0][1],
            description:'You’re wonderful.'
          }
        ] 
      }
    },
    {
      //1
      description:'Kodak moment. Please do not copyright this.',
      type:'image',
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592759907/p-vert-camera_kparqh.jpg',
      createdDate:Date.now(),
      link:makeid(10),
      userId:usersArr[0][2]._id,
      likes:{ 
        id: new mongoose.Types.ObjectId(),
        likes: [
          {
            time:Date.now(),
            userId:usersArr[0][0]
          },
          {
            time:Date.now(),
            userId:usersArr[0][1]
          },
          {
            time:Date.now(),
            userId:usersArr[0][3]
          }
        ] 
      },
      comments:{ 
        id: new mongoose.Types.ObjectId(),
        comments: [
          {
            time:Date.now(),
            userId:usersArr[0][3],
            description:'You’re a candle in the darkness.'
          },
          {
            time:Date.now(),
            userId:usersArr[0][4],
            description:'Who raised you? They deserve a medal for a job well done.'
          }
        ]
      }
    },
    {
      //2
      description:'Some important text that you can think over',
      type:'text',
      image:null,
      createdDate:Date.now(),
      link:makeid(10),
      userId:usersArr[0][0]._id,
      likes:{ 
        id: new mongoose.Types.ObjectId(),
        likes: [
          {
            time:Date.now(),
            userId:usersArr[0][4]
          }
        ] 
      },
      comments:{ 
        id: new mongoose.Types.ObjectId(),
        comments: [
          {
            time:Date.now(),
            userId:usersArr[0][0],
            description:'You are awesome!'
          },
          {
            time:Date.now(),
            userId:usersArr[0][1],
            description:'You are strong.'
          },
          {
            time:Date.now(),
            userId:usersArr[0][2],
            description:'Our community is better because you are in it.'
          },
          {
            time:Date.now(),
            userId:usersArr[0][4],
            description:'Love this!'
          }
        ]
      }
    },
    {
      //3
      description:'Prestige Worlwide. That is all',
      type:'image',
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592759909/p-horz-mountain_acu26j.jpg',
      createdDate:Date.now(),
      link:makeid(10),
      userId:usersArr[0][0]._id,
      likes:{ 
        id: new mongoose.Types.ObjectId(),
        likes: [
          {
            time:Date.now(),
            userId:usersArr[0][2]
          },
          {
            time:Date.now(),
            userId:usersArr[0][4]
          },
        ]
      },
      comments:{ 
        id: new mongoose.Types.ObjectId(),
        comments: [
          {
            time:Date.now(),
            userId:usersArr[0][2],
            description:'Amazing!'
          },
          {
            time:Date.now(),
            userId:usersArr[0][4],
            description:'Just a fantastic photo!'
          }
        ]
      }
    },
    {
      //4
      description:'Lorem Bacon Ipsum and other filler text',
      type:'text',
      image:null,
      createdDate:Date.now(),
      link:makeid(10),
      userId:usersArr[0][3]._id,
      likes:{ 
        id: new mongoose.Types.ObjectId(),
        likes: [
          {
            time:Date.now(),
            userId:usersArr[0][4]
          }
        ] 
      },
      comments:{ 
        id: new mongoose.Types.ObjectId(),
        comments: [
          {
            time:Date.now(),
            userId:usersArr[0][0],
            description:'This is great!'
          },
          {
            time:Date.now(),
            userId:usersArr[0][1],
            description:'We are going back next year'
          },
          {
            time:Date.now(),
            userId:usersArr[0][2],
            description:'Just a fantastic photo!'
          },
          {
            time:Date.now(),
            userId:usersArr[0][4],
            description:'Amazing!'
          }
        ]
      }
    },
    {
      //5
      description:'The party wont stop, will never stop',
      type:'text',
      image:null,
      createdDate:Date.now(),
      link:makeid(10),
      userId:usersArr[0][1]._id,
      likes:{ 
        id: new mongoose.Types.ObjectId(), 
        likes: [
          {
            time:Date.now(),
            userId:usersArr[0][3]
          },
          {
            time:Date.now(),
            userId:usersArr[0][4]
          }
        ]
      },
      comments:{ 
        id: new mongoose.Types.ObjectId(),
        comments: [
          {
            time:Date.now(),
            userId:usersArr[0][0],
            description:'Amazing!'
          },
          {
            time:Date.now(),
            userId:usersArr[0][1],
            description:'Amazing!'
          },
          {
            time:Date.now(),
            userId:usersArr[0][3],
            description:'You’re a candle in the darkness.'
          }
        ] 
      }
    },
    {
      //6
      description:'Have a seat every once in a while',
      type:'image',
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592759907/p-vert-chair_bkzczl.jpg',
      createdDate:Date.now(),
      link:makeid(10),
      userId:usersArr[0][0]._id,
      likes:{ 
        id: new mongoose.Types.ObjectId(),
        likes: [
          {
            time:Date.now(),
            userId:usersArr[0][1]
          }
        ] 
      },
      comments:{ 
        id: new mongoose.Types.ObjectId(),
        comments: [
          {
            time:Date.now(),
            userId:usersArr[0][1],
            description:'Beautiful'
          },
          {
            time:Date.now(),
            userId:usersArr[0][2],
            description:'I Love it!'
          },
          {
            time:Date.now(),
            userId:usersArr[0][3],
            description:'You’re a candle in the darkness.'
          }
        ]
      }
    }
  ])
  .then(posts=>postsArr.push(posts))
  .then(()=>updateFollowers())
  .catch(err=>console.log('Error adding users: ' + err));
}

async function pushUsers(){

  User.insertMany([
    {
      firstname:'jim', 
      lastname:'jones', 
      email:'jimbojones@testmail.com', 
      username:'jimbojones9891', 
      description:'Lorem ipsum I have a header that doesn\'\t mean anything lol', 
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592759898/man1_vm68ug.jpg', 
      passHash:bcrypt.hashSync('9891jimbojones',10), 
      isVisible:true, 
      followers:{ id: new mongoose.Types.ObjectId() }, 
      followings:{ id: new mongoose.Types.ObjectId() } 
    },
    {
      firstname:'lorey', 
      lastname:'harvey', 
      email:'loreyharvey@testmail.com', 
      username:'loreyharvey345', 
      description:'Dunder Miflin Dover branch', 
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592759897/woman1_uaahow.jpg', 
      passHash:bcrypt.hashSync('345loreyharvey',10), 
      isVisible:true, 
      followers:{ id: new mongoose.Types.ObjectId() }, 
      followings:{ id: new mongoose.Types.ObjectId() } 
    },
    {
      firstname:'richard', 
      lastname:'sanchez', 
      email:'richardsanchez@testmail.com', 
      username:'ricksanchez024', 
      description:'*Mic Drop*', 
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592759898/man2_bczz6j.jpg', 
      passHash:bcrypt.hashSync('024ricksanchez',10), 
      isVisible:true, 
      followers:{ id: new mongoose.Types.ObjectId() }, 
      followings:{ id: new mongoose.Types.ObjectId() } 
    },
    {
      firstname:'kelly', 
      lastname:'johnson', 
      email:'kellyjohnson@testmail.com', 
      username:'kellyjohnson156', 
      description:'Buy it fuse break it fix trash it', 
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592759898/woman2_xuuqia.jpg', 
      passHash:bcrypt.hashSync('156kellyjohnson',10), 
      isVisible:true, 
      followers:{ id: new mongoose.Types.ObjectId() }, 
      followings:{ id: new mongoose.Types.ObjectId() } 
    },
    {
      firstname:'jennifer', 
      lastname:'lopez', 
      email:'jenniferlopez@testmail.com', 
      username:'jenniferlopez727', 
      description:'Do not be fooled by the jewelry that I own', 
      image:'https://res.cloudinary.com/dzaepha4e/image/upload/v1592767916/woman3_yg3gpk.jpg', 
      passHash:bcrypt.hashSync('727jenniferlopez',10), 
      isVisible:true, 
      followers:{ id: new mongoose.Types.ObjectId() }, 
      followings:{ id: new mongoose.Types.ObjectId() } 
    }
  ])
  .then(users=>usersArr.push(users))
  .then(()=>pushPosts())
  .catch(err=>console.log('Error adding users: ' + err));
}

function clearDb() {
  User.deleteMany({})
  .then(users=>console.log('Here are the users: ' + users))
  .then(()=>{
    Post.deleteMany({})
    .then(posts=>console.log('Here are the posts: ' + posts))
    .then(()=>pushUsers())
    .catch(()=>console.log('Error removing posts: ' + users));
  })
  .catch(err=>console.log('Error removing users: ' + err));
}

exports.checkDate = function () {
  SavedDate.findOneAndUpdate()
  .then(date => {
    const currentDate = Date.now();
    const dateGap = 8.64*(10**7);
    const dateDiff = currentDate - date.savedDate; 
    if(dateDiff > dateGap) {
      date.savedDate = Date.now();
      date.save()
      .then(date=>{
        console.log('New date saved: ' + date.savedDate);
        clearDb();
      })
      .catch(err=>console.log('Error saving new date: ' + err));
    } else { console.log(currentDate + ' ' + date.savedDate + ' ' + dateGap + ' ' + dateDiff)}
  })
  .catch(err=>console.log('Error getting date: ' + err));
}