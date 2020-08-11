module.exports = {
  baseUrl: "https://duniadrakor.net/",
  seriesUrl: "series/",
  episodeUrl: "episode/",
  drakorUrl: "korea-drama/",
  westUrl: "serial-barat/",
  asianUrl: "drama-asia/",
  moviesUrl: "movies/",
  urlApi:
    process.env.MODE == "DEVELOPMENT"
      ? `${process.env.URL_API_DEV}:${process.env.PORT}/`
      : process.env.URL_API_PROD,
};
