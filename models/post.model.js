const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema ({
  description: {
    type: String,
    min: 1,
    max: 250
  },
  type: {
    type: String,
    required: true
  },
  image: { 
    type: String, 
  },
  createdDate: { 
    type: Number, 
    required: true 
  },
  link: {
    type: String,
    required: true,
    min:3,
    max: 50
  },
  likes: {
    id: { type: Schema.Types.ObjectId },
    likes: [
      {  
        time: {
          type:Number,
          required:true
        },
        userId: { 
          type: Schema.Types.ObjectId, 
          ref: 'User', 
          required: true 
        }
      }
    ]
  },
  comments:{
    id:  { type: Schema.Types.ObjectId },
    comments: [
      {  
        time: {
          type:Number,
          required:true
        },
        userId: { 
          type: Schema.Types.ObjectId, 
          ref: 'User', 
          required: true 
        },
        description: {
          type: String,
          min: 1,
          max: 250
        }
      }
    ]
  },
  // Foreign Keys
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    
},
{
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;