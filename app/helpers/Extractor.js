const extractId = (link) => {
  const itemExtract = link.split("/");
  return itemExtract[itemExtract.length - 2];
};

const isSeries = (link) => {
  const itemExtract = link.split("/");
  return itemExtract[3] == "series";
};

module.exports = { extractId, isSeries };
