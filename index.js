const express = require('express')
const mongoose = require('mongoose')
const model = require('./models/product.model.js');
const Product = require('./models/product.model.js');
const app = express()

app.use(express.json());

app.get('/',(req,res) =>{
    res.send("Hello from node API");
});

app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.get('/api/product/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

//update a product
app.put('/api/product/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const products = await Product.findByIdAndUpdate(id, req.body);
        
        if(!products){
            return res.status(404).json({message: "product not found"});
        }
        
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post('/api/products', async (req, res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect("mongodb+srv://bryanab:3tqvf79hIN8MnC9C@backeddb.azhci36.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackedDB")
.then(()=>{
    console.log("Connected to Database");
    app.listen(3000,() =>{
        console.log('Server is running on port 3000');
    });
})
.catch(() =>{
    console.log("Connection Failed");
});