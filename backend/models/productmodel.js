// import mongoose
import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    mainImg: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["keyboard", "headset", "speaker", "mice", "microphone"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
