const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const { baseUrl, urlApi } = require("../helpers/Constant");
const { extractId } = require("../helpers/Extractor");

const home = async (req, res, next) => {
  const response = await Axios.get(baseUrl);
  const $ = cheerio.load(response.data);

  const mostViewedResponse = $(".movies-list-wrap")
    .eq(0)
    .find("#topview-today")
    .find(".ml-item");
  let mostViewed = [];
  mostViewedResponse.each((i, elem) => {
    let item = {};
    const id = extractId($(elem).find("a").eq(0).attr("href"));
    const url = `${urlApi}/detail/${id}`;
    const title = $(elem).find("span.mli-info").eq(0).text();
    const thumbnail = $(elem).find("img.mli-thumb").eq(0).attr("data-original");
    item = { id, title, url, thumbnail };
    mostViewed.push(item);
  });

  const newEpisodeResponse = $(".movies-list-wrap").eq(1).find(".ml-item");
  let newEpisode = [];
  newEpisodeResponse.each((i, elem) => {
    let item = {};
    const id = extractId($(elem).find("a").eq(0).attr("href"));
    const url = `${urlApi}/ep/${id}`;
    const title = $(elem).find("span.mli-info").eq(0).text();
    const thumbnail = $(elem).find("img.mli-thumb").eq(0).attr("data-original");
    const episode = $(elem)
      .find("div.jt-info.jt-imdb")
      .eq(0)
      .text()
      .replace("Episode:", "")
      .trim();
    item = { id, title, url, thumbnail, episode };
    newEpisode.push(item);
  });
  const newDramaResponse = $(".movies-list-wrap").eq(2).find(".ml-item");
  let newDrama = [];
  newDramaResponse.each((i, elem) => {
    let item = {};
    const id = extractId($(elem).find("a").eq(0).attr("href"));
    const url = `${urlApi}/detail/${id}`;
    const title = $(elem).find("span.mli-info").eq(0).text();
    const thumbnail = $(elem).find("img.mli-thumb").eq(0).attr("data-original");
    item = { id, title, url, thumbnail };
    newDrama.push(item);
  });
  res.send({
    status: true,
    message: "succes",
    data: { mostViewed, newEpisode, newDrama },
  });
};

module.exports = { home };
