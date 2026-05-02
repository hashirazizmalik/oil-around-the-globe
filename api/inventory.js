import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Vercel Edge Caching: Cache for 10 minutes (600s), revalidate in background if up to 120s stale
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');

  try {
    const html = await fetch('https://tradingeconomics.com/united-states/crude-oil-stocks-change', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }).then(res => res.text());

    const $ = cheerio.load(html);
    const rows = $('#calendar tbody tr').slice(-4).toArray();
    const results = [];
    
    if (rows.length > 0) {
      let currentTotalAmount = 455.0; 

      rows.forEach(r => {
        const cells = $(r).find('td');
        if (cells.length >= 6) {
          const dateStr = $(cells[0]).text().trim().split(' ')[0];
          const actualStr = $(cells[4]).text().trim();
          
          let status = 'down';
          let changeVal = 0;

          if (actualStr.includes('-')) {
             status = 'down';
             changeVal = parseFloat(actualStr.replace('M', ''));
          } else if (actualStr !== '' && actualStr !== '0.000M') {
             status = 'up';
             changeVal = parseFloat(actualStr.replace('M', ''));
          }

          if (!isNaN(changeVal)) currentTotalAmount += changeVal;

          results.push({
            week: dateStr,
            type: 'Crude Oil',
            amount: currentTotalAmount.toFixed(1) + 'M',
            change: actualStr || 'N/A',
            status: status
          });
        }
      });
    }

    if (results.length > 0) {
      res.status(200).json(results.reverse());
    } else {
      res.status(500).json({ error: 'No data parsed' });
    }
  } catch (error) {
    console.error('Error fetching inventory:', error.message);
    res.status(500).json({ error: 'Failed to fetch inventory data' });
  }
}
