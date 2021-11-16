const { verifyToken } = require("../lib/jwt");

const verifyJwt =
  (block = true) =>
  (req, res, next) => {
    const header = req.headers["authorization"] ?? req.headers["Authorization"];
    if (!header && block) {
      res.sendStatus(401);
      return;
    }
    if (header) {
      const [type, token] = header.split(/\s+/);
      if (!/bearer/i.test(type) && block) {
        return res.sendStatus(401);
      }

      verifyToken(token)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch(() => (block && res.sendStatus(401)) || next());
    } else {
      next();
    }
  };

module.exports = verifyJwt;
