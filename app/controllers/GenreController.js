const cheerio = require("cheerio");
const { baseUrl, urlApi, seriesUrl } = require("../helpers/Constant");
const { extractId, isSeries } = require("../helpers/Extractor");
const { convertToBanner } = require("../helpers/BannerImage");
const { default: Axios } = require("axios");

const genreList = async (req, res) => {
  try {
    const response = await Axios.get(baseUrl);
    const $ = cheerio.load(response.data);
    const elements = $(".sub-container");
    let obj = {};
    let genreList = [];
    obj.status = true;
    obj.message = "succes";
    elements.find("ul >li").each((i, elem) => {
      genreList.push({
        id: $(elem).find("a").attr("href").replace(baseUrl, ""),
        title: $(elem).find("a").text(),
        url: `${urlApi}genre/${extractId($(elem).find("a").attr("href"))}`,
      });
      obj.data = {
        list: genreList,
      };
    });
    res.send(obj);
  } catch (err) {
    res.send({ status: false, message: err.stack });
  }
};
const genre = async (req, res) => {
  try {
    let { genre, page } = req.params;
    if (!genre) throw { stack: "Param Undefined" };
    page = page ? (page == 0 ? 1 : page) : 1;
    const url = `${baseUrl}${genre}/page/${page}`;
    console.log(url);
    const response = await Axios.get(url);
    const $ = cheerio.load(response.data);

    const genreResponse = $(".movies-list-wrap").eq(0).find(".ml-item");

    let list = [];
    genreResponse.each((i, elem) => {
      const id = extractId($(elem).find("a").eq(0).attr("href"));
      const url = $(elem).find(".ml-mask").attr("href");
      if (url.search("/episode/") == -1) {
        list.push({
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
    let nextUrl = null;
    $(".pagination")
      .eq(0)
      .children()
      .each((i, elem) => {
        const nextIndex = parseInt(page) + 1;
        if (nextIndex == $(elem).text()) {
          nextUrl = `${urlApi}genre/${genre}/${nextIndex}`;
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

module.exports = { genreList, genre };
