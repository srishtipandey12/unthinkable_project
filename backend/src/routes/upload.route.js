import { upload } from "../middlewares/multer.middleware.js";
import { fileUpload,getFile} from "../controllers/user.controller.js"; 
// import { summarizeFile } from "../controllers/user.controller.js";
import express from "express";
import { extractTextHandler } from "./extract.route.js";
// import {  summarizeTextHandler } from "./summary.js";
const router = express.Router();

// Route for file upload
router.route('/file-upload').post(upload.single('file'), fileUpload);
router.route('/get-file').get(getFile);

// Route for file summarization
// router.route('/summarize').post(summarizeFile);
// router.get('/summarize/:fileId', summarizeFile);

router.route('/extract-text').post(extractTextHandler);
// router.route("/summarizeText").post(summarizeTextHandler);
export default router;
