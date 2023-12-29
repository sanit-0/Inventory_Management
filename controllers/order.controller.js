import materialModel from "../models/material.model";
import orderModel from "../models/order.model";
import userModel from "../models/user.model";



export const addOrder = async(req,res)=>{
    try{
        const {materialId,userid,orderQuantity,requestBy} = req.body

        
        // const existuser = await userModel.findOne({_id:userid});
        const existmaterial = await materialModel.findOne({_id:materialId});

        
        // console.log('existmaterial-',existmaterial)

        let totalprice = parseFloat((existmaterial.averagePrice*orderQuantity).toFixed(2))

        

        const SaveOrder = new orderModel({
            materialId:materialId,
            materialName:existmaterial.code,
            orderQuantity:orderQuantity,
            requestBy:requestBy,
            price:totalprice,
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


export const getOrders =async (req,res)=>{
    try {

        const {search}=req.query
        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchrgx = rgx(search)

        let filter= {status:1}

        if(search){
            filter={
                ...filter,
                $or:[
                    {materialName:{$regex:searchrgx , $options:"i"}},
                    
                ]
            }

        }
        const getOrders = await orderModel.find(filter)

        if(getOrders){

            return res.status(200).json({
                data:getOrders,
                total:getOrders.length,
                message:'successfully fetch'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getOrder = async(req,res)=>{
    try {
        const orderId =req.params.orderId

        const getOrderdata =await orderModel.findOne({_id:orderId})

        if(getOrderdata){
            return res.status(200).json({
                data:getOrderdata,
                message:'single order data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const updateOrder = async(req,res)=>{
    try {

        const orderId =req.params.orderId

            const existorder = await orderModel.findOne({_id:orderId})

            const existmaterial = await materialModel.findOne({_id:existorder.materialId});

        const {materialId,userid,orderQuantity,requestBy,approval1,approval2,price,comments,raisePO} = req.body

        let totalprice = existorder.price
        let finalapproval1 = existorder.approval1
        let finalapproval2 = existorder.approval2
        let coment=null
        if(orderQuantity){

             totalprice =  parseFloat((existmaterial.averagePrice*orderQuantity).toFixed(2))
        }

        if(price){
            totalprice=price
        }

        if(materialId || orderQuantity ){
            finalapproval1='Pending'
            finalapproval2='Pending'

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
            const updated =await orderModel.updateOne({_id:orderId},{$set:{
                materialId:materialId,
                materialName:existmaterial.code,
                orderQuantity:orderQuantity,
                requestBy:requestBy,
                price:totalprice,
                approval1:finalapproval1,
                approval2:finalapproval2,
                comments:coment,
                raisePO:raisePO
            }})
    
            
            if(updated.acknowledged){
                return res.status(200).json({
                    message:'Order Updated'
                })
            }
        
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}