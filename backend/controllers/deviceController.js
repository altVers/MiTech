const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class DeviceController {
  async getAll(req, res) {
    let device;
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    if (!brandId && !typeId) {
      device = await Device.findAndCountAll({ limit, offset });
    }
    if (!brandId && typeId) {
      device = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && !typeId) {
      device = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      device = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }

    return res.json(device);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [
        {
          model: DeviceInfo,
          as: "info",
        },
      ],
    });
    return res.json(device);
  }
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId } = req.body;
      const { img } = req.files;
      let { info } = req.body;

      if (!img) {
        return res.status(400).json({ error: "Файл не был загружен" });
      }

      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new DeviceController();
