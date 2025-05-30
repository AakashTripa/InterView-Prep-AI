import mongoose from "mongoose";

const questionSchema=new mongoose.Schema({
    session:{type:mongoose.Schema.Types.ObjectId,ref:"Session"},
    question:{type:String,},
   answer:{type:String},
note:String,
isPinned:{type:Boolean,default:false},

},{timestamps:true}
)
export default mongoose.model("Question",questionSchema);
