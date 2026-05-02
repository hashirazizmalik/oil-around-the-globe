const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://oilprice.com/').then(res => {
  const $ = cheerio.load(res.data);
  console.log('Prices:', $('.last_price').first().text());
}).catch(console.error);
