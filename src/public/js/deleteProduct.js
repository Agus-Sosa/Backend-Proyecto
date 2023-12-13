const deleteProduct = (idProduct)=> {

    fetch(`/api/products/${idProduct}`, {
        method: 'DELETE'

    }).then(response => response.json())

    .then(data=> {
        Swal.fire({
            position: "top-end",
            icon: 'success',
            title: 'Se elimino el producto correctamente',
            showConfirmButton: false,
            timer: 1200
        }).then(() => {
            setTimeout(() => {
                window.location.href = '/products';
            }, 1000);
        });
    })
    .catch(error => {
        Swal.fire({
            position: "top-end",
            icon: 'error',
            title: 'Error al eliminar el producto',
            showConfirmButton: false,
            timer: 1500
        });
    })
    
    ;
}