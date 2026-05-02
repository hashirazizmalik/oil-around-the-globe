import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Vercel Edge Caching: Cache for 10 minutes (600s), revalidate in background if up to 120s stale
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');

  try {
    const fetchWithUserAgent = (url) => fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(res => res.text());

    const [wtiHtml, brentHtml] = await Promise.all([
      fetchWithUserAgent('https://markets.businessinsider.com/commodities/oil-price?type=wti'),
      fetchWithUserAgent('https://markets.businessinsider.com/commodities/oil-price?type=brent')
    ]);

    const $wti = cheerio.load(wtiHtml);
    const $brent = cheerio.load(brentHtml);

    const wtiStr = $wti('.price-section__current-value').text().trim();
    const brentStr = $brent('.price-section__current-value').text().trim();

    res.status(200).json({
      wti: wtiStr ? parseFloat(wtiStr.replace(/,/g, '')) : null,
      brent: brentStr ? parseFloat(brentStr.replace(/,/g, '')) : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching prices:', error.message);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
}
