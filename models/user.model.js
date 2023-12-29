import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:null
    },
    access:[
        {
            type:String,
            default:null
        },
    ],
    thumbnail:{
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

export default mongoose.model('user',UserSchema)