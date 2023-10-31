import { CustomError } from "../Services/error/CustomError.service.js";
import { UserService } from "../Services/users.service.js"
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
                return  res.json({status:"error", message: "No se permite cambiar el role del admin"})
            }
            await UserService.updateUser(user._id, user)
            return res.json({status:"succes", message: `El nuevo rol del usuario es ${user.role}`})
        } catch (error) {
            console.log(error)
            res.json({status: 'error', message: error.message})
        }
    }
}