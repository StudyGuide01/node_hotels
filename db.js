import mongoose from "mongoose";

//Define the MongoDB connection URL 
const MONGODB_URL="mongodb://localhost:27017/Hotel_Data";

//Set Up MongoDB connection
mongoose.connect(MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

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