import React,{useContext} from "react";
import NoteContext from "../Context/notes/noteContext";
function Noteitem(props) {

  const { note , updateNote} = props;

  const context = useContext(NoteContext);
    const{deleteNote} = context ;

  return (
    <div className="col-md-4">
      <div className="card my-2">
        <div className="card-body ">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.tag}</p>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-pen-to-square fa-fade" onClick={()=>{updateNote(note)}}></i>
          <i className="fa-solid fa-trash fa-fade mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully" , "success")}}></i>
          
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
