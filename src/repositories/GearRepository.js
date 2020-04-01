// Custom Repositories
import BasePostRepository from './BasePostRepository';

class GearRepository extends BasePostRepository {
	basePostContentFolder = './content/gear';
	postRouteTemplate = '/gear/[title]';

	extractRouteFromFile({ filePath }) {
		const regex = /gear\/(.*)\.md$/gi;
		const m = regex.exec(filePath);
		if (!m) {
			return null;
		}

		const [relativePath, title] = m;
		const relativeUri = `/gear/${title}`;

		return {
			relativePath,
			relativeUri,
			params: { title }
		};
	}
}

export default new GearRepository();
