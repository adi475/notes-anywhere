import {React, useContext, useState} from 'react';
import NoteContext from "../Context/notes/noteContext";

function AddNote(props) {

    const context = useContext(NoteContext);
    const{addNote} = context ;

    const [note , setNote] = useState({title: "" , tag: "" , description: ""});

    const handleSubmit = (e) => {
             e.preventDefault();   //is used to prevent reloading the page.
             addNote(note.title , note.tag , note.description);
             setNote({title: "" , tag: "" , description: "" });
             props.showAlert("Note added successfully" , "success")
    }

    const onchange = (e) => {
               setNote({...note, [e.target.name]:e.target.value})        
    } 

  return (
    <div>
      <h2>Add notes</h2>
        <div className="container my-2">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={note.title}
                aria-describedby="emailHelp"
                onChange={onchange}
                minLength={3}
                required
              />
              
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onchange}
                minLength={3}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={note.description}
                onChange={onchange}
                minLength={3}
                required
              />
            </div>
            
            <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit Note
            </button>
          </form>
        </div>
    </div>
  )
}

export default AddNote
