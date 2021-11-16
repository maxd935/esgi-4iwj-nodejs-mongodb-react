const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/db");
const bcrypt = require("bcryptjs");
class User extends Model {}

User.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "user",
  }
);

const encodePassword = async (model, options) => {
  if (options.fields.includes("password")) {
    const salt = await bcrypt.genSalt(10);
    model.password = await bcrypt.hash(model.password, salt);
  }
};

User.addHook("beforeCreate", encodePassword);
User.addHook("beforeUpdate", encodePassword);

module.exports = User;
