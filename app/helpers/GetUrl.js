require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

const streaming = async (url) => {
  let driver;
  let isOpen = false;
  try {
    // Navigate to Url
    console.log(url);
    if (url.search("fembed") !== -1) {
      console.log("jadi");
      isOpen = true;
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get(
        "http://gdriveplayer.to/embed.php?hash=gMZE9Ni9LKyMS4JesKzZFgDtgllmwrhYr2cw1j+nDyeFX59o+yH6ZHVUFxbiH8n+1GMn+GJzT4j2AZXFFYqhD/yIUsroXN4wnxDAk5tlOo391v+35ifcfAZWXWG6olfCRpEZARIL3rNF7PHg+cCV5MGLIWFg4Emn9gqHbun9nvQrfYO37/fZmgECf44EyNqxGVN/f3R3HV2CeYFGWDfM/Z/dOX0iyLJZ0G7XnHKMvgspT97qzhHg/FiREb6TXlhHw="
      );

      // let button = await driver.findElement(By.className("faplbu"));
      // await driver.executeScript("arguments[0].click();", button);
      // let window = await driver.getAllWindowHandles();
      // driver.switchTo().window(window[0]);

      let firstResult = await driver.findElement(By.tagName("iframe"));
      let url = await firstResult.getAttribute("src");
      //   driver.quit();
      return url;
    }
    return "-";
  } catch (e) {
    // let button = await driver.findElement(By.className("faplbu"));
    // await driver.executeScript("arguments[0].click();", button);
    // let window = await driver.getAllWindowHandles();
    // driver.switchTo().window(window[0]);

    // let firstResult = await driver.findElement(By.tagName("video"));
    // let url = await firstResult.getAttribute("src");
    //   driver.quit();
    console.log(e);
    return url;
  }
};

module.exports = { streaming };
