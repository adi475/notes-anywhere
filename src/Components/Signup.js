import React , {useState} from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {

  let navigate = useNavigate();

  const[credentials , setCredentials] = useState({ name:"" ,  email:"" , password:"" , cpassword:""})
 
   const handleSubmit = async(e) => {
     e.preventDefault();
 
     const response = await fetch( "http://localhost:5000/api/auth/createuser" , {
       method: 'POST',
       headers: {'content-type': 'application/json' },
       body: JSON.stringify({ name: credentials.name , email: credentials.email , password: credentials.password}) 
   });
 
   const json =await response.json();
         console.log(json);
        if(json.success){
         // save the auth token and redirect.
         localStorage.setItem('token' , json.authtoken);
         props.showAlert("Account created successfully" , "success");
         navigate("/login");
         
        }  
        
        else{
        props.showAlert("Invalid credentials" , "danger")
        }
 }
 
 const onchange = (e) => {
   setCredentials({ ...credentials, [e.target.name]: e.target.value });
 };

 

  return (
    <div>
      <h2 className="mb-3 mt-4">Create an user account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
           Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
