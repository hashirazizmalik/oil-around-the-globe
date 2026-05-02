import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  // Vercel Edge Caching: Cache articles for 1 day since they don't change
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');

  try {
    const dom = await JSDOM.fromURL(url, {userAgent: "Mozilla/5.0"});
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    
    if (!article) return res.status(404).json({ error: 'Could not parse article' });
    
    res.status(200).json({ textContent: article.textContent, htmlContent: article.content });
  } catch (error) {
    console.error(`Error scraping full article ${url}:`, error.message);
    res.status(500).json({ error: 'Failed to scrape full article content' });
  }
}
