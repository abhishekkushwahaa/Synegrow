import { Router } from "express";
import * as SupplierController from "../controllers/SupplierController";

const router = Router();

router.post("/", SupplierController.addSupplier);
router.get("/", SupplierController.listSuppliers);
router.get("/:id", SupplierController.getSupplierDetails);

export default router;
