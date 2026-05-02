import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Vercel Edge Caching: Cache for 10 minutes (600s), revalidate in background if up to 120s stale
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');

  try {
    const dom = await JSDOM.fromURL('https://tradingeconomics.com/united-states/crude-oil-stocks-change', {userAgent: "Mozilla/5.0"});
    const tb = dom.window.document.querySelector('#calendar tbody');
    const results = [];
    
    if (tb) {
      const rows = Array.from(tb.querySelectorAll('tr')).slice(-4);
      let currentTotalAmount = 455.0; 

      rows.forEach(r => {
        const cells = r.querySelectorAll('td');
        if (cells.length >= 6) {
          const dateStr = cells[0].textContent.trim().split(' ')[0];
          const actualStr = cells[4].textContent.trim();
          
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
