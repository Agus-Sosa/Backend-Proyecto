class productManager {
    constructor () {
        this.products = []
        this.indexId = 1
    }


    saveProducts = (product) => {
        this.products.push(product)
        console.log(`Producto ${product.title} añadido correctamente`)
    }


    generatedId = () => {
        if(this.products.length === 0) return + 1 
        return this.products[this.products.length-1].id + 1
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

        this.saveProducts(newProducts)
    }



    getProductoById = (idProduct) => {
        const productExist = this.products.find(prod => prod.id === idProduct)
        if(productExist) {
            console.log(productExist)

        } else {
            console.error(`El producto ${idProduct} no fue encontrado`)
        }
    }
    


    getProducts = () => {
        console.log(this.products)
    }


}


const manager = new productManager();

manager.addProducts('Msi Sword 15 A11UD-001', '15,6 pulgadas Full HD (1920x1080) IPS 144hz. Intel Core i7-11800H hasta 4.6GHz. 8GB DDR4. Nvidia GeForce RTX 3050 Ti 4Gb GDDR6. SSD 512GB', 1542, 'https://i.ibb.co/5jjVJdz/thumbnail3.jpg',6405, 10)
manager.addProducts('Lenovo V15 G2 ITL F6AR', '15,6 pulgadas Full HD (1920x1080) TN Anti-Glare. Intel Core i5-1135G7 hasta 4.2GHz. 8GB DDR4. Intel Iris Xe Graphics, SSD 256GB', 925, 'https://i.ibb.co/nDYB1FK/thumbnail4.jpg', 3301, 20)
manager.getProducts()



