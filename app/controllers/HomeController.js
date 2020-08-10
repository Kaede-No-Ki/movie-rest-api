const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const {
  baseUrl,
  urlApi,
  seriesUrl,
  episodeUrl,
} = require("../helpers/Constant");
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
    const id = extractId($(elem).find("a").eq(0).attr("href"));
    mostViewed.push({
      id,
      url: `${urlApi}${seriesUrl}${id}`,
      title: $(elem).find("span.mli-info").eq(0).text(),
      quality: $(elem).find("span.mli-quality").eq(0).text(),
      thumbnail: $(elem).find("img.mli-thumb").eq(0).attr("data-original"),
    });
  });

  const newEpisodeResponse = $(".movies-list-wrap").eq(1).find(".ml-item");
  let newEpisode = [];
  newEpisodeResponse.each((i, elem) => {
    const id = extractId($(elem).find("a").eq(0).attr("href"));

    newEpisode.push({
      id,
      url: `${urlApi}${seriesUrl}${episodeUrl}${id}`,
      title: $(elem).find("span.mli-info").eq(0).text(),
      quality: $(elem).find("span.mli-quality").eq(0).text(),
      thumbnail: $(elem).find("img.mli-thumb").eq(0).attr("data-original"),
    });
  });

  res.send({
    status: true,
    message: "succes",
    data: { mostViewed, newEpisode },
  });
};

module.exports = { home };
