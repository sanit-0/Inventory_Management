
import batchModel from '../models/batch.model';
import materialModel from '../models/material.model';


export const addBatch = async(req,res)=>{
    try{
        const {batchname,hsnsac,hsndetail,intergratedTax,centralTax,stateTax,cess,materials} = req.body
        
        let materialObjects =null

        let batchPrice = 0

        if(materials){

             materialObjects = materials.map((m) => (
                {
                materialCode: m.materialname,
                mcode:m.mcode,
                grade:m.grade,
                unit:m.unit,
                bMquantity: m.quantity, 
            }
            ));

            ///- to calculate price---\\\\


           const  materialPrice =await Promise.all(materials.map(async(m)=>{
                // console.log('mcode-',m.materialname)
                // console.log('quantity-',m.quantity)

                const material = await materialModel.findOne({ _id: { $in: m.materialname } });

                // console.log('material-', material);
            
                if (material) {
                    const totalPrice = m.quantity * material.averagePrice;
            
                    batchPrice += totalPrice;
                    return parseFloat(totalPrice.toFixed(2));
                }
                return 0
           }))


        }
        
        console.log('batchPrice-', batchPrice);

        const SaveBatch = new batchModel({
            batchname:batchname,
            batchPrice:batchPrice,
            hsnsac:hsnsac,
            hsndetail:hsndetail,
            intergratedTax:intergratedTax,
            centralTax:centralTax,
            stateTax:stateTax,
            cess:cess,
            materials:materialObjects 
        })

        SaveBatch.save()

        if(SaveBatch){
            return res.status(200).json({
                message:'Batch created'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}


export const getBatches =async (req,res)=>{
    try {

        const {search}=req.query
        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchrgx = rgx(search)

        let filter= {status:1}

        if(search){
            filter={
                ...filter,
                $or:[
                    {batchname:{$regex:searchrgx , $options:"i"}},
                    
                ]
            }

        }
        const getbatchdata = await batchModel.find(filter)

        if(getbatchdata){

            return res.status(200).json({
                data:getbatchdata,
                total:getbatchdata.length,
                message:'successfully fetch batch data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const getBatch = async(req,res)=>{
    try {
        const batchid =req.params.batchid

        const getbatchdata =await batchModel.findOne({_id:batchid})

        if(getbatchdata){
            return res.status(200).json({
                data:getbatchdata,
                message:'single batch data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const updateBatch = async(req,res)=>{
    try {
              
        const batchid =req.params.batchid
           
        const {batchname,hsnsac,hsndetail,intergratedTax,centralTax,stateTax,cess,materials} = req.body
        
        let materialObjects =null
        let batchPrice = 0

        if(materials){

             materialObjects = materials.map((m) => ({
                materialCode: m.materialname,
                mcode:m.mcode,
                grade:m.grade,
                unit:m.unit,
                bMquantity: m.quantity, 
            }));

             ///- to calculate price---\\\\


           const  materialPrice =await Promise.all(materials.map(async(m)=>{
            
                const material = await materialModel.findOne({ _id: { $in: m.materialname } });

            
                if (material) {
                    const totalPrice = m.quantity * material.averagePrice;
            
                    batchPrice += totalPrice;
                    return totalPrice;
                }
                return 0
            }))

        }
        
    
            const updated =await batchModel.updateOne({_id:batchid},{$set:{
                batchname:batchname,
                batchPrice:batchPrice,
                hsnsac:hsnsac,
                hsndetail:hsndetail,
                intergratedTax:intergratedTax,
                centralTax:centralTax,
                stateTax:stateTax,
                cess:cess,
                materials:materialObjects  
            }})
    
            
            if(updated.acknowledged){
                return res.status(200).json({
                    message:'Batch Updated'
                })
            }
        
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const deleteBatch =async (req,res) =>{

    try {
        
        const batchid =req.params.batchid


        const deletebatch =await batchModel.updateOne({_id:batchid},{$set:{
            status:0
        }})

        if(deletebatch.acknowledged){
            return res.status(200).json({
                message:' btach deleted successfully'

            })
        }
        
    } 
    catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}

export const removeBatch =async (req,res) =>{

    try {
        
        const batchid =req.params.batchid

        const removebatch =await batchModel.deleteOne({_id:batchid})

        if(removebatch.acknowledged){
            return res.status(200).json({
                message:'Batch deleted successfully'

            })
        }
        
    } catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}






