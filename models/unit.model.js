import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    alias:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()

    },
    status:{
        type:Number,
        default:1
    }
});

export default mongoose.model('unit',UnitSchema)