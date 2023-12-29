
import materialModel from '../models/material.model';


export const addMaterial = async(req,res)=>{
    try{

        // const existunit = await unitModel.findOne({name:name,alias:alias});

        // if(existunit){
        //     return res.status(200).json({
        //         message:'unit already exist'
        //     })
        // }


        const SaveMaterial = await materialModel.create({
            ...req.body,

          });


        if(SaveMaterial){
            return res.status(200).json({
                data:SaveMaterial,
                message:'Material created Successfully'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}


export const getMaterials =async (req,res)=>{
    try {

        const {search}=req.query
        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchrgx = rgx(search)

        let filter= {status:1}

        if(search){
            filter={
                ...filter,
                $or:[
                    {materialname:{$regex:searchrgx , $options:"i"}},
                    {code:{$regex:searchrgx , $options:"i"}},
                ]
            }

        }
        const getMaterialData = await materialModel.find(filter)

        if(getMaterialData){

            return res.status(200).json({
                data:getMaterialData,
                total:getMaterialData.length,
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

export const getMaterial = async(req,res)=>{
    try {
        const materialId =req.params.materialId

        const getMaterialData =await materialModel.findOne({_id:materialId})

        if(getMaterialData){
            return res.status(200).json({
                data:getMaterialData,
                message:'single material data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const updateMaterial = async(req,res)=>{
    try {

            const materialId =req.params.materialId
    

            const { materialname,
                    code,
                    grade,
                    unit,
                    under,
                    hsnsac,
                    hsndetail,
                    intergratedTax,
                    centralTax,
                    stateTax,
                    cess,
                    serviceType,
                    comments,
                    
                } = req.body


             const existmaterial = await materialModel.findOne({_id:materialId})

                // console.log('existmaterial-',existmaterial)
            const updated =await materialModel.updateOne({_id:materialId},{$set:{
                materialname:materialname,
                code:code,
                grade:grade,
                unit:unit,
                under:under,
                hsnsac:hsnsac,
                hsndetail:hsndetail,
                intergratedTax:intergratedTax,
                centralTax:centralTax,
                stateTax:stateTax,
                cess:cess,
                serviceType:serviceType,
                comments:comments,
                
            }})
    
            
            if(updated.acknowledged){
                return res.status(200).json({
                    message:'Added'
                })
            }
        
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
export const deleteMaterial =async (req,res) =>{

    try {
        
        const materialId =req.params.materialId


        const deleteMaterial =await materialModel.updateOne({_id:materialId},{$set:{
            status:0
        }})

        if(deleteMaterial.acknowledged){
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

export const removeMaterial =async (req,res) =>{

    try {
        
        const materialId =req.params.materialId


        const removeMaterial =await materialModel.deleteOne({_id:materialId})

        if(removeMaterial.acknowledged){
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


