const { Brand } = require("../models/models");

class BrandController {
  async getAll(req, res) {
    const types = await Brand.findAll();
    return res.json(types);
  }
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
}

module.exports = new BrandController();
