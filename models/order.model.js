import mongoose from "mongoose";
import materialModel from "./material.model";
import userModel from "./user.model";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    materialId:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:materialModel
    },
    userid:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:userModel
    },
    materialName:{
        type:String,
        default:null
    },
    orderQuantity:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    requestBy:{
        type:String,
        default:null
    },
    approval1:{
        type:String,
        default:'Pending'
    },
    approval2:{
        type:String,
        default:'Pending'
    },
    comments:{
        type:String,
        default:null
    },
    raisePO:{
        type:String,
        default:null
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

export default mongoose.model('order',OrderSchema)