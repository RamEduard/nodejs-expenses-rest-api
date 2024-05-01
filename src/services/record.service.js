import { Model, Op, Sequelize } from "sequelize";

export class RecordService {
  /** @type {Model} */
  #recordModel = null;

  /**
   * RecordService constructor
   * @param {Model} recordModel
   */
  constructor(recordModel) {
    this.#recordModel = recordModel;
  }

  async getTotals(startDate, endDate) {
    const totals = { balance: 0, expense: 0, income: 0 };

    const result = await this.#recordModel.findAll({
      attributes: [
        "type",
        [Sequelize.fn("sum", Sequelize.col("amount")), "sumAmount"],
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: "type",
    });

    const records = result.map((row) => row.dataValues);

    if (!records.length) {
      return totals;
    }

    const expenseFound = records.find((row) => row.type === "expense");
    const incomeFound = records.find((row) => row.type === "income");

    if (incomeFound?.sumAmount > 0) {
      totals.income = incomeFound.sumAmount;
      totals.balance = incomeFound.sumAmount;
    }

    if (expenseFound?.sumAmount > 0) {
      totals.expense = expenseFound.sumAmount;
      totals.balance -= expenseFound.sumAmount;
    }

    return totals;
  }

  async getTotalsByCategory(startDate, endDate) {
    const result = await this.#recordModel.findAll({
      attributes: [
        // ? Postgres and MySQL could be [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("count", Sequelize.col("Record.id")), "count"],
        [
          Sequelize.fn("strftime", "%m", Sequelize.col("Record.createdAt")),
          "month",
        ],
        [Sequelize.fn("sum", Sequelize.col("amount")), "sumAmount"],
      ],
      include: ["category"],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ["month", [Sequelize.literal("category.name")]],
      order: [[Sequelize.literal("category.name"), "ASC"]],
    });

    return result.map((row) => ({
      count: row.dataValues?.count,
      category: row.dataValues?.category?.name,
      month: +row.dataValues?.month,
      sumAmount: row.dataValues?.sumAmount,
    }));
  }

  async getTotalsByMonth(startDate, endDate) {
    const result = await this.#recordModel.findAll({
      attributes: [
        // ? Postgres and MySQL could be [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("count", Sequelize.col("id")), "count"],
        [Sequelize.fn("strftime", "%m", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("sum", Sequelize.col("amount")), "sumAmount"],
        "type",
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ["month", "type"],
      order: [["type", "ASC"]],
    });

    return result.map((row) => ({
      count: row.dataValues?.count,
      month: +row.dataValues?.month,
      sumAmount: row.dataValues?.sumAmount,
      type: row.dataValues?.type,
    }));
  }

  async getPaginated(paginationOptions = {}) {
    const { page, limit = 12 } = paginationOptions || {}

    const countRecords = await this.#recordModel.count()
    const offset = (page - 1) * limit
    const pages = Math.ceil(countRecords / limit)
    const nextPage = page + 1 <= pages ? page + 1 : null
    const prevPage = page - 1 > 0 ? page - 1 : null

    const result = await this.#recordModel.findAll({
      include: ['category'],
      offset,
      limit
    })

    return {
      data: result.map(record => record?.dataValues),
      pagination: {
        limit,
        nextPage,
        page,
        pages,
        prevPage,
        total: countRecords
      }
    }
  }
}
