
    const addToCart = (idProduct, cartId) => {
        
        fetch(`http://localhost:8080/api/carts/${cartId}/products/${idProduct}/`,  {
            method: 'post'
        }).then(response => response.json())
        .then(data=> {
            logger.info(`Producto agregado correctamente: ${data}`);
        })
        .catch(error => {
            logger.error(`Error al agregar el producto ${idProduct} al carrito ${cartId}: ${error}`);
        })
    };
