
    const addToCart = (idProduct, cartId) => {
        
        fetch(`http://localhost:8080/api/carts/${cartId}/products/${idProduct}/`,  {
            method: 'post'
        }).then(response => response.json())
        .then(data=> {
            console.log('Producto agregado correctamente', data)
        })
        .catch(error => {
            console.log(`Error al agregar el producto ${idProduct} al carrito ${cartId} ${error}`)
        })
    };
