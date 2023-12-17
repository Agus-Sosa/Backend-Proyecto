const changeRoleUser = (userId)=> {

    fetch(`/api/users/premium/${userId}`, {
        method: 'POST',
    }).then(response => response.json())

    .then(data=> {
        
        Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Se cambio el role del usuario correctamente',
                showConfirmButton: false,
                timer: 1200
            }).then(() => {
                setTimeout(() => {
                    location.reload();
                }, 1000);
            });
    })
    .catch(error => {
        Swal.fire({
            position: "top-end",
            icon: 'error',
            title: error.message ||  'Error al cambiar el role del usuario',
            showConfirmButton: false,
            timer: 1500
        });
    })
    
    ;
}


const NotChangeRoleUser =()=> {
    Swal.fire({
        position: "top-end",
        icon: 'error',
        title: "El usuario necesita subir todos los documentos",
        showConfirmButton: false,
        timer: 1500
    });
}