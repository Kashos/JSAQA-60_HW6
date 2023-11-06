const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

describe("JSAQA-60 Home Work №5 tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/");
  });
  
  afterEach(() => {
    page.close();
  });

  test("Бронирование билета на фильм Терминатор-заржавел", async () => {
    await clickElement(page, 'body > nav > a:nth-child(3)');
    await clickElement(page, 'body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a');
    await page.waitForSelector('div.buying-scheme');
    await clickElement(page, 'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(10)');
    await clickElement(page, 'button');
    await page.waitForSelector('h2');
    let actual = await getText(page, `div > p:nth-child(2) > span`);;
    const expected = "5/10";
    expect(actual).toEqual(expected);
  }, 50000);

  test("Покупка нескольких билетов на фильм Зверополис", async () => {
    await clickElement(page, 'body > nav > a:nth-child(3)');
    await clickElement(page, 'body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a');
    await page.waitForSelector('div.buying-scheme');
    await clickElement(page, 'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(9) > span:nth-child(3)');
    await clickElement(page, 'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(9) > span:nth-child(4)');
    await clickElement(page, 'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(9) > span:nth-child(5)');
    await clickElement(page, 'button');
    await page.waitForSelector('h2');
    let actual = await getText(page, `div > p:nth-child(2) > span`);
    const expected = "9/3, 9/4, 9/5";
    expect(actual).toEqual(expected);
  }, 50000);

  test("Покупка билета на место в зале просмотра фильма Унесенные ветром, которое уже занято", async () => {
    await clickElement(page, 'body > nav > a:nth-child(3)');
    await clickElement(page, 'body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a');
    await page.waitForSelector('div.buying-scheme');
    await clickElement(page, 'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(6)');
    await clickElement(page, 'button');
    await page.waitForSelector('h2');
    await page.goto("https://qamid.tmweb.ru/");
    await clickElement(page, 'body > nav > a:nth-child(3)');
    await clickElement(page, 'body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a');
    await page.waitForSelector('div.buying-scheme');
    let actual = await getText(page, "div:nth-child(2) > p:nth-child(1)");
    const expected = " Занято";
    expect(actual).toEqual(expected);
  }, 50000);
});