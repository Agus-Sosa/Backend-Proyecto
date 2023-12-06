const deleteUser = (userid)=> {

    fetch(`/api/users/deletUser/${userid}`, {
        method: 'DELETE'

    }).then(response => response.json())

    .then(data=> {
        Swal.fire({
            position: "top-end",
            icon: 'success',
            title: 'Usuario eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
        });
    })
    .catch(error => {
        Swal.fire({
            position: "top-end",
            icon: 'error',
            title: 'Error al eliminar el usuario',
            showConfirmButton: false,
            timer: 1500
        });
    })
    
    ;

}