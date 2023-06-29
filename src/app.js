import express from 'express'
import ProductManager from './productManager.js'



const products = new ProductManager()

const app = express()

const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.get('/products', async(req, res)=> {

    try {
        const limit = req.query.limit
        let getProducts = await products.getProducts()

    if(limit) {
        const getLimit =parseInt(limit, 10)
        getProducts = getProducts.slice(0,  getLimit)
    }
    
    res.status(200).json(getProducts)

    } catch (error) {
        
        res.status(404).json({error: 'Ocurrio un error al obtener los productos'})
    }
    
})



app.get('/products/:pid', async(req, res)=> {

    try {
        const pid = parseInt(req.params.pid)
        const getProductId = await products.getProductoById(pid)
        let response 

        if(getProductId){

            const message = `Producto encontrado por Id: ${pid}`
            response = {message, product: [getProductId]}

            res.status(200).json(response)

        } else {
            res.status(404).json({error: `El producto ${pid} no existe`})
        }
        
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el id del producto'})
    }


})



app.listen(port, ()=> console.log(`Server Up ${port}`))