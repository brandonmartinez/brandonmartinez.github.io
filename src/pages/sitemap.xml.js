import PostService from '../services/PostService';

const getSiteMapPostXml = posts => {
	let latestPost = 0;
	let postsXml = '';
	posts.map(post => {
		const postDate = Date.parse(post.publishedAt);
		if (!latestPost || postDate > latestPost) {
			latestPost = postDate;
		}
		postsXml += `
    <url>
      <loc>https://www.brandonmartinez.com${post.relativeUri}/</loc>
      <lastmod>${new Date(postDate).toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>`;
	});
	return {
		postsXml,
		latestPost
	};
};

const getSitemapXml = posts => {
	const { postsXml, latestPost } = getSiteMapPostXml(posts);
	return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.brandonmartinez.com/</loc>
      <lastmod>${latestPost}</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://www.brandonmartinez.com/posts/</loc>
      <priority>0.5</priority>
    </url>
    ${postsXml}
  </urlset>`;
};

const renderSitemap = async () => {
	const posts = await PostService.getPosts();
	const sitemapXml = getSitemapXml(posts);
	return sitemapXml;
};

const Sitemap = () => {
	// We can't render this as part of the normal next.js export process, due to
	// needing to write pure XML with no HTML wrappers
	// We'll call it from a secondary export process
};

Sitemap.getInitialProps = async ({ res: response }) => {
	const sitemap = await renderSitemap();

	// If we're serving in dev, write to the response stream to set content type
	if (response && response.write) {
		response.setHeader('Content-Type', 'text/xml');
		response.write(sitemap);
		response.end();
	}
};

Sitemap.render = renderSitemap;

export default Sitemap;
