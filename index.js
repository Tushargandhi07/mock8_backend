const express = require('express');
const { connection } = require("./config/db");
const { userRouter } = require('./routes/user.route');
const { restaurantRouter } = require('./routes/restaurant.route');
const { orderRouter } = require('./routes/order.route');

const app = express();
const PORT= process.env.PORT || 4440;
require('dotenv').config();
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Welcome")
});


app.use("/user",userRouter);
app.use("/restaurant",restaurantRouter);
app.use("/order",orderRouter);


app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error while connecting : ",error);
    }
    console.log(`server listening on ${PORT}`);
})