import Place from "../mongoDB/models/places.js";
import Csv from "jquery-csv";

import Fs, { stat } from "fs";

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

export const addCSV = async(req,res)=>{
  try{
    if(req.file){
      var data = await  Fs.readFile(req.file.path,'utf8', function(err,data){
        var final = Csv.toObjects(data);
         final.forEach(function(item){
            Place.create(item);
        })
        res.status(200).send("Data upload success!");
      });
  }
} catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

export const getPlaces = async(req,res)=>{
  try{

    const places = await Place.find().skip(1).limit(5);
    // const places = await Place.find();
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

export const getFilteredPlaces = async (req,res)=>{
  let {city,state} = req.body;
  // console.log( typeof city,state)
  let query = {};
  try{
  if(city?.length){
    city = JSON.parse(city) // parsing because in http request type of array was converted to string from object
    query.city = {$in : city}
  }
  if(state?.length){
    state = JSON.parse(state)
    query.state = {$in :state}
  }
    const places = await Place.find(query)     
      .skip(1).limit(5);
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