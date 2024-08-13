import mongoose from "mongoose";
import Food from "../models/Food.js";

const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const addProducts = async (req, res, next) => {
  try {
    const foodData = req.body;
    if (!Array.isArray(foodData)) {
      return next(createError(400, "Invalid request. Expected an array of foods."));
    }
    const createdFoods = await Food.insertMany(foodData);
    return res.status(201).json({ message: "Products added successfully", createdFoods });
  } catch (err) {
    next(err);
  }
};

export const getFoodItems = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, ingredients, search } = req.query;
    const filter = {};

    if (categories) {
      categories = categories.split(",");
      filter.category = { $in: categories };
    }

    if (ingredients) {
      ingredients = ingredients.split(",");
      filter.ingredients = { $in: ingredients };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { desc: { $regex: new RegExp(search, "i") } },
      ];
    }

    const foodList = await Food.find(filter);
    return res.status(200).json(foodList);
  } catch (err) {
    next(err);
  }
};

export const getFoodById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid product ID"));
    }
    const food = await Food.findById(id);
    if (!food) {
      return next(createError(404, "Food not found"));
    }
    return res.status(200).json(food);
  } catch (err) {
    next(err);
  }
};
