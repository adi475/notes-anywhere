import React,{useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

function Navbar() {

let navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate("/login")
}

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <b>notesAnywhere</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className= {`nav-link ${location.pathname === "/" ? "active": ""} `} aria-current="page" to="/">
                  <i>Home</i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active": ""} `} to="/about">
                  <i>About</i>
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
            <Link style={{fontStyle:"oblique" , fontWeight :"bold"}} className="btn btn-info mx-1" to="/login" role="button">Login</Link>
            <Link style={{fontStyle:"oblique" , fontWeight :"bold"}} className="btn btn-info mx-1" to="/signup" role="button">SignUp</Link>
           </form>: <button className="btn btn-primary" onClick={handleLogout}> Logout </button>}
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
