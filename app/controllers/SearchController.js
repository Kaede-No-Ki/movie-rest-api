const cheerio = require("cheerio");
const { default: Axios } = require("axios");
const {
  baseUrl,
  urlApi,
  seriesUrl,
  episodeUrl,
} = require("../helpers/Constant");
const { extractId, isSeries } = require("../helpers/Extractor");

const search = async (req, res, next) => {
  try {
    const query = req.params.query.replace(" ", "+");
    let page = req.params.page;
    page = page ? (page == 0 ? 1 : page) : 1;
    console.log(query);
    const response = await Axios.get(`${baseUrl}page/${page}/?s=${query}`);
    const $ = cheerio.load(response.data);
    const list = [];
    $(".movies-list")
      .eq(0)
      .children()
      .each((i, elem) => {
        const url = $(elem).find(".ml-mask").attr("href");
        if (url) {
          console.log(url);
          if (url.search("/episode/") == -1) {
            const id = extractId($(elem).find("a").eq(0).attr("href"));
            list.push({
              id,
              type: isSeries(url) ? "series" : "movies",
              url: `${urlApi}${isSeries(url) ? seriesUrl : "movies/"}${id}`,
              title: $(elem).find("span.mli-info").eq(0).text(),
              quality: $(elem).find("span.mli-quality").eq(0).text(),
              thumbnail: $(elem)
                .find("img.mli-thumb")
                .eq(0)
                .attr("data-original"),
            });
          }
        }
      });
    let nextUrl = null;
    $(".pagination")
      .eq(0)
      .children()
      .each((i, elem) => {
        const nextIndex = parseInt(page) + 1;
        if (nextIndex == $(elem).text()) {
          nextUrl = `${urlApi}search/${query}/${nextIndex}`;
        }
      });
    res.send({
      status: true,
      message: "succes",
      data: { nextUrl, list },
    });
  } catch (err) {
    res.send({ status: false, message: err.stack });
  }
};

module.exports = { search };
