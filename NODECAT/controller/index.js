const axios = require("axios");

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN;

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    }); // API 요청
  } catch (error) {
    if (error.response?.status === 419) {
      // 토큰 만료시 토큰 재발급 받기
      delete req.session.jwt;
      return request(req, api);
    } // 419 외의 다른 에러면
    throw error;
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const result = await request(req, "/posts");
    res.render("main", { twits: result.data.payload });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.render("main", { twits: result.data.payload });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.searchByHashtag = async (req, res, next) => {
  try {
    const result = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.query.hashtag)}`
    );
    res.render("main", { twits: result.data.payload });
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    await request(req, `/posts/update/${encodeURIComponent(req.params.id)}/`, {
      headers: { authorization: req.session.jwt },
    });
    this.renderMain();
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await request(req, `/posts/delete/${encodeURIComponent(req.params.id)}`, {
      headers: { authorization: req.session.jwt },
    });
    this.renderMain();
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
};

exports.renderMain = (req, res) => {
  res.render("main", { key: process.env.CLIENT_SECRET });
};
