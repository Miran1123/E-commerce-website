const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();

const port = process.env.PORT || 5000
const maxRequestBodySize = '50mb';

app.use(express.static("assets"));
app.use(express.json({limit: maxRequestBodySize}));
app.use(express.urlencoded({limit: maxRequestBodySize}));

app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', extended: true}));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('Connected!')).catch((e)=>{
    console.log("notConnected")
  });


app.get("/", function(req, res){
    res.send("connected");
    res.end();
});

app.use("/admin", require("./routes/admin"));
app.use("/productcategory", require("./routes/productcategory"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));

app.listen(port, ()=>{
    console.log("connect");
});