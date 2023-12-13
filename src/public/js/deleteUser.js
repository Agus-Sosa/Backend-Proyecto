const deleteUser = (userid)=> {
    const button = event.target;

    fetch(`/api/users/deleteUser/${userid}`, {
        method: 'DELETE'

    }).then(response => response.json())

    .then(data => {
        // Eliminar la fila correspondiente al usuario eliminado
        const userRow = button.closest('tr');
        if (userRow) {
            userRow.remove();

            // Mostrar mensaje de éxito
            Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Usuario eliminado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            throw new Error('No se pudo encontrar la fila del usuario en la tabla');
        }
    })
    .catch(error => {
        Swal.fire({
            position: "top-end",
            icon: 'error',
            title: error.message || 'Error al eliminar el usuario',
            showConfirmButton: false,
            timer: 1500
        });
    })
    
    ;

}