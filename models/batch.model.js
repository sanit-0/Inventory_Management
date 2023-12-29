import mongoose from "mongoose";
import materialModel from "./material.model";

const Schema = mongoose.Schema;

const BatchSchema = new Schema({
    batchname:{
        type:String,
        required:true
    },
    batchPrice:{
        type:Number,
        default:null
    },
    hsnsac:{
        type:String,
        default:null
    },
    hsndetail:{
        type:String,
        default:null
    },
    intergratedTax:{
        type:Number,
        default:null
    },
    centralTax:{
        type:Number,
        default:null
    },
    stateTax:{
        type:Number,
        default:null
    },
    cess:{
        type:Number,
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
        createdAt:{
            type:Date,
            default:Date.now()
    
        },
        status:{
            type:Number,
            default:1
        }
    }],
      
    createdAt:{
        type:Date,
        default:Date.now()

    },
    status:{
        type:Number,
        default:1
    }
});

export default mongoose.model('batch',BatchSchema)