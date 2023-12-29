import mongoose from "mongoose";
import materialModel from "./material.model";
import userModel from "./user.model";
import batchModel from "./batch.model";

const Schema = mongoose.Schema;

const batchOrderSchema = new Schema({
    batchId:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:batchModel
    },
    batchName:{
        type:String,
        default:null
    },
    userid:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:userModel
    },
    orderQuantity:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    appliZone:{
        type:String,
        default:null
    },
     materials:[{
        materialCode:{
            type:Schema.Types.ObjectId, 
            default:null,
            ref:materialModel
        },
        mcode:{
            type:String,
            default:null
        },
        grade:{
            type:String,
            default:null
        },
        unit:{
            type:String,
            default:null
        },
        bMquantity:{
            type:Number,
            default:0
        },
        reqqnt:{
            type:Number,
            default:0
        },
        inventqnt:{
            type:Number,
            default:0
        },
        createdAt:{
            type:Date,
            default:Date.now()
    
        },
        status:{
            type:Number,
            default:1
        }
    }],
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

export default mongoose.model('batchorder',batchOrderSchema)