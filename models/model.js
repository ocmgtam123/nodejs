const mongoose = require("mongoose");
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
});
let Product=mongoose.model("Product",productSchema);
let Category=mongoose.model("Category",categorySchema);
module.exports={Product,Category};