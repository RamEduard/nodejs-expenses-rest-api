import db from "../models/index.js";
import { RecordService } from "../services/record.service.js";

export class RecordController {
  static async getAll(req, res) {
    const { page = 1, limit = 12 } = req.query;
    const recordService = new RecordService(db.Record);

    const paginatedResults = await recordService.getPaginated({
      page: +page,
      limit: +limit,
    });

    res.json({
      ...paginatedResults,
      message: "Records paginated",
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

  static async getTotals(req, res) {
    const { from, to } = req.params;
    const recordService = new RecordService(db.Record);

    const totals = await recordService.getTotals(from, to);

    res.json({
      data: totals,
      message: `Totals from ${from} to ${to}`,
    });
  }

  static async getTotalsByCategory(req, res) {
    const { from, to } = req.params;
    const recordService = new RecordService(db.Record);

    const totalsByCategory = await recordService.getTotalsByCategory(from, to);

    res.json({
      data: totalsByCategory,
      message: `Totals grouped by category from ${from} to ${to}`,
    });
  }

  static async getTotalsByMonth(req, res) {
    const { from, to } = req.params;

    const recordService = new RecordService(db.Record);

    const totalsByMonth = await recordService.getTotalsByMonth(from, to);

    res.json({
      data: totalsByMonth,
      message: `Totals grouped by month from ${from} to ${to}`,
    });
  }
}
