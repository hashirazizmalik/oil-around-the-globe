import { JSDOM } from 'jsdom';
JSDOM.fromURL('https://www.investing.com/economic-calendar/eia-crude-oil-inventories-75', {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}).then(dom => {
  const latest = dom.window.document.querySelector('#eventHistoryTable110 tbody tr:first-child');
  if(latest) {
    console.log(latest.textContent.trim());
  } else {
    console.log("Not found");
  }
}).catch(console.error);
