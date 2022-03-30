import { Router } from "express";
import Controller from "../controllers/index.controller";

const router = Router();

router.post("/uploadFile", Controller.uploadFile);

export default router;
