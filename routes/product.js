const express = require('express')
const ecomController = require('./../controllers/ecomController')
const appConfig = require('./../config/appConfig')

module.exports.setRouter = function(app){
    let url = appConfig.apiVersion+'/products';//product url

    let cartUrl = appConfig.apiVersion+'/cart';//cart url

    app.get(url+'/all',ecomController.getAllProducts);
    /**
	 * @api {get} /api/v1/products/all Get all the products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
						specifications: object(type = array),
						model: "string",
						brand: "string",
						isStockAvailable: boolean,
						price: "string",
						description: "string",
						productAddedOn: "Date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(url+'/view/:productId',ecomController.viewProductById);
    /**
	 * @api {get} /api/v1/products/view/:productId Get the product by Id
	 * @apiVersion 0.0.1
	 * @apiGroup read
     *  
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
						specifications: object(type = array),
						model: "string",
						brand: "string",
						isStockAvailable: boolean,
						price: "string",
						description: "string",
						productAddedOn: "Date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(url+'/create',ecomController.createAProduct);
/**
	 * @api {get} /api/v1/products/create post and create the product 
	 * @apiVersion 0.0.1
	 * @apiGroup create
     *  
	 * @apiParam {String} productName productName of the blog passed as a body parameter
	 * @apiParam {String} description description of the blog passed as a body parameter
	 * @apiParam {String} model model of the blog passed as a body parameter
	 * @apiParam {String} brand brand of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
						specifications: object(type = array),
						model: "string",
						brand: "string",
						isStockAvailable: boolean,
						price: "string",
						description: "string",
						productAddedOn: "Date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
    app.put(url+'/:productId/edit',ecomController.editAProduct);
/**
	 * @api {put} /api/v1/products/:productId/edit Edit and update a product by Id 
	 * @apiVersion 0.0.1
	 * @apiGroup edit
     *  
     * @apiParam {String} productId The productId should be passed as the URL parameter
	 * @apiParam {String} productName productName of the blog passed as a body parameter
	 * @apiParam {String} description description of the blog passed as a body parameter
	 * @apiParam {String} model model of the blog passed as a body parameter
	 * @apiParam {String} brand brand of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
						specifications: object(type = array),
						model: "string",
						brand: "string",
						isStockAvailable: boolean,
						price: "string",
						description: "string",
						productAddedOn: "Date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */app.post(url+'/:productId/delete',ecomController.deleteAProduct);
/**
	 * @api {post} /api/v1/products/:productId/delete Delete a product by Id 
	 * @apiVersion 0.0.1
	 * @apiGroup delete
     *  
     * 
     * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
						specifications: object(type = array),
						model: "string",
						brand: "string",
						isStockAvailable: boolean,
						price: "string",
						description: "string",
						productAddedOn: "Date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(cartUrl+'/all',ecomController.getAllProductsCart);
    /**
	 * @api {get} /api/v1/cart/all Get all the products in cart
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found In Cart",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details In Cart",
	    "status": 500,
	    "data": null
	   }
	 */
    
    app.put(cartUrl+'/:productId/add',ecomController.addInCart);
    /**
	 * @api {put} /api/v1/cart/:productId/add Add product in cart
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found In Cart",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details In Cart",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(cartUrl+'/:productId/delete',ecomController.deleteProductInCart);
    /**
	 * @api {post} /api/v1/cart/:productId/delete Delete a product in cart
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found In Cart",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details In Cart",
	    "status": 500,
	    "data": null
	   }
	 */


}
