import { Router } from "express";
import ProductManager from "../dao/fileSystem/controllers/controllers/ProductManager.js";

const products = new ProductManager()
const router = Router()


// Metodos con Fs
router.get('/', async(req, res)=> {

    try {
        const limit = req.query.limit
        let getProducts = await products.getProducts()

    if(limit) {
        const getLimit = parseInt(limit, 10)
        getProducts = getProducts.slice(0,  getLimit)
    }
    
    res.status(200).json(getProducts)

    } catch (error) {
        
        res.status(404).json({error: 'Ocurrio un error al obtener los productos'})
    }
    
})


//Get: Para buscar el producto por id

router.get('/:pid', async(req, res)=> {

    try {
        const pid = parseInt(req.params.pid)
        const getProductId = await products.getProductoById(pid)
        res.status(200).json({message: `Producto encontrado por id: ${pid}`, product: [getProductId]})
        
    } catch (error) {

        if(error instanceof Error) {
            res.status(404).json({error: error.message})
        } else{
        res.status(500).json({error: 'Error al obtener el id del producto'})
        }
    }


})


//Put: Actualizar producto 

router.put('/:pid', async(req, res)=> {
    try {
        const pid = parseInt(req.params.pid)
        const updateBody = req.body;

        if (Object.keys(updateBody).length === 0) {
            res.status(404).json({error: 'No existe ninguna cambio para el producto'})
            return;
        }

        products.updateProduct(pid, updateBody)
        const productoForUpdate = await products.getProductoById(pid)
        res.status(200).json({messagge: `Producto ${pid} actualizado correctamente`,product:  [productoForUpdate] })



    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({error: error.message})
        } else {
        res.status(500).json({error: 'Error al actualizar el producto'})
        }
    }


})


//Post: Crear un producto

router.post('/', async(req, res)=> {
    try {
        const bodyProd = req.body;
        products.addProducts(bodyProd)
        res.status(200).json({message: 'Producto creado correctamente', product: [bodyProd]})

    } catch (error) {

        if(error instanceof Error) {
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al crear el producto'})
        }
    }
})




//Delete: Eliminar un producto 

router.delete('/:pid', async(req, res)=> {
    try {
        const pid = parseInt(req.params.pid)
        products.deleteProduct(pid)
        res.status(200).json({message: `Producto ${pid} eliminado correctamente`})

    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({error: error.message})
        } else{        
        res.status(500).json({error: 'Error al eliminar el producto'})
        }
    }
})


// Metodos con Mongo




export {router as productRouter}