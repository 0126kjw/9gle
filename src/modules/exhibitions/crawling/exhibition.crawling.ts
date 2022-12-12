import puppeteer from 'puppeteer';

export const crawlExhibitions = async () => {
  const trList = [];
  const exhibitionList = [];
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();
  await page.goto(
    'http://ticket.interpark.com/TPGoodsList.asp?Ca=Eve&SubCa=Eve_T&Sort=1',
  );

  await page.waitForSelector('tbody:nth-child(3)'); // 요소 로딩 대기
  let txt = await page.$eval('tbody:nth-child(3)', (x) => x.innerHTML);
  await browser.close();

  while (true) {
    const start = txt.indexOf('<tr>');

    if (start < 0) break;
    const end = txt.indexOf('</tr>');
    const temp = txt.slice(start + 4, end);
    txt = txt.slice(end + 5);
    trList.push(temp);
    txt = txt.replace('<h3>', '.');
    txt = txt.replace('</h3>', '.');
  }

  trList.forEach((text) => {
    const tempObj = {
      title: '',
      imgSrc: '',
      href: '',
      place: '',
      website: '',
      period: [],
    };

    const startOfImgAlt = text.indexOf('alt');
    const endOfImgAlt = text.indexOf('onerror');
    tempObj.title = text.slice(startOfImgAlt + 5, endOfImgAlt - 2);

    const startOfImgSrc = text.indexOf('<img src');
    const endOfImgSrc = text.indexOf('jpg');
    tempObj.imgSrc = text.slice(startOfImgSrc + 10, endOfImgSrc + 3);

    const startOfGroupCode = text.indexOf('GroupCode');
    const endOfGroupCode = text.indexOf('title');
    tempObj.href = text.slice(startOfGroupCode + 10, endOfGroupCode - 2);

    const startOfPlace = text.indexOf('PlaceOfFlag');
    const endOfPlace = text.indexOf('</a></td>');
    tempObj.place = text.slice(startOfPlace + 14, endOfPlace);

    const period = text.indexOf('~<br>');
    const regexForDot = /\./gi;
    const a = new Date(
      text.slice(period - 10, period).replace(regexForDot, '-'),
    );
    const b = new Date(
      text.slice(period + 13, period + 23).replace(regexForDot, '-'),
    );
    tempObj.period = [a, b];

    exhibitionList.push(tempObj);
  });

  return exhibitionList;
};
