const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    usrnm:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },  dob:{
        type:String,
        // required:true
    },  address:{
        type:String,
        // required:true
    },
    pin:{
        type:String,
        required:true
    }    
})
const Newdata=new mongoose.model("Newdata",userSchema);
module.exports=Newdata; 




















// const mongoose=require("mongoose")

//     // const { Schema } = mongoose;

// const newuserSchema = new mongoose.Schema({
//     usrnm:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },  dob:{
//         type:String,
//         required:true
//     },  address:{
//         type:String,
//         required:true
//     }

// })
// // now we are creating modles
// const Newdata=new mongoose.model("Newdata",newuserSchema);  //Register is a colloction in which 1st letter should be capital and must be in singular form
// module.exports=Newdata;
