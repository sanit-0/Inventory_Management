import mongoose, { Types } from "mongoose";
import orderModel from "./order.model";

const Schema = mongoose.Schema;

const PdfSchema = new Schema({
    orderid:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:orderModel
    },
    mname:{
        type:String,
        default:null,
    },
    reqQnt:{
        type:String,
        default:null,

    },
    avalbQnt:{
        type:String,
        default:null,

    },
    mgrade:{
        type:String,
        default:null,

    },
    under:{
        type:String,
        default:null,
    },
    service:{
        type:String,
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
    price:{
        type:Number,
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

export default mongoose.model('pdf',PdfSchema)