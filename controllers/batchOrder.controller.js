import batchModel from "../models/batch.model";
import batchOrderModel from "../models/batchOrder.model";
import materialModel from "../models/material.model";
import orderModel from "../models/order.model";
import userModel from "../models/user.model";



export const addBatchOrder = async(req,res)=>{
    try{
        const {batchId,batchName,orderQuantity,appliZone} = req.body

        
        // const existuser = await userModel.findOne({_id:userid});
        const existbatch = await batchModel.findOne({_id:batchId});

        

        let materialObjects =null


        if(existbatch.materials){

            materialObjects = await  Promise.all(
                existbatch.materials.map(async (m) => {

                    const materialInfo = await materialModel.findOne({ _id: m.materialCode });
                    return {
                        materialCode: m.materialCode,
                        mcode: m.mcode,
                        grade:materialInfo ? materialInfo.grade : null,
                        unit: m.unit,
                        bMquantity: m.bMquantity,
                        reqqnt: m.bMquantity * orderQuantity,
                        inventqnt: materialInfo ? materialInfo.materialquantity : 0,
                        averagePrice: materialInfo.averagePrice
                    };
                })
            );
        }

        // console.log('materialObjects-',materialObjects)

        let totalprice = parseFloat((existbatch.batchPrice*orderQuantity).toFixed(2));
        
        const SaveOrder = new batchOrderModel({
            batchId:batchId,
            batchName:existbatch.batchname,
            orderQuantity:orderQuantity,
            appliZone:appliZone,
            price:totalprice,
            materials:materialObjects
        })

        SaveOrder.save()

        if(SaveOrder){
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


export const getBatchOrders =async (req,res)=>{
    try {

        const {search}=req.query
        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchrgx = rgx(search)

        let filter= {status:1}

        if(search){
            filter={
                ...filter,
                $or:[
                    {batchName:{$regex:searchrgx , $options:"i"}},
                    
                ]
            }

        }
        const getOrders = await batchOrderModel.find(filter)

        if(getOrders){

            return res.status(200).json({
                data:getOrders,
                total:getOrders.length,
                message:'successfully fetch batch orders'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getBatchOrder = async(req,res)=>{
    try {
        const orderId =req.params.orderId

        const getOrderdata =await batchOrderModel.findOne({_id:orderId})

        if(getOrderdata){
            return res.status(200).json({
                data:getOrderdata,
                message:'single batch order data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const updateBatchOrder = async(req,res)=>{
    try {

        const orderId =req.params.orderId

            const existorder = await batchOrderModel.findOne({_id:orderId});
            
            const existbatch = await batchModel.findOne({_id:existorder.batchId});


        const {batchId,batchName,userid,orderQuantity,appliZone,approval1,approval2,price,comments,raisePO} = req.body

        let totalprice = existorder.price

        let materialObjects =existorder.materials

        let finalapproval1 = existorder.approval1
        let finalapproval2 = existorder.approval2
        let coment=null
        console.log('finalapproval1-',finalapproval1)

        if(batchId || orderQuantity){
            finalapproval1='Pending'
            finalapproval2='Pending'
             totalprice = parseFloat((existbatch.batchPrice*orderQuantity).toFixed(2));

             if(existbatch.materials){

                materialObjects = await  Promise.all(
                    existbatch.materials.map(async (m) => {
    
                        const materialInfo = await materialModel.findOne({ _id: m.materialCode });
                    
                        return {
                            materialCode: m.materialCode,
                            mcode: m.mcode,
                            grade:materialInfo ? materialInfo.grade : null,
                            unit: m.unit,
                            bMquantity: m.bMquantity,
                            reqqnt: m.bMquantity * orderQuantity,
                            inventqnt: materialInfo ? materialInfo.materialquantity : 0, 
                        };
                    })
                );
            }
        }

        if(price){
            totalprice=price
        }
        

        if(approval1 ){
            finalapproval1=approval1
        }
        if(approval2){
            finalapproval2=approval2
        }
        if(comments){
            coment=comments
        }


            const updated =await batchOrderModel.updateOne({_id:orderId},{$set:{
                batchId:batchId,
                batchName:existbatch.batchname,
                orderQuantity:orderQuantity,
                appliZone:appliZone,
                price:totalprice,
                materials:materialObjects,
                approval1:finalapproval1,
                approval2:finalapproval2,
                comments:coment,
                raisePO:raisePO
            }})
    
            
            if(updated.acknowledged){
                return res.status(200).json({
                    message:'Batch Order Updated'
                })
            }
        
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}