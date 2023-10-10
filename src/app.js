import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import {productRouter} from './routes/product.routes.js';
import {cartRouter} from './routes/carts.routes.js';
import { viewRouter } from './routes/view.routes.js';
import { config } from './config/config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { sessionsRouter } from './routes/sessions.routes.js';
import { initializePassport } from './config/passportConfig.js';
import passport from 'passport';
import { ProductService } from './Services/product.service.js';
import { MessageService } from './Services/messages.service.js';
import { errorHandler } from './middlewares/errorHandler.js';

// genera los datos para crear el servidor
const app = express()
const PORT = config.server.port;

// Configurar express para que pueda entender los datos json y formulario
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configurar carpeta public
app.use(express.static(__dirname + '/public'))

// Configuracion de sessions
app.use(session({
    store:MongoStore.create({
        mongoUrl: config.mongo.url
    }),
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true
}));

// Configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());



// Configurar handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// Configurar rutas de express
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(viewRouter)
app.use('/api/sessions', sessionsRouter)

app.use(errorHandler);  



// Configurar servidor
const httpServer = app.listen(PORT, ()=> console.log(`Server Up ${PORT}`));
const io = new Server(httpServer)



// Configurar socket del lado del servidor
io.on('connection', async(socket)=> {
    console.log(`Cliente nuevo conectado ${socket.id}`)



// recibe el producto y lo guarda (mongo)
    socket.on('new-product', async(newProduct)=> {
        try {
            const newProductCreated = await ProductService.createProduct(newProduct)
            io.emit('product-created', newProductCreated)
        } catch (error) {
            console.error(`Error al crear el producto ${error}`)
        }
    })

// Recibe el id del producto que quiere eliminar (mongo)
    socket.on('deleteProduct', async(productId)=> {
        try {
        await ProductService.deletingProduct(productId)
        io.emit('deleting-product', productId)
        } catch (error) {
            console.error(`Error al eliminar el producto ${error}`)
        }
    })
    
    
    // obtiene los mensjaes
    try {
        const messageData2 =  await MessageService.getAllMessagesChat()
        io.emit('messagesLogs', messageData2)
    } catch(error) {
        console.error('Error al obtener los mensajes')
    }

    // obtiene los mensajes nuevos de los clientes
    socket.on('message', async(data)=> {
        const {user, message} = data
        try {
            await MessageService.addNewMessage(user, message)
            const messageData = await MessageService.getAllMessagesChat()
            io.emit('messagesLogs', messageData)
        } catch (error) {
            console.error('Error al guardar el mensaje')
        }
    })
    
    
    io.emit('mensajeGeneral', 'Este es un mensaje para todos')
});

// middleware para capturar el error y tenes mas control de ello
