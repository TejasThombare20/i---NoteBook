const express = require("express"); 
const User =require("../Module/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser"); 

const JWT_SECRET = "line is to get the token";
// create a user using : POST "/api/auth/createuser" - doesnt require auth
// no login required 
router.post('/createuser',
// [
//     body('name',"enter a valid name").isLength({min :5 }),
//     body('password',"enter a valid password").isLength({min :8 }),
//     body('email',"enter a valid mail").isEmail()], 
    async (req,res)=>{
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()
    
    // if there are error return bad request and the error 
    // const errors = validationResult(req);
    // if(!errors.isEmpty())
    // {
    //     return res.status(400).json({errors : errors.array()});
    // }

    try {
        // check wheather the email exists already
    let user = await User.findOne({email : req.body.email})
    if(user){
        return res.status(400).json({error : "Sorry user with this email already exists"})
    }
    //   secure the password in dataset
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)
    
    user = await User.create(
        {
            name : req.body.name,
            password : secPass,
            email : req.body.email
        }
        )   

        const data = 
        {
            user :{ id : user.id }
        }
        // get the token
       const authtoken =  jwt.sign(data,JWT_SECRET);
       console.log(authtoken); 
        
        //  res.json({error : "enter a unique value of email"})})
        // res.send(req.body);
        res.json({authtoken})
    }catch(error){

        console.log(error);
        res.status(500).send("internal server error")
    } 
    })
 
// Authenticate a user using POST "/api/auth/login" no login required
router.post('/login',[
    body('email').isEmail(),  
    body('password',"password cannot be a blank").exists()  
],async (req,res)=>{
     let success = false;
     // if there are error return bad request and the error 
     const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         return res.status(400).json({errors : errors.array()});
     }

     const {email , password} = req.body;
     try{
        let user =await User.findOne({email});
        if(!user){
            success = false; 
            return res.status(400).json({error : "enter a correct login crendential"});
        }
           const passwordCompare = await bcrypt.compare(password , user.password)
        if(!passwordCompare)
        {    success = false; 
            return res.status(400).json({success,error : "enter a correct login crendential"});

        }
        const data = 
        {
            user :{
                id : user.id
            }
        }
        // get the token
       const authtoken =  jwt.sign(data,JWT_SECRET);
       success = true;
       res.json({ success,authtoken});
     }catch(error)
     {
        console.log(error.massage);
        res.status(500).send("internal server error") 
     }
})


//  NOTE : get login user details using : POST /api/auth/getuser . login required
router.post('/getuser',fetchUser,async (req,res)=>{

try{
  const userID =req.user.id;
  const user = await User.findById(userID).select("-password")
res.send(user);

}catch(error){
    console.log(error.message);
    res.status(500).send("internal server error")
}
     
})



module.exports = router