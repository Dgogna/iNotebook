const mongoose=require("mongoose");

const connectToMongo = ()=>{
    mongoose.connect("mongodb://localhost:27017/inotebookDB",()=>{
        console.log("connected to mongoose succesfully");
    })
}

module.exports = connectToMongo;