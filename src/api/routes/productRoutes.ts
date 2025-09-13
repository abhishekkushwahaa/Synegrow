import { Router } from "express";
import * as ProductController from "../controllers/ProductController";

const router = Router();

router.post("/", ProductController.addProduct);
router.get("/", ProductController.listProducts);
router.get("/:id", ProductController.getProductDetails);
router.patch("/:id", ProductController.updateStock);

export default router;
