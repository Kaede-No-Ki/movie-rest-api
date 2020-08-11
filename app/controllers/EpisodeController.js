const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const {
  baseUrl,
  urlApi,
  seriesUrl,
  episodeUrl,
} = require("../helpers/Constant");

const { addHttp } = require("../helpers/HttpAddons");

const episode = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Axios.get(baseUrl + episodeUrl + id);
    const $ = cheerio.load(response.data);

    const urlStreaming = [];
    $("#player2")
      .children()
      .each((i, elem) => {
        urlStreaming.push({
          url: addHttp($(elem).find("iframe").attr("src")),
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
        urlStreaming,
        urlDownload,
      },
    });
  } catch (err) {
    res.send({ status: false, message: err.stack });
  }
};

module.exports = { episode };
