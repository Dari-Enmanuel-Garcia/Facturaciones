const mongoose = require("mongoose")
const mongoSchema = mongoose.Schema;

const productosSchemas = mongoSchema({
    nombre:{
        type:String,
        required:true
    },
    imagen:{
        type:String,
        default:"https://react.semantic-ui.com/images/wireframe/image.png"
    },
    precio:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("productos", productosSchemas);