
import materialModel from '../models/material.model';


export const addInventory = async(req,res)=>{
    try{
        const materialId = req.params.materialId

        // const {inventoryname,date,quantity,price,Specifications} = req.body

        const existmaterial = await materialModel.findOne({_id:materialId});

        if(existmaterial){

            const updatematerial = await materialModel.updateOne({_id:existmaterial._id},{$push:{
                inventory:req.body
            }})

            if(updatematerial.acknowledged){
                const getmaterial = await materialModel.findOne({_id:materialId});


                const allinventory = getmaterial.inventory
                // const inventoryPrice = getmaterial.price

                // console.log('allinventory-',allinventory)
                // console.log('price-',inventoryPrice)

                let totalqunt=0
                let avgprice=0

                let QntPrice = 0
                
                allinventory.map((elm,ind)=>{
                    totalqunt +=elm.quantity
                
                    QntPrice += elm.quantity * elm.price
                })
                

                avgprice = QntPrice/totalqunt

                const roundedAvgPrice = parseFloat(avgprice.toFixed(2));


                const updatequantity = await materialModel.updateOne({_id:getmaterial._id},{$set:{
                    materialquantity:totalqunt,
                    averagePrice:roundedAvgPrice
                }})
                
                if(updatequantity.acknowledged){
                    return res.status(200).json({
                        message:'inventory created'
                    })
                }
            }

        }

      
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}





