import fs from 'fs'
import path from 'path'
import __dirname from './utils.js'


const dataJson = path.join(__dirname, 'data', 'products.json')

class ProductManager {
    constructor () {
        this.products = []
        this.indexId = 1
        this.path = dataJson
    }


    saveProducts = () => {
        const jsonData = JSON.stringify(this.products, null, 3)

        try {
            fs.writeFileSync(this.path, jsonData, 'utf-8')
            console.log('Producto guardado correctamente')
        } catch (error) {
            console.error(`Error al leer el archivo ${error}`)
        }
    }



    generatedId = () => {
        return this.indexId++
        
    }


    addProducts = (title, description, price, thumbnail, code, stock ) => {
        
        
        if (!title || !description || !price || !thumbnail || !code || !stock) return console.error('Completar todos los campos')

        const existProduct = this.products.some(prod => prod.code === code) 

        if(existProduct) return console.error(`Ya existe el producto ${code}, coloque otro code`)


        const newProducts = {
            id: this.generatedId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        
        this.products.push(newProducts)

        this.saveProducts()
        console.log(`Producto ${newProducts.title} agregado correctamente `)
    }



    getProductoById = (idProduct) => {
        const data = fs.readFileSync(dataJson, 'utf-8')

        const productJson = JSON.parse(data)
        const productExist = productJson.find(prod => prod.id === idProduct)

        if(productExist) {
            console.log('Producto:', productExist)
            return productExist;


        } else {
            console.error(`El producto ${idProduct} no fue encontrado`)
        }
    }
    


    getProducts = () => {
        try {
            const data = fs.readFileSync(dataJson, 'utf-8')
            const products = JSON.parse(data)
            return products
            console.log(products)
            
        } catch (error) {
            console.error(`Error al obtener los productos ${error}`)
        }
    }       


    deleteProduct = (idProduct) => {

        const data = fs.readFileSync(this.path, 'utf-8')

        const productJson = JSON.parse(data)
        const deleteProduct = productJson.findIndex(prod => prod.id === idProduct)

        if(deleteProduct=== -1) {
            console.log(`Producto ${idProduct} no encontrado`)
            return;
        }


        productJson.splice(deleteProduct, 1)
        
        this.products = productJson
        this.saveProducts()

    }


    updateProduct = (idProduct, update)=> {
        const data = fs.readFileSync(this.path, 'utf-8')

        const productJson = JSON.parse(data)

        const productId = productJson.findIndex(prod => prod.id === idProduct)


        if(productId === -1) return console.log(`Producto ${productId} no encontrado`)

        const updateValues = {...productJson[productId], ...update}
        productJson[productId] = updateValues;

        fs.writeFileSync(this.path, JSON.stringify(productJson, null, 3));

        console.log(`Producto ${idProduct} actualizado correctamente`)

    }


}


const manager = new ProductManager();

// Productos 
manager.addProducts(
    'Msi Sword 15 A11UD-001', 
    '15,6 pulgadas Full HD (1920x1080) IPS 144hz. Intel Core i7-11800H hasta 4.6GHz. 8GB DDR4. Nvidia GeForce RTX 3050 Ti 4Gb GDDR6. SSD 512GB', 
    1542, 
    'https://i.ibb.co/5jjVJdz/thumbnail3.jpg',
    6405, 
    10
    );

manager.addProducts(
    'Lenovo V15 G2 ITL F6AR', 
    '15,6 pulgadas Full HD (1920x1080) TN Anti-Glare. Intel Core i5-1135G7 hasta 4.2GHz. 8GB DDR4. Intel Iris Xe Graphics, SSD 256GB', 
    925, 
    'https://i.ibb.co/nDYB1FK/thumbnail4.jpg', 
    3301, 
    20);




export default ProductManager;


// Trae el producto por id
manager.getProductoById(2);

// Actualiza el producto
manager.updateProduct(1, {price: 1200, stock: 30});


// Elimina todos los productos
// manager.deleteProduct(2)

// Trae todos los productos
// manager.getProducts()


