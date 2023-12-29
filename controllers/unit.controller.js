
import unitModel from '../models/unit.model';


export const addUnit = async(req,res)=>{
    try{
        const {name,alias} = req.body

        const existunit = await unitModel.findOne({name:name,alias:alias});

        if(existunit){
            return res.status(200).json({
                message:'unit already exist'
            })
        }


        const SaveUnit = new unitModel({
          name:name,
          alias:alias
        })

        SaveUnit.save()

        if(SaveUnit){
            return res.status(200).json({
                message:'Unit created Successfully'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}


export const getUnits =async (req,res)=>{
    try {

        const {search}=req.query
        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchrgx = rgx(search)

        let filter= {status:1}

        if(search){
            filter={
                ...filter,
                $or:[
                    {name:{$regex:searchrgx , $options:"i"}},
                    {alias:{$regex:searchrgx , $options:"i"}},
                ]
            }

        }
        const getUnitData = await unitModel.find(filter)

        if(getUnitData){

            return res.status(200).json({
                data:getUnitData,
                total:getUnitData.length,
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

export const getUnit = async(req,res)=>{
    try {
        const unitid =req.params.unitID

        const getUnitData =await unitModel.findOne({_id:unitid})

        if(getUnitData){
            return res.status(200).json({
                data:getUnitData,
                message:'single unit data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


// export const updateUser = async(req,res)=>{
//     try {

//         const uploaduserdata =upload.single('thumbnail')

//         uploaduserdata(req,res,async function(err){
//             if(err){
//                 return res.status(400).json({
//                     message:err.message
//                 })
//             }
//             const userid =req.params.userID
    
//             const existUser= await userModel.findOne({_id:userid})

//             let img = existUser.thumbnail

//             if(req.file){
//                 img = req.file.filename

//                 if(fs.existsSync('./uploads/'+existUser.thumbnail)){
//                     fs.unlinkSync('./uploads/'+existUser.thumbnail)
//                 }
//             }

//             const {fullname,email,password,contact,username} = req.body


//             let hashedPassword = existUser.password; 

//             if (password) {
//                 hashedPassword = bcrypt.hashSync(password, 10);
//             }

//             const updated =await userModel.updateOne({_id:userid},{$set:{
//                 fullname:fullname,
//                 email:email,
//                 password:hashedPassword,
//                 contact:contact,
//                 username:username,
//                 thumbnail:img
//             }})
    
            
//             if(updated.acknowledged){
//                 return res.status(200).json({
//                     message:'Updated'
//                 })
//             }
//         })
//     } 
//     catch (error) {
//         return res.status(500).json({
//             message:error.message
//         })
//     }
// }


export const deleteUnit =async (req,res) =>{

    try {
        
        const unitid = req.params.unitID

        const deletunit =await unitModel.updateOne({_id:unitid},{$set:{
            status:0
        }})

        if(deletunit.acknowledged){
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

export const removeUnit =async (req,res) =>{

    try {
        
        const unitid = req.params.unitID

        const removeUnit =await unitModel.deleteOne({_id:unitid})

        if(removeUnit.acknowledged){
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


