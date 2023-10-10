export const createProductErrorMsg = (product)=> {
    return `Error al crear el producto:
            campos requeridos
            Nombre: ${product.title || 'Falta el nombre del producto'} 
            description: ${product.description || 'Falta agregar una descripcion'}
            price: ${product.price  || 'Falta agregar el precio'}
            thumbnail: ${product.thumbnail || 'Falta agregar una imagen'}
            code: ${product.code || 'Falta agregar un codigo'}
            stock: ${product.stock || 'Falta agregar el stock'}
            category: ${product.category || 'Falta agregar la categoria'}
            `;
};