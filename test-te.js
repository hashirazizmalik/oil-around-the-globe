import { JSDOM } from 'jsdom';
JSDOM.fromURL('https://tradingeconomics.com/united-states/crude-oil-stocks-change', {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}).then(dom => {
  const tb = dom.window.document.querySelector('#calendar tbody');
  if(tb) {
    const rows = tb.querySelectorAll('tr');
    rows.forEach(r => console.log(r.textContent.trim().replace(/\s+/g, ' ')));
  } else {
    console.log("Not found");
  }
}).catch(console.error);
