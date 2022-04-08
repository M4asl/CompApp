const Product = require("../models/productModel");
const { cloudinary } = require("../utils/cloudinaryUtils");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.productList = catchAsync(async (req, res) => {
  const productList = await Product.find({});

  res.json(productList);
});

exports.productById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new AppError("Product not found.", 404));
  }

  res.status(200).json(product);
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, description, category, price, image } = req.body;

  if (!name || !description || !category || !price || !image) {
    return next(new AppError("Please provide all fields.", 400));
  }

  const fileStr = image;
  const result = await cloudinary.uploader.upload(fileStr, {
    folder: "compApp/images",
  });

  const productData = {
    name,
    description,
    category,
    price,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  };

  const product = await Product.create(productData);

  res.json(product);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new AppError("Product not found.", 404));
  }

  const { name, description, category, price, image } = req.body;

  if (!name || !description || !category || !price || !image) {
    return next(new AppError("Please provide all fields.", 400));
  }

  const fileStr = image;
  const result = await cloudinary.uploader.upload(fileStr, {
    folder: "compApp/images",
  });

  const productData = {
    name,
    description,
    category,
    price,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    productData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.json(updatedProduct);
});

exports.removeProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);
  return res.status(204).json(product);
});
