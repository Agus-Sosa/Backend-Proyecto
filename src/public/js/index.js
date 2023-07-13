
const socket = io()


const productForm = document.getElementById('product-form')
productForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(productForm);
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const thumbnails = formData.get('thumbnails');
    const code = formData.get('code');
    const stock = formData.get('stock');
    const category = formData.get('category');

    const newProduct = {
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
    }

    socket.emit('new-product', newProduct)
    productForm.reset();
})





const productContainer = document.querySelector('.real-time_list');




// socket.on('product-created', (productCreated) => {
//     console.log('Producto creado correctamente', productCreated)
//     if(productCreated && productCreated.thumbnails){
//     const newProduct = document.createElement('ul')
//     newProduct.innerHTML = `
//     <li>
//     <img src="${productCreated.thumbnails}"/>
//     </li>
//     <li>${productCreated.title}</li>
//     <li>${productCreated.price}</li>
//     <buttton class="delete-product" data-id="${productCreated.id}">Eliminar</button>
//     `
//     productContainer.prepend(newProduct)
//     }
// })


// socket.on('product-created', (productCreated)=> {
//     if(productCreated && productCreated.thumbnails) {
//         const productContainer = document.getElementById('container-realTime')
//         const newProduct =document.createElement('ul');
//         newProduct.setAttribute('data-id', productCreated.id)
//         newProduct.innerHTML =`
//             <li>
//             <img src="${productCreated.thumbnails}" width="120px"/>
//             </li>
//             <li>${productCreated.title}</li>
//             <li>${productCreated.price}</li>
//             <button class="delete-product" id="delete-product" data-id="${productCreated.id}">Eliminar</button>`


//             productContainer.appendChild(newProduct)
            
//     }
// })


socket.on('product-created', (productCreated)=> {
    if(productCreated && productCreated.thumbnails) {
        const productContainer = document.getElementById('container-realTime')
        const newProduct =document.createElement('div');
        newProduct.setAttribute('data-id', productCreated.id)
        newProduct.classList.add('card')
        newProduct.innerHTML =`
           <article>
                <img src="${productCreated.thumbnails}" alt="" width="200px">
            </article>
            <div class="card-body">
                <h4>${productCreated.title}</h4>
                <p>$${productCreated.price}</p>
                <button class="delete-product" id="delete-product" data-id="${productCreated.id}">Eliminar</button>
            </div>`


            productContainer.appendChild(newProduct)
            
    }
})




productContainer.addEventListener('click', (event)=> {
    if(event.target.classList.contains('delete-product')){
        const productId =event.target.getAttribute('data-id');
        socket.emit('deleteProduct', productId)
    }
})

socket.on('deleting-product', (deleteProduct)=> {
    const productElement = document.querySelector(`div[data-id="${deleteProduct}"]`)
    if(productElement) {
        productElement.remove();
        console.log(`producto ${deleteProduct} eliminado correctamente`)
    }
})



// Se puede ver en la consola del navegador
socket.on('mensajeGeneral', data => {
    console.log(data)
})