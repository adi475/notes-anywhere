const express = require("express");
const User = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "adiisasuperb@guy"

// ROUTE 1: create a user using : POST "/api/auth/createuser". No login required. 
router.post("/createuser" , [
  body('email',"enter a valid email address").isEmail(),
  body('name', "enter a valid name").isLength({ min: 3 }), 
  body('password',"password should be atleast five characters long").isLength({ min: 5 }),
] , async (req , res) => {

   // if there are errors , return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
}  
   // check whether the user with same email exists already
try{
    let user = await User.findOne({email:req.body.email});

    if (user) {
      return res.status(400).json({error: "sorry user with this email already exists"})
    }

    const salt =await bcrypt.genSalt(10);
    const secpass =await bcrypt.hash(req.body.password,salt);

    // create a new user
    user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secpass,
  });

   const data = {
    user : {id: user.id }
   }
 
   const authtoken = jwt.sign(data, JWT_SECRET);
   res.json({authtoken});

} catch(error){
  console.error(error.message);
  res.status(500).send("internal server error occured");
}
  
})

// ROUTE 2: Authenticate a user using : POST "/api/auth/login". No login required. 
router.post("/login" , [
  body('email',"enter a valid email address").isEmail(), 
  body('password',"password can not be blank").exists(),
] , async (req , res) => {

 // if there are errors , return bad requests and the errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}  

 // check whether the user is with correct credentials or not.
const{email , password} = req.body ;

try {
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({error: "please try to login with correct credentials"});
  }

const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare){
  return res.status(400).json({error: "please try to login with correct credentials"});
}

const data = {
  user : {id: user.id }
 }

 const authtoken = jwt.sign(data, JWT_SECRET);
 res.json({authtoken});

} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error occured");
}

})

// ROUTE 3: get logged in user details using : POST "/api/auth/getuser". login required. 
router.post("/getuser",fetchuser, async (req , res) => {

try {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error occured");
}
})
module.exports = router ;