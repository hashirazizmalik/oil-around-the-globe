import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

JSDOM.fromURL('https://oilprice.com/Energy/Crude-Oil/Brent-Crude-Tops-85-on-Geopolitical-Tensions-in-the-Middle-East.html').then(dom => {
  let reader = new Readability(dom.window.document);
  let article = reader.parse();
  console.log(article.textContent.substring(0, 100));
}).catch(console.error);
