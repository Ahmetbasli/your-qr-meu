const express = require("express");
//const { find } = require("../models/product");
const router = express.Router();
const upload = require("../multer");
const ProductService = require("../servers/product-service");
const CategoryService = require("../servers/category-service");

router.post(
  "/create/:categoryId",
  upload.single("productImage"),
  async (req, res) => {
    console.log(req.body.title);
    const data = {
      title: req.body.title,
      productImage: req.file?.path,
      description: req.body.description,
      productPrice: req.body.price,
    };
    const newProduct = await ProductService.add(data);

    const category = await CategoryService.find({ _id: req.params.categoryId });
    await ProductService.addNewProductToaCategory(category, newProduct);
    res.send(category);
  }
);
//
router.put("/update/:id", async (req, res) => {
  const product = await ProductService.find(req.params.id);
  const data = req.body;

  ProductService.update(product, data);
  res.send(data);
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await ProductService.del({ _id: id });
  res.send(deletedProduct);
});

module.exports = router;
