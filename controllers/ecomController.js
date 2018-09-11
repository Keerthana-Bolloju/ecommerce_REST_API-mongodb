const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib')

//importing mongoose here
const productModel = mongoose.model('Product')

const cartModel = mongoose.model('Cart')

/******************************** FOR PRODUCTS START *******************************************/

//function to get all products start
let getAllProducts = (req,res)=>{
    productModel.find()
    .select('-_v -_id')
    .lean()
    .exec((err,result)=>{
        if(err){
            console.log(err)
            logger.error(`Error Occured : ${err}`,'Database',10)
            let apiResponse = response.generate(true,'failed to find product details', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No product found', 'Product-Controller:getAllProducts')
            let apiResponse = response.generate(true,'Product Not found',404, null)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(false, 'Product details found', 200, result)
            res.send(apiResponse)
        }
    });
}//function to get all products end

//function to get products by product id start
let viewProductById = (req,res)=>{
    if(check.isEmpty(req.params.productId)){
        console.log('product id has to be passed')
        let apiResponse = response.generate(true,'product id is missing',null)
        res.send(apiResponse)
    }else{
        productModel.findOne({productId:req.params.productId})
        .exec((err,result)=>{
            if (err) {
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) { 
                logger.info('No Product Found', 'Product-Controller: viewProductById',7)
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Found Successfully', 'Product-Controller: viewProductById', 5)
                let apiResponse = response.generate(false, 'Product Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        });
    }
    
}//function to get products by product id end

//function to create products start
let createAProduct = (req,res)=>{
    let today = time.now
    let productId = shortid.generate()
    
    let newProduct = new productModel({
        productId:productId,
        productName:req.body.productName,
        model:req.body.model,
        brand:req.body.brand,
        isStockAvailable:req.body.isStockAvailable,
        price:req.body.price,
        description:req.body.description,
        productAddedOn:today
    })
    let specifications = (req.body.specifications != undefined && req.body.specifications != null && req.body.specifications != '') ? req.body.specifications.split(',') : []
    newProduct.specifications = specifications
    //fuction to save
    newProduct.save((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else {
            logger.info('Product Created Successfully', 'Product-Controller: createAProduct', 5)
            let apiResponse = response.generate(false, 'Product Created Successfully.', 200, result)
            res.send(apiResponse)
        }
    })
}

//function to create products end

//function to edit a product start
let editAProduct = (req,res)=>{
    if(check.isEmpty(req.params.productId)){
        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    }else{
        let options = req.body
        console.log(options)
        productModel.update({ 'productId': req.params.productId }, options, { multi: true })
        .exec((err,result) =>{
            if (err) {
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) { // handling 404 case
                logger.info('No Product Found', 'Product-Controller: editAProduct',7)
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Edited Successfully', 'Product-Controller: editAProduct', 5)
                let apiResponse = response.generate(false, 'Product Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}
//function to edit a product end

//function to delete a product start
let deleteAProduct = (req, res) => {
    if (check.isEmpty(req.params.productId)) {

        console.log('productID should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else{
            productModel.remove({ 'productIs': req.params.productId})
            .exec ((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found', 'Product-Controller: deleteAProduct',7)
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Deleted Successfully', 'Product-Controller: deleteAProduct', 5)
                let apiResponse = response.generate(false, 'Product Deleted Successfully.', 200, result)
                res.send(apiResponse)

            }
        })
  } 
}
//function to delete a product end

/******************************** FOR PRODUCTS END *******************************************/

/******************************** FOR CARTS START *******************************************/

//function to get all products in cart start
let getAllProductsCart = (req,res)=>{
    cartModel.find()
    .select('-_v -_id')
    .lean()
    .exec((err,result)=>{
        if(err){
            console.log(err)
            logger.error(`Error Occured : ${err}`,'Database',10)
            let apiResponse = response.generate(true,'failed to find product details from cart', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No product found', 'Product-Controller:getAllProductsCart')
            let apiResponse = response.generate(true,'Product Not found in cart',404, null)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(false, 'Product details in cart found', 200, result)
            res.send(apiResponse)
        }
    });
}//function to get all products in cart end

//function to create products start
let addInCart = (req,res)=>{
    let productId = shortid.generate()
    
    let newCartProduct = new cartModel({
        productId:productId,
        productName:req.body.productName
    })
    //fuction to save
    newCartProduct.save((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else {
            logger.info('Product added in cart Successfully', 'Cart-Controller: addInCart', 5)
            let apiResponse = response.generate(false, 'Product added in cart Successfully.', 200, result)
            res.send(apiResponse)
        }
    })
}

//function to add products in cart end

//function to delete a product from cart start
let deleteProductInCart = (req, res) => {
    
            cartModel.remove({ 'productIs': req.params.productId})
            .exec ((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found in cart', 'Cart-Controller: deleteProductInCart',7)
                let apiResponse = response.generate(true, 'Product Not Found in cart', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Deleted Successfully', 'Cart-Controller: deleteProductInCart', 5)
                let apiResponse = response.generate(false, 'Product Deleted from cart Successfully.', 200, result)
                res.send(apiResponse)

            }
        })
  } 

//function to delete a product from cart end


/******************************** FOR CARTS END *******************************************/

module.exports = {
    getAllProducts:getAllProducts,
    viewProductById:viewProductById,
    createAProduct:createAProduct,
    editAProduct:editAProduct,
    deleteAProduct:deleteAProduct,
    //cart product
    getAllProductsCart:getAllProductsCart,
    addInCart:addInCart,
    deleteProductInCart:deleteProductInCart
}