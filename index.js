import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userrouter from './routers/user.router'
import unitrouter from './routers/unit.router'
import materialrouter from './routers/material.router'
import inventoryrouter from './routers/inventory.router'
import orderrouter from './routers/order.router'
import batchrouter from './routers/batch.router'
import batchOrderrouter from './routers/batchOrder.router'
import pdfrouter from './routers/pdf.router'


const app = express()

app.use(express.json())

app.use(express.static(__dirname)) 

app.use(cors())

app.use(cookieParser())

const port= process.env.PORT


app.get('/',(req,res)=>{
    res.send('Server is runnimg...')
})

// mongoose.connect('mongodb://127.0.0.1:27017/brainbox')
//     .then(()=>console.log('conected!'))
//     .catch(err => console.log(err))



const connectToDatabase =async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas')
    }
    catch(error){
        console.error('Error connecting to MongoDB Atlas:', error);

    }
}
connectToDatabase();

app.listen(port,()=>{
    console.log(`server is running on ${process.env.BASE_URL}`)
})


app.use('/users',userrouter)

app.use('/unit',unitrouter)

app.use('/material',materialrouter)
app.use('/inventory',inventoryrouter)
app.use('/order',orderrouter)
app.use('/batch',batchrouter)
app.use('/batchorder',batchOrderrouter)
app.use('/pdf',pdfrouter)

