const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // name:{}
  email:{type:String,required:true},
  password:{type:String,required:true},
  mobile:{type:Number,default:null},
  role:{type:String,default:'user'},
  token:{type:String}
})

userSchema.set('timestamp','true');
const User = mongoose.model('users',userSchema);
export default User;
