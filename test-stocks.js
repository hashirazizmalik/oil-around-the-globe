import { JSDOM } from 'jsdom';
JSDOM.fromURL('https://tradingeconomics.com/united-states/crude-oil-stocks', {userAgent: "Mozilla/5.0"}).then(dom => {
  const d = dom.window.document.querySelector('.table-hover');
  if (d) {
    console.log(d.textContent.replace(/\s+/g, ' '));
  } else {
    console.log("Not found table-hover");
  }
}).catch(console.error);
