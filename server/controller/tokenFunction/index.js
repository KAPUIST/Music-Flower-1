const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generateAccessToken: (data) => {
    // TODO: Access token으로 sign합니다.
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  },

  sendAccessToken: (res, accessToken) => {
    // console.log(loginInfo);
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    res.cookie("jwt", accessToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: "none",
    });
  },

  isAuthorized: (req) => {
    // token 말고
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    const token = req.cookies.jwt;
    if (!token) {
      return null;
    }
    try {
      return verify(token);
    } catch (err) {
      return null;
    }
  },
};