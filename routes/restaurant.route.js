const express= require('express');
const {Restaurant}= require('../models/restaurant.model')

const restaurantRouter= express.Router();

restaurantRouter.get("/api/restaurants",async(req, res)=>{
    try {
        const allRestaurants = await Restaurant.find();
        res.status(200).send(allRestaurants)
        
    } catch (error) {
        res.status(404).send({"msg":"Error while getting data"})
    }
});

restaurantRouter.get("/api/restaurants/:id",async(req, res)=>{
    try {
        const id= req.params.id;
        const restaurant = await Restaurant.findById(id);
        res.status(200).send(restaurant)
        
    } catch (error) {
        console.log(error.message)
        res.status(404).send({"msg":"Error while getting data"})
    }
});

restaurantRouter.get("/api/restaurants/:id/menu",async(req, res)=>{
    try {
        const id= req.params.id;
        const restaurant = await Restaurant.findById(id);
        res.status(200).send(restaurant.menu);
        
    } catch (error) {
        res.status(404).send({"msg":"Error while getting data"})
    }
});

restaurantRouter.post("/api/restaurants/:id/menu",async(req, res)=>{
    try {
        const payload= req.body;
        const id= req.params.id;
        const restuarant = await Restaurant.findById(id);
        restuarant.menu.push(payload);
        await restuarant.save();

        res.status(200).send(restuarant.menu);
        
    } catch (error) {
        console.log(error.message)
        res.status(404).send({"msg":"Error while posting data"})
    }
});

restaurantRouter.post("/api/restaurants/create",async(req,res)=>{
    try {
        const {name, street, city, state, country,zip} = req.body;
        if(name==undefined ||street==undefined ||city==undefined ||state==undefined ||country==undefined ||zip==undefined){
            res.status(404).send({"msg":"Please fill all the credentials"})
        }
        else{
            const restaurant = new Restaurant({name, address:{street, city, state, country, zip}});
            await restaurant.save();
            res.status(200).send({"msg":"restaurant saved successfully"})
        }
    } catch (error) {
        res.status(404).send({"msg":"Error while creating restaurant"})
    }
});


restaurantRouter.delete("/api/restaurants/:id/menu/:menuid",async(req,res)=>{
  try {
    const id= req.params.id;
    const menuId= req.params.menuid;
    const restaurant = await Restaurant.findOneAndDelete(id);
    res.status(202).send({"msg":"Restaurant deleted successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(404).send({"msg":"Error while deleting restaurant menu"})
  }  
});


module.exports={
    restaurantRouter
}