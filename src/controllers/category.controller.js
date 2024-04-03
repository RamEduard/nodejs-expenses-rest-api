import db from "../models/index.js";

export class CategoryController {
  static async getAll(req, res) {
    const allCategories = await db.Category.findAll();

    res.json({
      data: allCategories,
    });
  }

  static async create(req, res) {
    try {
      const { name, type } = req.body;
      const newCategory = db.Category.build({ name, type });

      await newCategory.save();

      res.json({
        data: newCategory?.dataValues,
        message: "Category created",
      });
    } catch (error) {
      console.error(`[CategoryController] ${error?.message}`, error?.stack);

      res.status(500).json({
        message: "Error creating category",
      });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    const categoryFound = await db.Category.findByPk(id);

    if (!categoryFound) {
      return res.status(404).json({
        message: "Category not found",
        statusText: 404,
      });
    }

    res.json({
      data: categoryFound?.dataValues,
      message: "Category found",
    });
  }

  static async updateById(req, res) {
    try {
      const { id } = req.params;
      const { name, type } = req.body;
      const categoryFound = await db.Category.findByPk(id);

      if (!categoryFound) {
        return res.status(404).json({
          message: "Category not found",
          statusText: 404,
        });
      }

      categoryFound.set({
        name,
        type,
      });

      await categoryFound.save();

      // await categoryFound.reload();

      res.json({
        data: categoryFound?.dataValues,
        message: "Category updated",
      });
    } catch (error) {
      console.error(`[CategoryController] ${error?.message}`, error?.stack);

      res.status(500).json({
        message: "Error updating category",
      });
    }
  }

  static async deleteById(req, res) {
    try {
      const { id } = req.params;
      const categoryFound = await db.Category.findByPk(id);

      if (!categoryFound) {
        return res.status(404).json({
          message: "Category not found",
          statusText: 404,
        });
      }

      await categoryFound.destroy();

      return res.json({
        message: "Category deleted",
      });
    } catch (error) {
      console.error(`[CategoryController] ${error?.message}`, error?.stack);

      res.status(500).json({
        message: "Error updating category",
      });
    }
  }
}
