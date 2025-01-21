const router = require("express").Router()
const productosController = require("../controllers/productosController")

router.post("/productos/createProducto",productosController.createProduct)
router.delete("/productos/deleteProducto",productosController.deleteProductoWithName)
router.get("/productos/viewAllProductos",productosController.viewAllProductos)
router.post("/productos/searchProductos",productosController.searchProductoWithName)


module.exports = router