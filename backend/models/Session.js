import mongoose from "mongoose";

const sessionSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
   role:{type:String,required:true},
   experience:{type:String,required:true},
   tpoicsToFocus:{type:String,required:true},
   description:String,
   questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}],
},
{timestamps:true}
)
export default mongoose.model("Session",sessionSchema);
