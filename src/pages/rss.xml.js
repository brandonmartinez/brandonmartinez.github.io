import PostService from '../services/PostService';
import ReactMarkdown from 'react-markdown';

const getRssPostXml = posts => {
	let latestPostDate = '';
	let rssItemsXml = '';
	posts.forEach(post => {
		const postDate = Date.parse(post.publishedAt);
		if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
			latestPostDate = post.publishedAt;
		}
		rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>
          https://www.brandonmartinez.com${post.relativeUri}/
        </link>
        
        <pubDate>${post.publishedAt}</pubDate>
        <description>
        <![CDATA[${post.excerpt}]]>
        </description>
    </item>`;
	});
	return {
		rssItemsXml,
		latestPostDate
	};
};

const getRssXml = posts => {
	const { rssItemsXml, latestPostDate } = getRssPostXml(posts);
	return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
		xmlns:content="http://purl.org/rss/1.0/modules/content/"
		xmlns:wfw="http://wellformedweb.org/CommentAPI/"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:atom="http://www.w3.org/2005/Atom"
		xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
		xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
		xmlns:georss="http://www.georss.org/georss" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
>
		<channel>
			<title>brandon martinez</title>
			<link>https://www.brandonmartinez.com</link>
			<description>tech guru and media geek</description>
			<language>en</language>
			<lastBuildDate>${latestPostDate}</lastBuildDate>
			${rssItemsXml}
		</channel>
	</rss>`;
};

const renderRss = async () => {
	const postsPage = await PostService.getPaginatedPosts({ page: 1 });
	const posts = postsPage.posts;
	const sitemapXml = getRssXml(posts);
	return sitemapXml;
};

const Rss = () => {
	// We can't render this as part of the normal next.js export process, due to
	// needing to write pure XML with no HTML wrappers
	// We'll call it from a secondary export process
};

Rss.getInitialProps = async ({ res: response }) => {
	const rss = await renderRss();

	// If we're serving in dev, write to the response stream to set content type
	if (response && response.write) {
		response.setHeader('Content-Type', 'text/xml');
		response.write(rss);
		response.end();
	}
};

Rss.render = renderRss;

export default Rss;
