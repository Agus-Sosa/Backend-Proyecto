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
        } catch (error) {
            console.log(error)
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
}