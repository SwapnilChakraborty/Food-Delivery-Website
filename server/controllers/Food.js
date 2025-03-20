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
    console.log("Query parameters:", req.query);
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
      if (minPrice) {
        const parsedMin = parseFloat(minPrice);
        if (isNaN(parsedMin)) return next(createError(400, "Invalid minPrice"));
        filter.price.$gte = parsedMin;
      }
      if (maxPrice) {
        const parsedMax = parseFloat(maxPrice);
        if (isNaN(parsedMax)) return next(createError(400, "Invalid maxPrice"));
        filter.price.$lte = parsedMax;
      }
    }

    if (search) {
      filter.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { desc: { $regex: new RegExp(search, "i") } },
      ];
    }

    console.log("Constructed filter:", filter);
    const foodList = await Food.find(filter);
    return res.status(200).json(foodList);
  } catch (err) {
    console.error("Error in getFoodItems:", err);
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

// New: Search functionality
export const searchFoodItems = async (req, res, next) => {
  try {
    const { search } = req.query;
    if (!search) {
      return next(createError(400, "Search query is missing"));
    }
    
    const filter = {
      $or: [
        { name: { $regex: new RegExp(search, "i") } },
        { desc: { $regex: new RegExp(search, "i") } }
      ]
    };

    const results = await Food.find(filter);
    return res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};
