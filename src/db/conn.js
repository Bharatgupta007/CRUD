const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://manchd123:manchd123@cluster0.qnsjl91.mongodb.net/coding",{ 
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
