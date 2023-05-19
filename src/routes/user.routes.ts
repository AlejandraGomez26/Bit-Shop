import Express from "express";
import {Router} from "express";
import controllers from "../controllers";
const router = Router()


router.post("/create", controllers.User.createUsers)
router.get("/getAll", controllers.User.getUsers)
router.put("/update",controllers.User.updateUser)
router.delete("/delete",controllers.User.deleteUser)
router.get("/find",controllers.User.findUser)


export default router
