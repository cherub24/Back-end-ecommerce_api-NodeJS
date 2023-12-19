const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');

// GET /products - Returns all products in the database.
router.get(`/`, async (req, res) => {
    const productList = await Product.find();
  
    if(!productList) {
      res.status(500).json({success: false})
    }
    res.send(productList); // Changed from `res.send` to `res.json` to send a JSON response
  });
  
  
  router.post(`/`, (req, res) => {
      const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
      })
      product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
      })).catch((err)=>{
        res.status(500).json({
          error: err,
          sucsess: false
        })
      })
      
    })

    module.exports =router;