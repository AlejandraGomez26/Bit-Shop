import {Router} from "express"
import Users from "./user.routes"
import products from "./product.routes"
const router = Router()

// Accesos a las rutas  del api 
// rutas del usuario
router.use ("/user", Users)
// rutas del los productos 
router.use("/product",products)
export default router 