// Custom Repositories
import BasePostRepository from './BasePostRepository';

class ExperienceRepository extends BasePostRepository {
	basePostContentFolder = './content/experiences';
	postRouteTemplate = '/experiences/[title]';

	extractRouteFromFile({ filePath }) {
		const regex = /experiences\/(.*)\.md$/gi;
		const m = regex.exec(filePath);
		if (!m) {
			return null;
		}

		const [relativePath, title] = m;
		const relativeUri = `/experiences/${title}`;

		return {
			relativePath,
			relativeUri,
			params: { title }
		};
	}
}

export default new ExperienceRepository();
