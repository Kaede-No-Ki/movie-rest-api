const addHttp = (link) => {
  if (link.search("http") == -1) {
    link = "https:" + link;
  }
  return link;
};

module.exports = { addHttp };
