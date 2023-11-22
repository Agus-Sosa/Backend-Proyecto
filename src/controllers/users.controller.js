import { CustomError } from "../Services/error/CustomError.service.js";
import { UserService } from "../Services/users.service.js"
import { EError } from "../enums/EError.js";
export class usersController {
    static modifyRole = async(req, res)=> {
        try {
            const userId = req.params.uid
            // Verificar si el usuario existe
            const user = await UserService.getUserById(userId);
            const userRole = user.role;

            if(user.documents.length>=3 && user.status === "completo"){

                if(userRole==="user"){
                    user.role = "premium"
                } else if(userRole === "premium"){
                    user.role = "user"
                } else {
                    const customError = CustomError.createError({
                        name: 'ChangeRoleError',
                        cause: 'No se permite cambiar el rol del administrador',
                        message: 'No se permite cambiar el rol del administrador',
                        errorCode: EError.UNAUTHORIZED
                    })
                    throw customError
                }
                await UserService.updateUser(user._id, user)
                return res.json({status:"succes", message: `El nuevo rol del usuario es ${user.role}`})
            } else {
                res.status(404).json({status:"error", message: "El usuario no cargo todos los documentos"})
            }


        } catch (error) {
            res.status(500).json({status: 'error', message: error.message})
        }
    }
    static getUsers = async (req, res)=> {
        try {
            const users = await UserService.getUsers();
            res.status(200).json({status: 'success', users})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }


    static uploadDocuments = async (req, res)=> {
        try {
            const userId = req.params.uid;
            const user = await UserService.getUserById(userId);
            const identificacion = req.files?.identificacion?.[0]|| null;
            const domicilio = req.files?.domicilio?.[0] || null;
            const estadoDeCuenta = req.files?.estadoDeCuenta?.[0] || null;
            const docs = [];

            if(identificacion){
                docs.push({name:"identificacion", reference: identificacion.filename});
            };
            
            if(domicilio){
                docs.push({name:"domicilio", reference: domicilio.filename});
            };

            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta", reference: estadoDeCuenta.filename});
            }; 
            user.documents = docs;
            if(docs.length===3){
                user.status = "completo"

            } else {
                user.status = "incompleto"
                
            }

            const result = await UserService.updateUser(user._id, user);
            res.status(200).json({status:"success", data: result});

        } catch (error) {   
            res.status({status: "error", message: "No se pudo guardar los documentos"})
        }
    }
}