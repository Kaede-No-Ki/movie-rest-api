const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const {
  baseUrl,
  urlApi,
  drakorUrl,
  seriesUrl,
} = require("../helpers/Constant");
const { extractId, isSeries } = require("../helpers/Extractor");
const { addHttp } = require("../helpers/HttpAddons");

const list = async (req, res, next) => {
  let { id } = req.params;
  id = id ? id : 1;
  const url = baseUrl + drakorUrl + "page/" + id;
  console.log(url);

  const response = await Axios.get(url);
  const $ = cheerio.load(response.data);
  const list = [];

  $(".movies-list")
    .eq(0)
    .children()
    .each((i, elem) => {
      const url = $(elem).find(".ml-mask").attr("href");
      if (url && isSeries(url)) {
        const id = extractId($(elem).find("a").eq(0).attr("href"));
        list.push({
          id,
          url: `${urlApi}detail/${seriesUrl}${id}`,
          title: $(elem).find("span.mli-info").eq(0).text(),
          quality: $(elem).find("span.mli-quality").eq(0).text(),
          thumbnail: $(elem).find("img.mli-thumb").eq(0).attr("data-original"),
        });
      }
    });

  let nextUrl = null;
  $(".pagination")
    .eq(0)
    .children()
    .each((i, elem) => {
      const nextIndex = parseInt(id) + 1;
      if (nextIndex == $(elem).text()) {
        nextUrl = `${urlApi}list/${nextIndex}`;
      }
    });
  res.send({
    status: true,
    message: "succes",
    data: { nextUrl, list },
  });
};

module.exports = { list };
