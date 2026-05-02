import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Vercel Edge Caching: Cache for 10 minutes (600s), revalidate in background if up to 120s stale
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');

  try {
    const [wtiDom, brentDom] = await Promise.all([
      JSDOM.fromURL('https://markets.businessinsider.com/commodities/oil-price?type=wti', {userAgent: "Mozilla/5.0"}),
      JSDOM.fromURL('https://markets.businessinsider.com/commodities/oil-price?type=brent', {userAgent: "Mozilla/5.0"})
    ]);

    const wtiStr = wtiDom.window.document.querySelector('.price-section__current-value')?.textContent.trim();
    const brentStr = brentDom.window.document.querySelector('.price-section__current-value')?.textContent.trim();

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
