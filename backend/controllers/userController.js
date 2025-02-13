const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(
        ApiError.badRequest("Необходимо заполнить поля email и password")
      );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashedPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJWT(user.id, user.email, user.role);
    res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Такого пользователя не существует"));
    }
    const comparePassword = await bcrypt.compareSync(password, user.password);
    if (!comparePassword)
      return next(ApiError.badRequest("Введен неверный пароль"));
    const token = generateJWT(user.id, user.email, user.role);
    res.json({ token });
  }
  async check(req, res) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
