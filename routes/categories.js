const {categorie} = require('../models/categorie');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categorieList = await Categorie.find();

    if(!categorieList) {
        res.status(500).json({success: false})
    }
    res.send(categorieList);
})

module.exports =router;