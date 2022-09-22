import Place from "../mongoDB/models/places.js";


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
    // const places = await Place.find().skip((page-1)*1).limit(1);
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
