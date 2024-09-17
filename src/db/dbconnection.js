const mongoose=require('mongoose')
const path = require("path");

const  createDb=async()=>{
    mongoose.connect('mongodb://localhost:27017/blog'
      
    ).catch((error)=>{
        console.log('fail')
    })
}

module.exports={createDb}