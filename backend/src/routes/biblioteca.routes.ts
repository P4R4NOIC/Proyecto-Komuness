import multer from "multer";
import { Router } from "express";
import BibliotecaController from "@/controllers/biblioteca.controller";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/upload", upload.array('archivos'), BibliotecaController.uploadFiles as any);
router.get("list/:id", BibliotecaController.list as any);
router.post("/folder", upload.single('archivo'), BibliotecaController.createFolder as any);