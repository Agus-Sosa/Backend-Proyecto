
    const addToCart = (idProduct, cartId) => {
        
        fetch(`/api/carts/${cartId}/products/${idProduct}/`,  {
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
        })
        .catch(error => {
            Swal.fire({
                position: "top-end",
                icon: 'error',
                title: 'Error al agregar el producto al carrito',
                showConfirmButton: false,
                timer: 1500
            });
        })
    };
