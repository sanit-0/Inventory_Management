import bcrypt from 'bcrypt'
import userModel from "../models/user.model"
import jwt from 'jsonwebtoken'
import multer from 'multer';
import { storage } from '../util/fileUpload';
import fs from 'fs'
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer'
import otpModel from '../models/otp.model';
import orderModel from '../models/order.model';
import materialModel from '../models/material.model';
import pdfModel from '../models/pdf.model';
// import otpModel from '../models/otp.model';


export const addPdf = async(req,res)=>{
    try{
        const {orderid} = req.body

        const existorder =await orderModel.findOne({_id:orderid})


        const existmaterial = await materialModel.findOne({_id:existorder.materialId})


        const SavePdf = new pdfModel({
            orderid:orderid,
            mname:existmaterial.code,
            reqQnt:existorder.orderQuantity,
            avalbQnt:existmaterial.materialquantity,
            mgrade:existmaterial.grade,
            under:existmaterial.under,
            service:existmaterial.serviceType,
            hsnsac:existmaterial.hsnsac,
            hsndetail:existmaterial.hsndetail,
            intergratedTax:existmaterial.intergratedTax,
            centralTax:existmaterial.centralTax,
            stateTax:existmaterial.stateTax,
            cess:existmaterial.cess,
            price:existorder.price
        })


        SavePdf.save()

        if(SavePdf){
            return res.status(200).json({
                message:'Successfully Added'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}


export const getpdf = async(req,res)=>{
    try {

        const orderid  = req.params.orderid


        const existpdf =await pdfModel.findOne({orderid:orderid})


        if(existpdf){
            return res.status(200).json({
                data:existpdf,
                message:'pdf data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}





export const deleteuser =async (req,res) =>{

    try {
        
        const userID = req.params.userID

        const deleteuser =await userModel.updateOne({_id:userID},{$set:{
            status:0
        }})

        if(deleteuser.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'

            })
        }
        
    } 
    catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}

export const removeuser =async (req,res) =>{

    try {
        
        const userID = req.params.userID


        const userdata = await userModel.findOne({_id:userID})

        if(fs.existsSync('uploads/'+userdata.thumbnail)){
            fs.unlinkSync('uploads/'+userdata.thumbnail)
        }

        const removeuser =await userModel.deleteOne({_id:userID})

        if(removeuser.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'

            })
        }
        
    } catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}




