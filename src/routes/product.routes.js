import { Router } from "express";
import ProductManager from "../dao/fileSystem/controllers/controllers/ProductManager.js";
import { ProductMongoManager } from "../dao/mongo/ProductMongoManager.js"; 
import { productService } from "../dao/mongo/Services/index.js";


// Clases con fs
const products = new ProductManager()

const router = Router()

// Clase con Mongo
// const productsMongo = new ProductMongoManager()


// // Metodos con Fs
// router.get('/', async(req, res)=> {

//     try {
//         const limit = req.query.limit
//         let getProducts = await products.getProducts()

//     if(limit) {
//         const getLimit = parseInt(limit, 10)
//         getProducts = getProducts.slice(0,  getLimit)
//     }
    
//     res.status(200).json(getProducts)

//     } catch (error) {
        
//         res.status(404).json({error: 'Ocurrio un error al obtener los productos'})
//     }
    
// })


// //Get: Para buscar el producto por id

// router.get('/:pid', async(req, res)=> {

//     try {
//         const pid = parseInt(req.params.pid)
//         const getProductId = await products.getProductoById(pid)
//         res.status(200).json({message: `Producto encontrado por id: ${pid}`, product: [getProductId]})
        
//     } catch (error) {

//         if(error instanceof Error) {
//             res.status(404).json({error: error.message})
//         } else{
//         res.status(500).json({error: 'Error al obtener el id del producto'})
//         }
//     }


// })


// //Put: Actualizar producto 

// router.put('/:pid', async(req, res)=> {
//     try {
//         const pid = parseInt(req.params.pid)
//         const updateBody = req.body;

//         if (Object.keys(updateBody).length === 0) {
//             res.status(404).json({error: 'No existe ninguna cambio para el producto'})
//             return;
//         }

//         products.updateProduct(pid, updateBody)
//         const productoForUpdate = await products.getProductoById(pid)
//         res.status(200).json({messagge: `Producto ${pid} actualizado correctamente`,product:  [productoForUpdate] })



//     } catch (error) {
//         if(error instanceof Error){
//             res.status(404).json({error: error.message})
//         } else {
//         res.status(500).json({error: 'Error al actualizar el producto'})
//         }
//     }


// })


// //Post: Crear un producto

// router.post('/', async(req, res)=> {
//     try {
//         const bodyProd = req.body;
//         products.addProducts(bodyProd)
//         res.status(200).json({message: 'Producto creado correctamente', product: [bodyProd]})

//     } catch (error) {

//         if(error instanceof Error) {
//             res.status(404).json({error: error.message})
//         } else {
//             res.status(500).json({error: 'Error al crear el producto'})
//         }
//     }
// })




// //Delete: Eliminar un producto 

// router.delete('/:pid', async(req, res)=> {
//     try {
//         const pid = parseInt(req.params.pid)
//         products.deleteProduct(pid)
//         res.status(200).json({message: `Producto ${pid} eliminado correctamente`})

//     } catch (error) {
//         if(error instanceof Error){
//             res.status(404).json({error: error.message})
//         } else{        
//         res.status(500).json({error: 'Error al eliminar el producto'})
//         }
//     }
// })


// 


/* Metodos con MongoDB */
// router.get('/', async(req, res)=> {
//     try {
//         const {page = 1, limit = 2, sort, query, category, avaible} = req.query;

//         const options ={
//             page: parseInt(page),
//             limit: parseInt(limit),
//             sort: sort === 'asc' ? {price: 1 } : sort === 'desc' ? {price: -1} :undefined
//         };

//         const filter = {};

//         if(query) {
//             filter.$text = {$search: query};
//         }

//         if(category){
//             filter.category = category
//         }

//         if(avaible){
//             filter.avaible = avaible === 'true'
//         }


//         const  productPaginated = await productsMongo.getAllProductsPaginated(options)


//         const response = {
//             status: 'Success',
//             payload: productPaginated.docs,
//             totalPages: productPaginated.totalPages,
//             prevPage: productPaginated.prevPage,
//             nextPage: productPaginated.nextPage,
//             page: productPaginated.page,
//             hasPrevPage: productPaginated.hasPrevPage,
//             hasNexPage: productPaginated.hasNexPage,
//             prevLink: productPaginated.prevPage ? `/products?page${productPaginated.prevPage}` : null,
//             nextPage: productPaginated.nextPage ? `/products?page${productPaginated.nextPage}` : null,
//         }


//         res.status(200).json(response)

//     } catch (error) {
//         if(error instanceof Error) {
//             res.status(404).json({error: error.message})
//         } else {
//             res.status(500).json({error: 'No se pudo obtener los productos'})
//         }
//     }
// })


router.get('/', async(req,res)=> {
    try {
        const {limit = 2, page = 1, stock, sort="asc"} =req.query;
        // console.log(limit, sort, page, stock);
        const stockValue = stock === 0 ? undefined : parseInt(stock);
        if(!["asc", "desc"].includes(sort)) {
            return res.render("products", {error: 'Orden no valida'})
        }
        const sortValue = sort === 'asc' ? 1 : -1;
        let query = {};
        if(stockValue) {
            query = {stock: {$gte: stockValue}}
        } 

        const result = await productService.getProductPerPage(query,{
            page,
            limit,
            sort:{price: sortValue},
            lean:true
        });
        // Http
        const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
        
        const resultProductsViews = {
            status: 'Success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNexPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
            nextLink: result.hasNextPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)}` : null
        }

        // console.log(result)
        console.log(resultProductsViews)
            
        res.status(200).json(resultProductsViews)
    } catch (error) {
        if(error instanceof Error) {
            res.status(404).send(error.message)
        } else {
            res.status(500).send('Error del servidor al mostrar los productos')
        }
    }
})




export {router as productRouter}