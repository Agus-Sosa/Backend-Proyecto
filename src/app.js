import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import {productRouter} from './routes/product.routes.js'
import {cartRouter} from './routes/carts.routes.js'
import { viewRouter } from './routes/view.routes.js'
import ProductManager from './models/ProductManager.js'


const product = new ProductManager()

const app = express()
const port = 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configurar carpeta public
app.use(express.static(__dirname + '/public'))


// Configurar handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Configurar rutas de express
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(viewRouter)

// Configurar servidor
const httpServer = app.listen(port, ()=> console.log(`Server Up ${port}`));
const socketServer = new Server(httpServer)

// Configurar socket del lado del servidor
socketServer.on('connection', (socket)=> {

    console.log(`Cliente nuevo conectado ${socket.id}`)
    // Se recibe el producto que fue enviado desde el cliente
    socket.on('new-product', (newProduct) => {
        const newProductCreated = product.addProducts(newProduct);
        // El servidor manda el producto creado al cliente
        socketServer.emit('product-created', newProductCreated)
    })

    socket.on('deleteProduct', (productId)=> {
        // const parseProductId = parseInt(productId)
        product.deleteProduct(productId)
        socketServer.emit('deleting-product', productId)
    })
    
    socketServer.emit('mensajeGeneral', 'Este es un mensaje para todos')
})