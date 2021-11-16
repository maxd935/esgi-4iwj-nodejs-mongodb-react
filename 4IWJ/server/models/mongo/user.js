const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  lastname: {
    type: String,
  },
  firstname: {
    type: String,
  },
  address: {
    type: String,
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
