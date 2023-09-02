import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typ: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar /> 
        <Alert alert={alert} />
        <div className="container">
        <Routes>
          <Route exact path="/" element = {<Home showAlert={showAlert} />} />
          <Route exact path="/about" element = {<About/>} />
          <Route exact path="/login" element = {<Login showAlert={showAlert} />} />
          <Route exact path="/signup" element = {<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
       </BrowserRouter>
       </NoteState>
    </>
  );
}

export default App;
