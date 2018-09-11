const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let cartSchema = new Schema(
    {
        productId:{
            type:String,
            unique:true
        },
        productName:{
            type:String,
            default:''
        }
    }
)

mongoose.model('Cart',cartSchema);