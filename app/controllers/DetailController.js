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
        ] = desc
          .split(":")[1]
          .replace("Country", "")
          .replace("Networks", "")
          .trim();
      }
    });

    // const description = $(".desc").eq(0).text();

    const episodes = [];
    // season : 1,
    // data : [
    //   {
    //     episode : asdasd,
    //     url : asasd
    //   },
    // ]
    $("#seasons")
      .children()
      .each((i, elem) => {
        const season = {};
        season.season = i + 1;
        season.data = [];
        const item = $(elem);
        const title = item.find("div.les-title").eq(0).text();
        const episodeContent = item.find("div.les-content").eq(0);
        console.log(episodeContent.text());
        if (episodeContent.text().trim() != "No Episodes Available") {
          episodeContent.children().each((i, elem) => {
            season.data.push({
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
        descriptions,
        episodes,
      },
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = { series };
