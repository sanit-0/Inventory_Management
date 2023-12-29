import mongoose from "mongoose";
import materialModel from "./material.model";

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    inventoryname:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:null
    },
    price:{
        type:Number,
        required:null
    },
    Specifications:{
        type:String,
        required:null
    },
    materialId:{
        type:Schema.Types.ObjectId, 
        default:null,
        ref:materialModel
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

export default mongoose.model('inventory',inventorySchema)