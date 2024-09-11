import mongoose from "mongoose";


/*
// import dotenv from 'dotenv/config';
// mongoose.Promise = global.Promise;

//Define the MongoDB connection URL 
// const MONGODB_ATLAS_URL="mongodb+srv://Hotels:OkW76mnx0WQkCkZr@cluster0.dffqs.mongodb.net/"
// const MONGODB_ATLAS_URL=process.env.DB_URL
//OkW76mnx0WQkCkZr

*/
 const MONGODB_URL="mongodb://localhost:27017/Hotel_Data";


//Set Up MongoDB connection
mongoose.connect(MONGODB_URL);

const db=mongoose.connection;


//Define Event Listener For Database Connections
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
});

db.on('error',(err)=>{
    console.error('MongoDB connection error',err);
});

db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
});


//export db object
export default db;