// Funcion para generar un mensaje de error personalizado hacia el cliente

export const createUserErrorMsg = (user) => {
  return `
        Uno o mas campos son invalidos,
        Campos requeridos:
        name: Dato recibido ${user.first_name},
        lastname:Dato recibido ${user.lastname},
        email:Dato recibido ${user.email},
        `;
};
