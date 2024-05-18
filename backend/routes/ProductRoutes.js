// import express
import express from "express";
// import code file
import {
  getAllProduct,
  newProduct,
  getTypeProduct,
  getSelectedProduct,
  getCartId,
  searchProduct,
} from "../controllers/productcontroller.js";

// import middleware
import adminRoute from "../middleware/adminRoute.js";
// import multer
import multer from "multer";

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// router setup
const router = express.Router();

// router api
router.post("/add-new", adminRoute, upload.array("file", 2), newProduct);
router.get("/all", getAllProduct);
router.get("/get/:type", getTypeProduct);
router.get("/get/selected/:id", getSelectedProduct);
router.post("/cart", getCartId);
router.post("/search", searchProduct);

export default router;
