import bodyParser from 'body-parser';
import express from 'express'
import dbconnect from './mongoDB/connection.js';
import userRouter from './routes/usersRouter.js'
import superadminRouter from './routes/superadminRouter.js'
dbconnect();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


// configuring routes
app.get("/",(req,res)=>{
  try{
      res.send("<h1>Hello Welcome To Tourism Platform</h1>")
  }catch(err){
    res.send('some error occurred')
    console.log(err);
  }
})
app.use("/user",userRouter);
app.use("/superadmin",superadminRouter);

// PORT
let port = process.env.PORT||8000;
app.listen(port, function() {
  console.log("<---------------Server started on PORT:"+port+"--------------->");
});
