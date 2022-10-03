import React ,{useState} from "react";
import NoteContext from "./noteContext";


const NoteState = (props)=>{

    const notesInitial=[
        {
          "_id": "633acd6fbf6c23db6e57309a",
          "user": "633a9883782fce32c4e625e1",
          "title": "hello and welcome dhruv gogna",
          "description": "hello dhruv gogna",
          "tag": "General",
          "date": "2022-10-03T11:54:23.213Z",
          "__v": 0
        },
        {
          "_id": "633acd70bf6c23db6e57309c",
          "user": "633a9883782fce32c4e625e1",
          "title": "day 2",
          "description": "hello dhruv gogna",
          "tag": "General",
          "date": "2022-10-03T11:54:24.005Z",
          "__v": 0
        },{
            "_id": "633acd6fbf6c23db6e57309a",
            "user": "633a9883782fce32c4e625e1",
            "title": "hello and welcome dhruv gogna",
            "description": "hello dhruv gogna",
            "tag": "General",
            "date": "2022-10-03T11:54:23.213Z",
            "__v": 0
          },
          {
            "_id": "633acd70bf6c23db6e57309c",
            "user": "633a9883782fce32c4e625e1",
            "title": "day 2",
            "description": "hello dhruv gogna",
            "tag": "General",
            "date": "2022-10-03T11:54:24.005Z",
            "__v": 0
          },{
            "_id": "633acd6fbf6c23db6e57309a",
            "user": "633a9883782fce32c4e625e1",
            "title": "hello and welcome dhruv gogna",
            "description": "hello dhruv gogna",
            "tag": "General",
            "date": "2022-10-03T11:54:23.213Z",
            "__v": 0
          },
          {
            "_id": "633acd70bf6c23db6e57309c",
            "user": "633a9883782fce32c4e625e1",
            "title": "day 2",
            "description": "hello dhruv gogna",
            "tag": "General",
            "date": "2022-10-03T11:54:24.005Z",
            "__v": 0
          }
      ];

      const[notes,setNotes]=useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;