//Modulos
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose")
const path = require("path")

//Rutas API
const productoRouters = require("./routers/productosRouters")
//Express config / declaraciones
const app = express();

app.use(cors({
    origin: 'http://localhost:3003'  }));

app.use(express.json());

app.use(express.static("view")) //servimos estaticamente los archivos de view

//uso de las rutas
app.use("/api",productoRouters)

//Helpers
const appInit = require("./helpers/appInit");

//Rutas main
app.get("/",(req,res)=>{
    res.redirect("/home")
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"view","index.html"))
})

app.get("/facturacion",(req,res)=>{
  res.sendFile(path.join(__dirname,"view","facturacion.html"))
})

app.get("/productos",(req,res)=>{
  res.sendFile(path.join(__dirname,"view","productos.html"))
})
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"view","404.html"))
})

//Conexiones y servidor
async function startServer() {
    const { PORT } = process.env;
  try {
    await appInit.connectDB() // conectamos amongodb
    if (mongoose.connection.readyState === 1) {

        app.listen(PORT, () => {
          console.log(
            "Servidor encendido en la direccion: http://localhost:" + PORT
          );
        });
    }

    else{
        console.log("No se ha encendido el servidor ")
    }
  } catch (error) {}
}

startServer()