const mongoose=require('mongoose')

const blogSchema = new mongoose.Schema({
 title:{
    type:String,
    trim:true,
 },
 createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  // Assuming you have a User model
  },
  desc:{
    type:String,
    trim:true,
  },
  isactive:{
    type:Boolean,
    default:true,
  }
},{
    timeStamp:true,
    versionKey:false,
}

)
const Blog=mongoose.model('blog',blogSchema);
module.exports = Blog;  