import { JSDOM } from 'jsdom';
JSDOM.fromURL('https://markets.businessinsider.com/commodities/oil-price?type=wti', {userAgent: "Mozilla/5.0"}).then(dom => {
  const price = dom.window.document.querySelector('.price-section__current-value')?.textContent;
  console.log('WTI:', price);
}).catch(console.error);
