const logoutSession = async()=> {
    try {
        const response = await fetch('/api/sessions/logout', {
            method: 'post'
        })
        if(response.redirected) {
            window.location.href = response.url;
        }
    } catch (error) {
        console.error(`Error al cerrar sesion ${error}`)
    }
}