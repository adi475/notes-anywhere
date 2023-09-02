import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function Login(props) {

  let navigate = useNavigate();

 const[credentials , setCredentials] = useState({ email:"" , password:""})

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch( "http://localhost:5000/api/auth/login" , {
      method: 'POST',
      headers: {'content-type': 'application/json' },
      body: JSON.stringify({email: credentials.email , password: credentials.password}) 
  });

  const json =await response.json();
        console.log(json);
       if(json.success){
        // save the auth token and redirect.
        localStorage.setItem('token' , json.authtoken);
        props.showAlert("Logged in successfully" , "success");
        navigate("/");
        
       }  
       
       else{
        props.showAlert("Invalid details" , "danger")
       }
}

const onchange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
};
 
  return (
    <div>
      <h2 className="mb-3 mt-4">Login to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onchange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
