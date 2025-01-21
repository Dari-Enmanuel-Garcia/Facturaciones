//modulos
const mongoose = require("mongoose")
require("dotenv").config()


//Appinit
const appInit ={
    async connectDB(){ // Nos conectamos a mongo db usando mongoose
        try{
            await mongoose.connect(process.env.MONGO_URI)
            console.log("Conectado a mongo db")
        }
        catch(error){
            console.log("Error al conectarse a mongoDB: "+error)
        }
    }
}

module.exports = appInit