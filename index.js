const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require("morgan");

const port = process.env.PORT || 3000;
const server = require("http").createServer(app);
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
dotenv.config();
//connect database mongodb
mongoose.set('strictQuery', true);
mongoose.connect((process.env.MONGODB_URL),()=>{
    console.log("Connected to mongodb");
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));


app.use("/category",categoryRoute);
app.use("/product",productRoute);


server.listen(port, (req, res) => {
    console.log("Server is runing port: " + port);
})