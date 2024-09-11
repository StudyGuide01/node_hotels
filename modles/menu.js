import mongoose from "mongoose";

const menuItemScheam= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    taste:{
        type:String,
        required:true,
        enum:['Sweet','Spicy','Sour']
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[],
    },
    num_sales:{
        type:Number,
        default:0
    }
});

const MenuItemModel= mongoose.model('MenuItem',menuItemScheam);

export default MenuItemModel;