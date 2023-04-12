const axios = require("axios");

exports.test = async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post("http://localhost:3002/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code == 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        return res.json(tokenResult.data);
      }
    }

    const result = await axios.get("http://localhost:3002/v1/test", {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (err) {
    console.log(err);
    if (err.response?.status == 419) {
      return res.json(err.response.data);
    }
    return next(err);
  }
};
