const {Category,Product} = require("../models/model");

const productController = {
    add: async (req,res)=>{
        try{
            const result1 = await Product.findOne({name: req.body.name}).count();
            if(result1==0){
                const newProduct = new Product(req.body);
                const saved = await newProduct.save();
                if(req.body.category){
                    const category=Category.findById(req.body.category);
                    await category.updateOne({$push:{product:saved._id}});
                }
                res.status(200).json(saved);
            }else{
                res.send({success:false, message:"Name exit system"});
            }

            
        }catch(err){
            res.status(500).json(err);
        }
    },
    getAll: async (req,res)=>{
        try{
            const product = await Product.find();
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getDetail: async (req,res)=>{
        try{
            const product = await Product.findById(req.params.id).populate("category");
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
        }
    },
    update: async (req,res)=>{
        try{
            const product = await Product.findById(req.params.id);
            await product.updateOne({$set:req.body});
            res.status(200).json("Update product successfull!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    delete: async (req,res)=>{
        try{
            await Category.updateMany(
                {product:req.params.id},
                {product:null}
            );
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete product successfull");
        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = productController;