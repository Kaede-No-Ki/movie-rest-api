const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const {
  baseUrl,
  urlApi,
  seriesUrl,
  episodeUrl,
} = require("../helpers/Constant");
const { extractId } = require("../helpers/Extractor");

const series = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Axios.get(baseUrl + seriesUrl + id);
    const $ = cheerio.load(response.data);

    const descResponse = $(".mvic-desc").eq(0);
    const descLeft = descResponse.find(".mvici-left").eq(0).children();
    const descRight = descResponse.find(".mvici-right").eq(0).children();

    const descriptions = {};

    const title = descResponse.find("h3").eq(0).text();

    descLeft.each((i, elem) => {
      const desc = $(elem).text().trim();
      if (desc.length > 0) {
        descriptions[
          desc.split(":")[0].toLocaleLowerCase().replace(" ", "")
        ] = desc.split(":")[1].trim();
      }
    });

    descRight.each((i, elem) => {
      const desc = $(elem).text().trim();
      if (desc.length > 0) {
        descriptions[
          desc.split(":")[0].toLocaleLowerCase().replace(" ", "")
        ] = desc.split(":")[1].replace("Country", "").trim();
      }
    });

    // const description = $(".desc").eq(0).text();

    const episodes = [];
    $(".les-content")
      .eq(0)
      .children()
      .each((i, elem) => {
        episodes.push({
          episode: $(elem).text().replace("Episode", "").trim(),
          url: urlApi + episodeUrl + extractId($(elem).attr("href") + "/"),
        });
      });

    res.send({
      status: true,
      message: "succes",
      data: {
        id,
        title,
        descriptions,
        episodes,
      },
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = { series };
