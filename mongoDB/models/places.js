import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name:{type:String,required:true},
  about:{type:String},
  city:{type:String},
  state:{type:String},
  geo_locaions:{},
  category:{type:String,enum:['free','paid'],default:'free'},
  timing:{type:String, default:'10:00AM - 7:00PM'},
})

placeSchema.set('timestamp','true');
export default mongoose.model('place',placeSchema);
