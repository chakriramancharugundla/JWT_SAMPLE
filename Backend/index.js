const express=require('express')

const jwt=require('jsonwebtoken')

const app=express()

app.use(express.json())

 
app.post('/login',(req,res)=>{
  const user={
    uname:"chakri",
    password:"1234",
  }
  jwt.sign(user,"secret_key",(err,token)=>{
    res.status(200).json(token);
  })
})


function verifyUser(req, res, next) {
  //console.log(req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  req.token = token;
  next();
}

app.post('/profile',verifyUser,(req,res)=>{

      jwt.verify(req.token,"secret_key",(err,data)=>{
        if(err)
          {
          res.status(200).json({message:"token mismatch"})
          return;
          }
          res.status(200).json({data})

        
      })
})

app.listen(8080,()=>console.log("server started........."));