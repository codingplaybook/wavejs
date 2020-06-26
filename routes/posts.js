/*
Post main routes:
Create post
Read post
Update post
Delete post
-
Like post
Comment post

*/

//Models
const Post = require('../models/post.model');
const User = require('../models/user.model');

// Middleware
const router = require('express').Router();
const mongoose = require('mongoose');

// -> Create TEXT POST (X)
router.post('/newTextPost', (req, res) =>{

  const description = req.body.description ? req.body.description : '';
  const type = 'text';
  const image = null;
  const createdDate = Date.now();
  const userId = req.body.userId;
  const likes = { id: new mongoose.Types.ObjectId() };
  const comments = { id: new mongoose.Types.ObjectId() };

  //generate random link for post
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const link = makeid(10);

  const newPost = new Post ({
    description,
    type,
    image,
    createdDate,
    link,
    userId,
    likes,
    comments
  })

  newPost.save()
  .then((post)=>{
    res.json(post);
    console.log(post);
  })
  .catch(err=>res.status(400).json('Error creating new post: ' + err));
});

// -> Create IMAGE POST (X)
router.post('/newImagePost', (req, res) =>{

  const description = req.body.description ? req.body.description : '';
  const type = req.body.type;
  const image = req.body.type === 'image' ? req.body.image : null;
  const createdDate = Date.now();
  const userId = req.body.userId;
  const likes = { id: new mongoose.Types.ObjectId() };
  const comments = { id: new mongoose.Types.ObjectId() };

  //generate random link for post
  //need to find a way to index for future???
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  const link = makeid(10);

  const newPost = new Post ({
    description,
    type,
    image,
    createdDate,
    link,
    userId,
    likes,
    comments
  });

  //Save to MongoDB databse
  newPost.save()
  .then(post=>res.json(post))
  .catch(err=>res.status(400).json('Error creating new post: ' + err));
});


// -> Read ALL POSTS (X) | ALL
router.route('/').get((req,res) =>{

  Post.find()
  .populate('userId')
  .populate('comments')
  .populate('likes')
  .populate('likes.userId')
  .sort({ createdDate: -1 })
  .then(post=>res.json(post))
  .catch(err => res.status(400).json('Error: ' + err));

});

// -> Read All Posts (X) | Per post.userId
router.route('/getAllPosts/:userId').get((req,res) =>{

  Post.find({userId:req.params.userId})
  .populate('userId')
  .populate('comments')
  .populate('likes')
  .sort({ createdDate: -1 })
  .then(post=> res.json(post))
  .catch(err => res.status(400).json('Error: ' + err));

});

// -> Read All Photo Posts (X) | Per post.userId
router.route('/getPhotoPosts/:userId').get((req,res) =>{

  Post.find({type:'image', userId:req.params.userId})
  .populate('userId')
  .populate('comments')
  .populate('likes')
  .sort({ createdDate: -1 })
  .then(post=> res.json(post))
  .catch(err => res.status(400).json('Error: ' + err));

});

// -> Read All Text Posts (X) | Per post.userId
router.route('/getTextPosts/:userId').get((req,res) =>{

  Post.find({type:'text', userId:req.params.userId})
  .populate('userId')
  .populate('comments')
  .populate('likes')
  .sort({ createdDate: -1 })
  .then(post=> res.json(post))
  .catch(err => res.status(400).json('Error: ' + err));

});

// -> Read Single Post (X) | Per post.id
router.route('/find/:id').get((req,res) =>{

  Post.findById(req.params.id)
  .populate('userId')
  .populate('comments.comments.userId')
  .populate('likes.likes.userId')
  .sort({ createdDate: -1 })
  .then(post=>res.json(post))
  .catch(err => res.status(400).json('Error: ' + err));

});

// -> Read Single Post (X) | Per post.link
router.route('/findLink/:link').get((req,res)=>{

  Post.findOne({link:req.params.link})
  .populate('userId')
  .populate('comments.comments.userId')
  .populate('likes.likes.userId')
  .sort({ createdDate: -1 })
  .then(post=>res.json(post))
  .catch(err => res.status(400).json('Error: ' + err));
  
});

// -> Read All Posts (X) | Per user.username >> post.userId
router.route('/findUserPosts/:username').get((req,res)=>{

  User.findOne({username: req.params.username})
  .then(user => {
    Post.find({userId:user._id})
    .populate('userId')
    .populate('comments')
    .populate('likes')
    .sort({ createdDate: -1 })
    .then(post=>res.json(post))
    .catch(err => res.status(400).json('Error fetching posts: ' + err));
  })
  .catch(err => 'Error fetching user: ' + err);
  
});

// -> Update Image Post (!!!) | Per post.id
// !!!NEED TO REINCLUDE IMAGE IF UPDATING!!!
/*
router.post('/editImagePost/:id', upload.single('file'), (req,res) =>{

  Post.findByIdAndUpdate(req.params.id)
  .then(post => {

    if(req.body.description)post.description = req.body.description;
    if(req.body.type)post.type = req.body.type;
    if(req.file.path)post.image = (post.type === 'image' ? req.file.path : null);

    post.save()
    .then(()=>res.json('Post Updated!'))
    .catch(err=>res.status(400).json('Error editing post: ' + err));
  })
  .catch(err=>res.status(400).json('Error finding post to edit: ' + err));

});
*/

// -> Update Text Post (X) | Per post.id
router.post('/editTextPost/:id', (req,res) =>{

  Post.findByIdAndUpdate(req.params.id)
  .then(post => {

    if(req.body.description)post.description = req.body.description;
    if(req.body.type)post.type = req.body.type;

    post.save()
    .then(()=>res.json('Post Updated!'))
    .catch(err=>res.status(400).json('Error editing post: ' + err));
  })
  .catch(err=>res.status(400).json('Error finding post to edit: ' + err));

});

// -> Delete Post (X) | Per post.id
router.route('/delete/:id').delete((req,res) =>{

  Post.findByIdAndDelete(req.params.id)
  .then(post =>res.json('Post Deleted'))
  .catch(err => res.status(400).json('Error deleting post: ' + err));

});

// -> Add like to Post (X) | Per post._id & user._id
router.route('/addLike/:id').post((req,res) =>{
  
  Post.findById(req.params.id)
  .where({'likes.likes.userId':req.body.userId})
  .then(post =>{
    if(post){res.json(req.body.userId + ' already liked this post ' + req.params.id)}
    else {
      Post.findByIdAndUpdate(req.params.id)
      .then(post=>{

        post.likes.likes = [...post.likes.likes,{
          userId:req.body.userId,
          time:Date.now()
        }];
        post.save()
        .then(res.json(req.body.userId + ' likes post ' + post.id))
        .catch(err=>res.status(400).json('Error adding like to post ' + post.id + ': ' + err));

      })
      .catch(err=>res.status(400).json('Error finding post to update: ' + err));
    }
  })
  .catch(err => {
    res.status(400).json('Error finding like: ' + err); console.log("Error finding like: " + err)})
});

// Remove Like from Post ( ) | Per post.id
router.route('/removeLike/:id').post((req,res) =>{

  Post.findByIdAndUpdate(req.params.id)
  .then(post=>{

    let likePosition = post.likes.likes.indexOf({userId:req.body.userId});
    post.likes.likes.splice(likePosition, 1);
    post.save()
    .then(res.json(req.body.userId + ' removed like from post ' + post.id))
    .catch(err=>res.status(400).json('Error adding like to post ' + post.id + ': ' + err));

  })
  .catch(err=>res.status(400).json('Error finding post to update: ' + err));

});

// New Remove like ( ) | 
router.route('/newRemoveLike/:id').post((req,res)=>{

  Post.findById(req.params.id)
  .where({'likes.likes.userId':req.body.userId})
  .then(post =>{
    if(post){
      var likeId = mongoose.Types.ObjectId(req.body.userLikeId);
      Post.findByIdAndUpdate(req.params.id)
      .then(post => {
        let likePosition = post.likes.likes.indexOf({_id:likeId});
        console.log(post.likes.likes);
      })
      .catch(err => 'Error removing like: ' + err);
    }
    else {
      res.json(req.body.userId + ' has not liked this post ' + req.params.id);
    }
  })
  .catch(err => {
    res.status(400).json('Error finding like: ' + err); console.log("Error finding like: " + err)});

});

// -> Comment Post (X) | Per post.id
router.route('/addComment/:id').post((req,res) =>{

  Post.findByIdAndUpdate(req.params.id)
  .then(post=>{

    post.comments.comments = [...post.comments.comments,
      {
        userId:req.body.userId,
        description:req.body.description,
        time:Date.now()
      }
    ];
    post.save()
    .then(res.json(req.body.userId + ' comments post ' + post.id))
    .catch(err=>res.status(400).json('Error adding comment to post ' + post.id + ': ' + err));

  })
  .catch(err=>res.status(400).json('Error finding post to update: ' + err));

});

// Remove Comment from Post ( ) | Per post.(id, activeUserId, commentId)
router.route('/removeComment/:id').post((req,res) =>{

  //Check if post comment belongs to owner
  Post.findByIdAndUpdate(req.params.id)
  .then(post=>{
  //Find the comment based on the comment id
    let commentPosition = (post.comments.comments).indexOf({_id:req.body.commentId});

  //Check to make sure activeUserId = commentUserId  
    if(post.comments.comments[commentPosition].userId === req.body.activeUserId){
      //Use indexof splice stuff to remove the comment from array 
      post.comments.comments.splice(commentPosition,1);
      post.save()
      .then(res.json('Removed comment'))
      .catch(err=>res.status(400).json('Error removing comment: ' + err));
    }
    else {
      res.json('Sorry, this comment does not belong to you')
    }
  })
  .catch(err=>res.status(400).json('Error finding comment to delete: ' + err));

});

//

module.exports = router;