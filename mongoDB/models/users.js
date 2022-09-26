import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  // name:{}
  email:{type:String,required:true},
  password:{type:String,required:true},
  mobile:{type:Number,default:null},
  role:{type:String,enum:['superadmin','admin','blockadmin','user'],default:'user'},
  token:{type:String}
})

userSchema.set('timestamp','true');
const User = mongoose.model('users',userSchema);
export default User;
