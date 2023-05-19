import Express from "express";
import {Router} from "express";
import controllers from "../controllers";
const router = Router()


router.post("/create", controllers.product.createProducts)
router.get("/getAll", controllers.product.getProducts)
router.put("/update",controllers.product.updateProducts)
router.delete("/delete",controllers.product.deleteProducts)
router.get("/find",controllers.product.findProducts)
router.get("/getBill", controllers.product.Factura)

export default router