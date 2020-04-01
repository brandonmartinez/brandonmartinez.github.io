import { NextSeo } from 'next-seo';
import matter from 'gray-matter';
import React from 'react';

// Custom Components
import About from '../components/home/About';
import Associations from '../components/home/Associations';
import Experience from '../components/home/Experience';
import Gear from '../components/home/Gear';
import LatestPost from '../components/home/LatestPost';
import Layout from '../components/Layout';

// Custom Services
import ExperienceService from '../services/ExperienceService';
import GearService from '../services/GearService';
import PostService from '../services/PostService';

const Index = ({ about, gear, experiences, latestPost }) => (
	<Layout
		masthead={{
			title: 'brandon martinez',
			subtitle: 'tech guru and media geek',
			heightPercentage: 0.98
		}}
		fluid
	>
		<NextSeo
			title='brandon martinez | tech guru and media geek'
			titleTemplate='%s'
			description='The primary public presence of Brandon Martinez, tech guru and media geek.'
		/>
		<About data={about} />
		<LatestPost data={latestPost} dark />
		<Associations />
		<Gear data={gear} dark />
		<Experience data={experiences} />
	</Layout>
);

export async function getStaticProps() {
	const getMarkdownContent = async section => {
		const content = await import(`../../content/index/${section}.md`);
		const data = matter(content.default);

		// Remove orig, as it's probably a buffer and can't be serialized
		delete data.orig;

		return { ...data };
	};

	const about = await getMarkdownContent('about');
	const gear = await GearService.getPosts();
	const experiences = await ExperienceService.getPosts();
	const latestPost = await PostService.getLatestPost();

	return {
		props: {
			about,
			gear,
			experiences,
			latestPost
		}
	};
}

export default Index;
