//importing mongoose 
const mongoose = require('mongoose')

//importing schema
const Schema = mongoose.Schema;

let productSchema = new Schema (
    {
        productId:{
            type:String,
            unique:true
        },

        productName:{
            type:String,
            default:''
        },

        specifications:[],
        
        model:{
            type:String,
            default:''
        },
        brand:{
            type:String,
            default:''            
        },
        isStockAvailable:{
            type:Boolean,
            default:false
        },
        price:{
            type:Number,
            default:''
        },
        description:{
            type:String,
            default:''            
        },
        productAddedOn:{
            type:Date,
            default:Date.now
        }
    }    
)

mongoose.model('Product',productSchema);