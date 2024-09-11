import mongoose from "mongoose";

//Define the person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true
    },
    age:{
        type:Number,
        trim:true
    },
    work:{
        type:String,
        required:[true,"work is required"],
        enum:['chef','weter','manager'],
        trim:true
    },
    mobile:{
        type:String,
        required:[true,"number is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    address:{
        type:String,
        required:[true,"address is required"]
    },
    salary:{
        type:Number,
        required:[true,"salary is required"]
    }

});

//create person model
const PersonSchemaModel=mongoose.model('Person_information',personSchema);

export default PersonSchemaModel;