const express= require('express');
const { Restaurant } = require('../models/restaurant.model');
const { Order } = require('../models/order.model');

const orderRouter= express.Router();

orderRouter.post("/orders",async(req,res)=>{

        const user = req.user;
        const {restaurantid,name,price,quantity,totalprice,deliveryAddress}= req.body;

        const restaurant = await Restaurant.findById(restaurantid);
        if(restaurant){
            const myorder= await Order.insertMany([{user,restaurant:restaurantid,totalprice:quantity*price,deliveryAddress:deliveryAddress,status:"preparing"}]);
            myorder[0].items.push({name:name,price:price,quantity:quantity});
            await myorder[0].save();
            res.status(200).send({"msg": "order created successfully"})
        }
        else{
            res.status(404).send({"msg": "Not Found"});
        }
});

orderRouter.get("/api/orders/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const user = req.user;
        const myorder= await Order.find({_id:id,user});
        res.status(201).send(myorder);
    } catch (error) {
        res.status(404).send({"msg": "Not Found"});
    }
});

orderRouter.patch("/api/orders/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const {status}=req.body;
        // const user = req.user;
        const myorder= await Order.findByIdAndUpdate(id,{status});
        res.status(201).send({"msg":"order updated"});
    } catch (error) {
        res.status(404).send({"msg": "Not Found"});
    }
});




module.exports={
    orderRouter
}