import express from "express";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getServices)
  .post(protect, createService);

router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

export default router;
