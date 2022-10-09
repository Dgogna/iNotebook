const express=require("express");
const app=express();
const cors=require("cors");
const port=5000;

const connectToMongo=require("./db");
connectToMongo();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server is live ");
    return ;
})


app.use("/api/auth" ,require("./routes/auth"));
app.use("/api/notes" , require("./routes/notes"));


app.listen(port,()=>{
    console.log(`Server is live on port ${port}`);
})

