import express from "express";
import {
  AddVendor,
  GetAllVendor,
  GetVendorById,
} from "../controllers/vendor.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/vendor/add-vendor", isAuthenticated, AddVendor);
router.get("/vendor/get-vendor",isAuthenticated, GetAllVendor);
router.get("/vendor/get-vendor-byId/:id", isAuthenticated, GetVendorById);

export default router;
