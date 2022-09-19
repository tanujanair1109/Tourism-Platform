import User from "../mongoDB/models/users.js";
import Place from "../mongoDB/models/places.js";
import bcrypt from "bcrypt"
import generateToken from "../utilities/generateToken.js";

export const registerSuperAdmin = async (req,res)=>{
  try{
    const {email,password,mobile} = req.body;
    if(!(email,password)){
      res.status(400).send("Insufficent input");
    }
    const old = await User.findOne({email});
    if(old){
      res.status(409).send({msg:"User already exists",data:old});
    }
    else{
      let encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        mobile,
        password:encryptedPassword,
        role:'superadmin'
      })
      res.status(200).send(user);
    }
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

export const loginSuperAdmin = async (req,res)=>{
  try{
    const {email,password} = req.body;
    if(!(email,password)){
      res.status(400).send("Invalid credentials");
    }
      const user = await User.findOne({email,role:'superadmin'});
      if(!user){
        res.status(400).send("No used found!")
      }else{
        if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user,email);
        user.token = token;
        res.status(200).send(user);
      }
  }
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

export const superadminProfile = async (req,res)=>{
  try{
    const {email} = req.body;
    const user = await User.findOne({email,role:'superadmin'});
    if(!user){
      res.status(400).send('No user found!');
    }else{
      res.status(200).send({data:user});
    }
  }catch(err){
    res.status(500).send("Some error occured!");
    console.log(err);
  }
};

export const addPlace = async(req,res)=>{
  try{
    const {name,about,city,state,category,timing} = req.body;
    if(!(name,city,state)){
      res.status(400).send("Insufficient data");
    }else{
      const place = await Place.findOne({name,city,state});
      if(place){
        res.status(409).send("Location already added");
      }else{
        const data = await Place.create({
          name, about, city, state, category, timing
        })
        res.status(201).send(data);
      }
    }
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

export const getPlaces = async(req,res)=>{
  try{
    const places = await Place.find();
    if(places.length<1){
      res.status(400).send("No places data found");
    }else{
      res.status(200).json({data:places});
    }
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}
