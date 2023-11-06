
    const addToCart = (idProduct, cartId) => {
        
        fetch(`http://localhost:8080/api/carts/${cartId}/products/${idProduct}/`,  {
            method: 'post'
        }).then(response => response.json())
        .then(data=> {
            Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Producto agregado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            logger.info(`Producto agregado correctamente: ${data}`);
        })
        .catch(error => {
            Swal.fire({
                position: "top-end",
                icon: 'error',
                title: 'Error al agregar el producto al carrito',
                showConfirmButton: false,
                timer: 1500
            });
            logger.error(`Error al agregar el producto ${idProduct} al carrito ${cartId}: ${error}`);
        })
    };
