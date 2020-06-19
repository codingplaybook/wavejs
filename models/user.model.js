const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
USER
1) firstName
2) lastName
3) email
4) username
5) header
6) image
7) passHash 
8) visibility
*/

const userSchema = new Schema ({
    firstname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3,
      max: 50
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3,
      max:50
    },
    description: {
      type: String,
      min: 1,
      max: 100
    },
    image: { 
      type: String, 
      required: true 
    },
    passHash: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    isVisible: {
      type: Boolean,
      required: true
    },
    /*
    Followers = who is following user
    Followings = who user is following
    */
    followers: {
      id: { type: Schema.Types.ObjectId },
      followers: [
        { 
          type: Schema.Types.ObjectId, 
          ref: 'User'
        }
      ]
    },
    followings: {
      id: { type: Schema.Types.ObjectId },
      followings: [
        { 
          type: Schema.Types.ObjectId, 
          ref: 'User'
        }
      ]
    }

    /* Foreign Keys
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
    likes:[{ type: Schema.Types.ObjectId, ref: 'Post'}],
    settings: [{ type: Schema.Types.ObjectId, ref: 'Setting' }]
    */
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;