const extractId = (link) => {
  const itemExtract = link.split("/");
  return itemExtract[itemExtract.length - 2];
};

module.exports = { extractId };
