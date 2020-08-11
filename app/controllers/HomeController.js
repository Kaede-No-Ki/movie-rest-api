const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const {
  baseUrl,
  urlApi,
  seriesUrl,
  episodeUrl,
} = require("../helpers/Constant");
const { extractId, isSeries } = require("../helpers/Extractor");
const { convertToBanner } = require("../helpers/BannerImage");

const home = async (req, res, next) => {
  try {
    const response = await Axios.get(baseUrl);
    const $ = cheerio.load(response.data);

    const mostViewedResponse = $(".movies-list-wrap")
      .eq(0)
      .find("#topview-today")
      .find(".ml-item");
    const newDramaResponse = $(".movies-list-wrap").eq(2).find(".ml-item");
    const boxOfficeResponse = $(".movies-list-wrap").eq(3).find(".ml-item");
    const newMoviesResponse = $(".movies-list-wrap").eq(4).find(".ml-item");

    let mostViewed = [];
    mostViewedResponse.each((i, elem) => {
      const id = extractId($(elem).find("a").eq(0).attr("href"));
      const url = $(elem).find(".ml-mask").attr("href");
      if (url.search("/episode/") == -1) {
        mostViewed.push({
          id,
          type: isSeries(url) ? "series" : "movies",
          url: `${urlApi}${isSeries(url) ? seriesUrl : "movies/"}${id}`,
          title: $(elem).find("span.mli-info").eq(0).text(),
          quality: $(elem).find("span.mli-quality").eq(0).text(),
          thumbnail: $(elem).find("img.mli-thumb").eq(0).attr("data-original"),
          banner: convertToBanner(
            $(elem).find("img.mli-thumb").eq(0).attr("data-original")
          ),
        });
      }
    });

    let newSeries = [];
    newDramaResponse.each((i, elem) => {
      const id = extractId($(elem).find("a").eq(0).attr("href"));
      const url = $(elem).find(".ml-mask").attr("href");
      if (url.search("/episode/") == -1) {
        newSeries.push({
          id,
          type: isSeries(url) ? "series" : "movies",
          url: `${urlApi}${isSeries(url) ? seriesUrl : "movies/"}${id}`,
          title: $(elem).find("span.mli-info").eq(0).text(),
          quality: $(elem).find("span.mli-quality").eq(0).text(),
          thumbnail: $(elem).find("img.mli-thumb").eq(0).attr("data-original"),
          banner: convertToBanner(
            $(elem).find("img.mli-thumb").eq(0).attr("data-original")
          ),
        });
      }
    });

    let boxOffice = [];
    boxOfficeResponse.each((i, elem) => {
      const id = extractId($(elem).find("a").eq(0).attr("href"));
      const url = $(elem).find(".ml-mask").attr("href");
      if (url.search("/episode/") == -1) {
        boxOffice.push({
          id,
          type: isSeries(url) ? "series" : "movies",
          url: `${urlApi}${isSeries(url) ? seriesUrl : "movies/"}${id}`,
          title: $(elem).find("span.mli-info").eq(0).text(),
          quality: $(elem).find("span.mli-quality").eq(0).text(),
          thumbnail: $(elem).find("img.mli-thumb").eq(0).attr("data-original"),
          banner: convertToBanner(
            $(elem).find("img.mli-thumb").eq(0).attr("data-original")
          ),
        });
      }
    });

    let newMovies = [];
    newMoviesResponse.each((i, elem) => {
      const id = extractId($(elem).find("a").eq(0).attr("href"));
      const url = $(elem).find(".ml-mask").attr("href");
      if (url.search("/episode/") == -1) {
        newMovies.push({
          id,
          type: isSeries(url) ? "series" : "movies",
          url: `${urlApi}${isSeries(url) ? seriesUrl : "movies/"}${id}`,
          title: $(elem).find("span.mli-info").eq(0).text(),
          quality: $(elem).find("span.mli-quality").eq(0).text(),
          thumbnail: $(elem).find("img.mli-thumb").eq(0).attr("data-original"),
          banner: convertToBanner(
            $(elem).find("img.mli-thumb").eq(0).attr("data-original")
          ),
        });
      }
    });

    res.send({
      status: true,
      message: "succes",
      data: { mostViewed, newSeries, boxOffice, newMovies },
    });
  } catch (err) {
    res.send({ status: false, message: err.stack });
  }
};

module.exports = { home };
