import db from "../models/index.js";

export class RecordController {
  static async getAll(req, res) {
    const allRecords = await db.Record.findAll({ include: "category" });

    res.json({
      data: allRecords,
    });
  }

  static async getAllByType(req, res) {
    const { type } = req.params;
    const allRecords = await db.Record.findAll({
      include: "category",
      where: {
        type,
      },
    });

    res.json({
      data: allRecords,
    });
  }

  static async create(req, res) {
    try {
      const { amount, category, date, name, type } = req.body;
      const categoryFound = await db.Category.findOne({
        where: {
          name: category,
        },
      });
      const newRecord = db.Record.build({
        amount,
        categoryId: categoryFound?.id,
        date: new Date(date),
        name,
        type,
      });

      if (!categoryFound) {
        return res.status(400).json({
          message: "Category invalid",
          statusText: 400,
        });
      }

      await newRecord.save();

      res.json({
        data: newRecord?.dataValues,
        message: "Record created",
      });
    } catch (error) {
      console.error(`[RecordController] ${error?.message}`, error?.stack);

      res.status(500).json({
        message: "Error creating record",
      });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    const recordFound = await db.Record.findByPk(id);

    if (!recordFound) {
      return res.status(404).json({
        message: "Record not found",
        statusText: 404,
      });
    }

    res.json({
      data: recordFound?.dataValues,
      message: "Record found",
    });
  }

  static async updateById(req, res) {
    try {
      const { id } = req.params;
      const { amount, category, date, name, type } = req.body;
      const categoryFound = await db.Category.findOne({
        where: {
          name: category,
        },
      });
      const recordFound = await db.Record.findByPk(id);

      if (!categoryFound || !recordFound) {
        return res.status(400).json({
          message: "Category or record invalid",
          statusText: 400,
        });
      }

      recordFound.set({
        amount,
        date,
        name,
        type,
      });

      await recordFound.save();

      // await categoryFound.reload();

      res.json({
        data: recordFound?.dataValues,
        message: "Record updated",
      });
    } catch (error) {
      console.error(`[RecordController] ${error?.message}`, error?.stack);

      res.status(500).json({
        message: "Error updating record",
      });
    }
  }

  static async trashById(req, res) {
    try {
      const { id } = req.params;
      const recordFound = await db.Record.findOne({
        where: {
          id,
          deleted: false,
        },
      });

      if (!recordFound) {
        return res.status(400).json({
          message: "Record invalid",
          statusText: 400,
        });
      }

      recordFound.set({ deleted: true });

      await recordFound.save();

      return res.json({
        message: "Record moved to trash",
      });
    } catch (error) {
      console.error(`[RecordController] ${error?.message}`, error?.stack);

      res.status(500).json({
        message: "Error moving to trash",
      });
    }
  }

  static async deleteById(req, res) {
    try {
      const { id } = req.params;
      const recordFound = await db.Record.findOne({
        where: {
          id,
        },
      });

      if (!recordFound) {
        return res.status(404).json({
          message: "Record not found",
          statusText: 404,
        });
      }

      await recordFound.destroy();

      return res.json({
        message: "Record deleted",
      });
    } catch (error) {
      console.error(`[RecordController] ${error?.message}`, error?.stack);

      res.status(500).json({
        message: "Error deleting record",
      });
    }
  }
}
