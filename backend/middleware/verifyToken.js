const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "未提供 Token，請先登入" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 將解碼後的 userId 附加到 `req.user`
    next(); // 繼續執行後續的控制器
  } catch (error) {
    return res.status(401).json({ message: "無效的 Token，請重新登入" });
  }
};

module.exports = verifyToken;
