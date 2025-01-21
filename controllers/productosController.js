//Modulos
const mongoose = require("mongoose")
const productoModel = require("../models/productos")
const productoValidationSchema = require("../valiationSchemas/productoValidation")
const validationSchema = require("../valiationSchemas/productoValidation")

const productosController ={

    async createProduct(req,res){ //definimos crear producto y declaramos la data que sera el body de la request
        const data = req.body
        const productoNombre = data.nombre
        const productoPrecio = data.precio
        
        if(!data || !productoNombre || !productoPrecio){
            return res.status(400).json({message:"Debes proporcionar datos validos, como el nombre del producto / precio del producto"})
        }

        try {
            const validationResult = await productoValidationSchema.safeParse({ //validamos simple con zod para verificar que el nombre sea un string y el precio un numero
                nombre:productoNombre,
                precio:productoPrecio
            })

            if(validationResult.error){ //si la validacion da error es que los datos son invalidos
                return res.status(400).send("Datos invalidos: "+validationResult.error)
            }


            //Si todo es valido lo agregamos a la base de datos
            const newProductoNombre = productoNombre.toLowerCase()
            const newProducto = new productoModel({ //hacemos una nueva instancia del producto
                nombre:newProductoNombre,
                precio:productoPrecio
            })

            await newProducto.save() // y esperamos a que el producto sea agregado a la base de datos

            return res.status(200).json({message:"Producto agregado correctamente"})

        } catch (error) { //imprimimos / retornamos mensaje de error
            console.log(error) 
            return res.status(500).json({message:"Error interno al agregar el producto"})
        }
    },

    async deleteProductoWithName(req,res){
        const data = req.body
        const productoNombre = data.nombre

        if(!data || !productoNombre){
            res.status(400).json({message:"Debes entregar datos como el nombre"})
        }

        try{
            const validationResult = productoValidationSchema.safeParse({
                nombre:productoNombre
            })

            if(validationResult.error){
                return res.status(400).send("Datos invalidos: "+validationResult.error)
            }

            const newProductoNombre = productoNombre.toLowerCase()

            const deleteResult = await productoModel.deleteOne({ nombre: newProductoNombre });

            if(deleteResult.deletedCount === 0){
                return res.status(400).json({message:"Producto no encontrado"})
            }

            return res.status(200).json({message:"Producto eliminado correctamente"})
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message:"Error interno al eliminar el producto"})
        }
    },


    //Aqui van las funciones que no alteran la base de datos como:
    
    async searchProductoWithName(req,res){
        const data = req.body

        if(!data || !data.nombre){
            return res.status(400).json({message:"Debes entregar el nombre"})
        }

        const validationResult = await validationSchema.safeParse({
            nombre:data.nombre
        })

        if(validationResult.error){
            return res.status(400).send("Datos invalidos: "+ validationResult.error)
        }
        const nombreProducto = data.nombre.toLowerCase()

        try{
            const result = await productoModel.findOne({nombre:nombreProducto})
            return res.status(200).json(result)
        }
        catch(error){
            return res.status(500).json({message:"Error interno al buscar el producto"})
        }
    },

    async viewAllProductos(req,res){
        try {
            const allProductos = await productoModel.find({})
            return res.status(200).json({allProductos})
        } catch (error) {
            return res.status(500).json({message:"Error interno al obtener todos los productos"})
        }
    }
}

module.exports = productosController