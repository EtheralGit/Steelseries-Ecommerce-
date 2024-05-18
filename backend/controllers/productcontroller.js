// import product model
import Product from "../models/productmodel.js";

export const newProduct = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length !== 2) {
      return res.status(400).json({ error: "Two files required" });
    }

    const { name, description, type, price } = req.body;

    if (!name || !description || !type || !price) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const file1 = req.files[0].path;
    const file2 = req.files[1].path;
    console.log(file1, file2);

    const newProduct = new Product({
      name,
      description,
      type,
      price,
      img: file1,
      mainImg: file2,
    });

    if (!newProduct) {
      return res.status(400).json({ error: "Failed to create the product" });
    }

    await newProduct.save();
    res.status(201).json({ message: "Product Created Successfully" });
  } catch (error) {
    console.log("Error in product controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const types = ["keyboard", "mice", "headset", "speaker", "microphone"];

    const allProduct = await Product.find({ type: { $in: types } });
    if (!allProduct || allProduct < 1) {
      return res.status(400).json({ error: "No Product Found" });
    }

    res.status(200).json(allProduct);
  } catch (error) {
    console.log("Error in getAllProduct controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTypeProduct = async (req, res) => {
  try {
    const type = req.params.type;

    const getType = await Product.find({ type });

    res.status(200).json(getType);
  } catch (error) {
    console.log("Error in getTypeProduct controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSelectedProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const selectedProduct = await Product.findOne({ _id: productId });
    if (selectedProduct < 1) {
      return res.status(400).json({ error: "Product not found!" });
    }
    res.status(200).json(selectedProduct);
  } catch (error) {
    console.log("Error in getSelectedProduct: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCartId = async (req, res) => {
  try {
    const { ids } = req.body;

    const products = await Product.find({ _id: { $in: ids } });

    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getCartId: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { search } = req.body;
    if (!search) {
      return res.status(400).json({ error: "Please fill the fields" });
    }

    const regex = new RegExp(search, "i"); // Membuat ekspresi reguler dari kata kunci dengan opsi case-insensitive

    const searchedProduct = await Product.find({
      $or: [{ name: { $regex: regex } }, { type: { $regex: regex } }],
    });

    if (!searchedProduct || searchedProduct.length === 0) {
      return res.status(400).json({ error: "No Product Found" });
    }

    res.status(200).json(searchedProduct);
  } catch (error) {
    console.log("Error in searchProduct: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
