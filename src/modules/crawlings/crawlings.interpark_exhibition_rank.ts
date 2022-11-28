import puppeteer from 'puppeteer';

export const exhibitionList = async () => {
  let trList = [];
  let ExhibitionList = [];
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
    let tempObj = {
      title: '',
      imgSrc: '',
      href: '',
      place: '',
      period: [],
    };

    const a1 = text.indexOf('<img src');
    const a2 = text.indexOf('jpg');
    tempObj.imgSrc = text.slice(a1 + 10, a2 + 3);

    const b1 = text.indexOf('GroupCode');
    const b2 = text.indexOf('title');
    tempObj.href =
      'https://tickets.interpark.com/goods/' + text.slice(b1 + 10, b2 - 2);

    const c1 = text.indexOf('alt');
    const c2 = text.indexOf('onerror');
    tempObj.title = text.slice(c1 + 5, c2 - 2);

    const d1 = text.indexOf('PlaceOfFlag');
    const d2 = text.indexOf('</a></td>');
    tempObj.place = text.slice(d1 + 14, d2);

    const e1 = text.indexOf('~<br>');
    const t5 = text.slice(e1 - 10, e1);
    const t6 = text.slice(e1 + 13, e1 + 23);
    tempObj.period = [text.slice(e1 - 10, e1), text.slice(e1 + 13, e1 + 23)];

    ExhibitionList.push(tempObj);
  });

  return ExhibitionList;
};
