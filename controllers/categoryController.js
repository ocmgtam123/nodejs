const {Category,Chat} = require("../models/model");

const categoryController = {
    add: async (req,res)=>{
        try{            
            const result1 = await Category.findOne({name: req.body.name}).count();
            if(result1==0){
                const newCategory = new Category(req.body);
                const saved = await newCategory.save();
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
            const category = await Category.find();
            res.status(200).json(category);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getDetail: async (req,res)=>{
        try{
            const category = await Category.findById(req.params.id).populate("product");
            res.status(200).json(category);
        }catch(err){
            res.status(500).json(err);
        }
    },
    update: async (req,res)=>{
        try{
            const category = await Category.findById(req.params.id);
            await category.updateOne({$set:req.body});
            res.status(200).json("Update category successfull!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    delete: async (req,res)=>{
        try{
            await Chat.updateMany(
                {category:req.params.id},
                {category:null}
            );
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete category successfull");
        }catch(err){
            res.status(500).json(err);
        }
    }
};
module.exports = categoryController;