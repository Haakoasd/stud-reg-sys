const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:admin@cluster0.ipe2g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection`);
});