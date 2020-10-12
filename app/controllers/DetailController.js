const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const {
  baseUrl,
  urlApi,
  seriesUrl,
  episodeUrl,
} = require("../helpers/Constant");
const { extractId } = require("../helpers/Extractor");
const { addHttp } = require("../helpers/HttpAddons");

const { getBanner } = require("../helpers/BannerImage");

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
    const thumbnail = $("img.hidden").eq(0).attr("src");
    const banner = $("#content-cover")
      .attr("style")
      .split("(")[1]
      .replace(");", "");

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
        ] = desc
          .split(":")[1]
          .replace("Country", "")
          .replace("Networks", "")
          .trim();
      }
    });

    const episodes = [];

    $("#seasons")
      .children()
      .each((i, elem) => {
        const season = {};
        season.season = i + 1;
        season.data = [];
        const item = $(elem);
        const episodeContent = item.find("div.les-content").eq(0);
        if (episodeContent.text().trim() != "No Episodes Available") {
          episodeContent.children().each((i, elem) => {
            season.data.push({
              id: extractId($(elem).attr("href") + "/"),
              episode: $(elem).text().replace("Episode", "").trim(),
              url:
                urlApi +
                seriesUrl +
                episodeUrl +
                extractId($(elem).attr("href") + "/"),
            });
          });
        }
        episodes.push(season);
      });

    res.send({
      status: true,
      message: "succes",
      data: {
        id,
        title,
        thumbnail,
        banner,
        descriptions,
        episodes,
      },
    });
  } catch (err) {
    res.send({ status: false, message: err.stack });
  }
};

const movies = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Axios.get(baseUrl + id);
    const $ = cheerio.load(response.data);

    const descResponse = $(".mvic-desc").eq(0);
    const descLeft = descResponse.find(".mvici-left").eq(0).children();
    const descRight = descResponse.find(".mvici-right").eq(0).children();

    const descriptions = {};

    const title = descResponse.find("h3").eq(0).text();
    const thumbnail = $("img.hidden").eq(0).attr("src");
    const banner = getBanner($(".mvi-cover").first().attr("style"));

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
        ] = desc
          .split(":")[1]
          .replace("Country", "")
          .replace("Networks", "")
          .trim();
      }
    });

    const urlStreaming = [];

    $(".movieplay").each((i, elem) => {
      urlStreaming.push({
        url: addHttp($(elem).children().first().attr("src")),
        name: `Server ${i + 1}`,
      });
    });

    const urlDownload = [];
    $(".btn-group")
      .eq(1)
      .children()
      .each((i, elem) => {
        urlDownload.push({
          url: addHttp($(elem).attr("href")),
          name: $(elem).find(".serv_tit").eq(0).text(),
        });
      });

    res.send({
      status: true,
      message: "succes",
      data: {
        id,
        title,
        thumbnail,
        banner,
        descriptions,
        urlStreaming,
        urlDownload,
      },
    });
  } catch (err) {
    res.send({ status: false, message: err.stack });
  }
};

module.exports = { series, movies };
