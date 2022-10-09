const express=require("express");
const router=express.Router();
const fetchuser=require("../middleware/fetchuser");
const { findByIdAndUpdate } = require("../models/Notes");
const Notes=require("../models/Notes");


// ROUTE1 for fetching all the notes of the user that is logged in 
// "/api/notes/fechallnotes"
router.get("/fetchallnotes",fetchuser,async (req,res)=>{
    const notes=await Notes.find({user:req.user.id});
    res.send(notes);
})

// ROUTE2 for adding the new note using post. Login required
// route is "/api/notes/addnote"

router.post("/addnote",fetchuser,async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        const note=await Notes.create({
            user:req.user.id,
            title:title,
            description:description,
            tag:tag
        });
        return res.json(note);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
});


// ROUTER 3 update  the note using put . Login required
// route is "/api/notes/updatenotes/:id"

router.put("/updatenotes/:id",fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    // creating a new note;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    // find the note to be updated and update it
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed to update the Note");
    }

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    return res.json({note});

})


// ROUTER 4 for deletint the note "/api/notes/deletenote/:id"

router.delete("/deletenote/:id",fetchuser,async(req,res)=>{

    // find the note to be delted and then delete it 
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    // allow deletion only if user is allowed to delete that note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed to update the Note");
    }
    note=await Notes.findByIdAndDelete(req.params.id);

    return res.json("Succesfully deleted the note" );
})



module.exports=router;