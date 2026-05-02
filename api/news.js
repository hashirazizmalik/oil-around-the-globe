import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['media:content', 'enclosure']
  }
});

const RSS_FEEDS = [
  { source: 'OilPrice.com', url: 'https://oilprice.com/rss/main' },
  { source: 'Rigzone', url: 'https://www.rigzone.com/news/rss/rigzone_latest.aspx' },
  { source: 'CNBC Energy', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000810' },
  { source: 'MarketWatch', url: 'http://feeds.marketwatch.com/marketwatch/energy/' },
  { source: 'Investopedia', url: 'https://www.investopedia.com/feedbuilder/feed/getfeed?feedName=markets' }
];

export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Vercel Edge Caching: Cache for 10 minutes (600s), revalidate in background if up to 120s stale
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');

  try {
    const feedPromises = RSS_FEEDS.map(async (feedObj) => {
      try {
        const feed = await parser.parseURL(feedObj.url);
        return feed.items.map(item => {
          let imageUrl = null;
          if (item.enclosure && item.enclosure.url) imageUrl = item.enclosure.url;
          else if (item['media:content'] && item['media:content'].$) imageUrl = item['media:content'].$.url;

          const contentText = item.contentSnippet || item.content || '';
          const searchText = (item.title + ' ' + contentText).toLowerCase();
          
          let category = 'Latest Headlines';
          if (searchText.includes('opec') || searchText.includes('saudi') || searchText.includes('russia')) category = 'OPEC Updates';
          else if (searchText.includes('supply') || searchText.includes('inventor') || searchText.includes('eia') || searchText.includes('rig') || searchText.includes('stockpile') || searchText.includes('production')) category = 'Supply Chain';
          else if (searchText.includes('market') || searchText.includes('price') || searchText.includes('forecast') || searchText.includes('demand') || searchText.includes('economy')) category = 'Market Analysis';

          return {
            title: item.title,
            source: feedObj.source,
            link: item.link,
            pubDate: new Date(item.pubDate),
            time: new Date(item.pubDate).toLocaleString(),
            category: category,
            imageUrl: imageUrl,
            content: contentText || 'Article summary not available.'
          };
        });
      } catch (err) {
        console.error(`Failed to fetch RSS from ${feedObj.source}:`, err.message);
        return [];
      }
    });

    const allFeeds = await Promise.all(feedPromises);
    const articles = allFeeds
      .flat()
      .filter(item => item.title && item.link)
      .sort((a, b) => b.pubDate - a.pubDate)
      .map((item, index) => ({
        id: index + 1,
        ...item,
        imageUrl: item.imageUrl || `https://picsum.photos/seed/oilnews_${index}/800/400`
      }))
      .slice(0, 50);

    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching combined news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
