const deleteProductFromCart = (idCart, idProduct)=> {
    const button = event.target; // Obtenemos una referencia al botón presionado

    fetch(`/api/carts/${idCart}/products/${idProduct}`, {
        method: 'DELETE'

    }).then(response => response.json())

    .then(data=> {
        const productDiv = button.closest('.cart_products');
        if (productDiv) {
            productDiv.remove();

            // Muestra un mensaje de éxito
            Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Producto eliminado del carrito correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            throw new Error('No se pudo encontrar el elemento del producto en el carrito');
        }
    })
    .catch(error => {
        Swal.fire({
            position: "top-end",
            icon: 'error',
            title: 'Error al eliminar el producto del carrito',
            showConfirmButton: false,
            timer: 1500
        });
    })
    
    ;
}