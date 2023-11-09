const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/Curdproject",{ 
    // it will return a promise through .then function we will return it
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection made successfully`);
}).catch((e)=>{
console.log(`not connected`);
console.log(e);
})
