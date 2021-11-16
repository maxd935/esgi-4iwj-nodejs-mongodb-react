const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        );
      },
    },
  },
  articles: Array,
});

const User = Mongoose.model("User", UserSchema);

module.exports = User;
