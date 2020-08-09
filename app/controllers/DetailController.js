const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const { baseUrl, urlApi, seriesUrl } = require("../helpers/Constant");
const { extractId } = require("../helpers/Extractor");

const series = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Axios.get(baseUrl + seriesUrl + id);
    const $ = cheerio.load(response.data);

    const descResponse = $(".mvic-desc").eq(0);
    const descLeft = descResponse.find(".mvici-left").eq(0).children();
    const descRight = descResponse.find(".mvici-right").eq(0).children();

    const title = descResponse.find("h3").eq(0).text();

    const genres = descLeft.eq(1).text().replace("Genre:", "").trim();
    const director = descLeft.eq(2).text().replace("Director:", "").trim();
    const actors = descLeft.eq(3).text().replace("Actors:", "").trim();
    const studio = descLeft.eq(4).text().replace("Studio:", "").trim();
    const tvStatus = descRight.eq(0).text().replace("TV Status:", "").trim();
    const duration = descRight.eq(1).text().replace("Duration:", "").trim();
    const release = descRight.eq(2).text().replace("Release:", "").trim();
    const rating = descRight.find(".imdb-r").eq(0).text();
    const networks = descRight
      .find(".imdb-r")
      .eq(0)
      .parent()
      .parent()
      .children()
      .eq(2)
      .text()
      .replace("Networks: ", "")
      .trim();

    const episodes = [];
    $(".les-content")
      .eq(0)
      .children()
      .each((i, elem) => {
        episodes.push({
          episode: $(elem).text().replace("Episode", "").trim(),
          url: $(elem).attr("href"),
        });
      });

    res.send({
      status: true,
      message: "succes",
      data: {
        id,
        title,
        genres,
        director,
        actors,
        studio,
        tvStatus,
        duration,
        release,
        rating,
        networks,
        episodes,
      },
    });
  } catch (err) {
    res.send(err);
  }
};

const episode = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Axios.get(baseUrl + seriesUrl + id);
    const $ = cheerio.load(response.data);

    const descResponse = $(".mvic-desc").eq(0);
    const descLeft = descResponse.find(".mvici-left").eq(0).children();
    const descRight = descResponse.find(".mvici-right").eq(0).children();

    const title = descResponse.find("h3").eq(0).text();

    const genres = descLeft.eq(1).text().replace("Genre:", "").trim();
    const director = descLeft.eq(2).text().replace("Director:", "").trim();
    const actors = descLeft.eq(3).text().replace("Actors:", "").trim();
    const studio = descLeft.eq(4).text().replace("Studio:", "").trim();
    const tvStatus = descRight.eq(0).text().replace("TV Status:", "").trim();
    const duration = descRight.eq(1).text().replace("Duration:", "").trim();
    const release = descRight.eq(2).text().replace("Release:", "").trim();
    const rating = descRight.find(".imdb-r").eq(0).text();
    const networks = descRight
      .find(".imdb-r")
      .eq(0)
      .parent()
      .parent()
      .children()
      .eq(2)
      .text()
      .replace("Networks: ", "")
      .trim();

    const episodes = [];
    $(".les-content")
      .eq(0)
      .children()
      .each((i, elem) => {
        episodes.push({
          episode: $(elem).text().replace("Episode", "").trim(),
          url: $(elem).attr("href"),
        });
      });

    res.send({
      status: true,
      message: "succes",
      data: {
        id,
        title,
        genres,
        director,
        actors,
        studio,
        tvStatus,
        duration,
        release,
        rating,
        networks,
        episodes,
      },
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = { series, episode };
