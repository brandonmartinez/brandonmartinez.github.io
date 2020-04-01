import GearRepository from '../repositories/GearRepository';
import BasePostService from './BasePostService';

class GearService extends BasePostService {
	PostRepository = GearRepository;

	async getPost({ title }) {
		const postPath = `${title}.md`;

		const file = await GearRepository.getPost({ postPath });
		const post = this.mapFileToPost({ file });
		return post;
	}

	mapFileToPost({ file }) {
		return {
			absoluteUri: file.route.uri,
			relativeUri: file.route.path,
			title: file.metadata.title,
			content: file.content,
			excerpt: file.metadata.excerpt,
			mastheadUri: require(`../../public/images/gear-${file.path.filename.replace('.md', '.jpg')}`)
		};
	}

	defaultPostSort(a, b) {
		return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
	}
}

export default new GearService();
