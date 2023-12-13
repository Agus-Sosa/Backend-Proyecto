
const purchaseCart = (cartId)=> {
    fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data=> {
        detailPurchase(data.ticket)
    })/* .then(()=> {
        setTimeout(() => {
            window.location.href = '/products';
        }, 1000);
    }) */
    .catch(err=> {
        console.log("error", err)
    })
}


const detailPurchase= (ticket)=> {
    Swal.fire({
        title: 'Compra realizada',
        html: `Codigo de compra: ${ticket.code} <br/> Monto a pagar:  $${ticket.amount}<br/>Comprador: ${ticket.purchaser} <br/>  `,
        icon: 'success',
        confirmButtonText: 'Cerrar',
        allowOutsideClick: false
        }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar a la sección de productos después de cerrar el modal
            window.location.href = '/products';
        }
        });
}