import { upload } from "../middlewares/multer.middleware.js";
import { fileUpload,getFile} from "../controllers/user.controller.js"; 
import express from "express";
import { extractTextHandler } from "./extract.route.js";
const router = express.Router();

router.route('/file-upload').post(upload.single('file'), fileUpload);
router.route('/get-file').get(getFile);


router.route('/extract-text').post(extractTextHandler);
export default router;
