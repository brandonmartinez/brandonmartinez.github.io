import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import React from 'react';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

// Custom Components
import Animated from '../shared/Animated';
import Section from './Section';

const GearItemContent = ({ item, className }) => (
	<Col md='4' className={className}>
		<div className='image-container'>&nbsp;</div>
		<h2 className='title'>{item.title}</h2>
		<div className='excerpt'>{item.excerpt}</div>

		<Link href={item.relativeUri} prefetch={false} passHref>
			<Button variant='primary' className='read-more'>
				Read More
			</Button>
		</Link>
	</Col>
);

const StyledGearItemContent = styled(GearItemContent)`
	margin-bottom: ${props => props.theme.gutterExtraLarge};

	.image-container {
		background-position: center center;
		background-image: url(${props => props.item.thumbnailUri});
		background-size: cover;
		margin-bottom: ${props => props.theme.gutter};
		width: 100%;
		height: 10rem;
	}

	.title {
	}

	.excerpt {
		margin-bottom: ${props => props.theme.gutterLarge};
	}

	.read-more {
	}
`;

const GearGroup = ({ items }) => (
	<>
		<Row>
			{items.map((item, i) => (
				<StyledGearItemContent item={item} key={i} />
			))}
		</Row>
	</>
);

const Gear = ({ data, groupSize, ...rest }) => {
	groupSize = groupSize || 3;

	const groupedData = Array.from(
		{ length: Math.ceil(data.length / groupSize) },
		(v, i) => data.slice(i * groupSize, i * groupSize + groupSize)
	);
	return (
		<Section {...rest}>
			<Section.Title {...rest}>
				<span>My</span> Gear
			</Section.Title>
			<Section.Description>
				It takes tools to get the job done! These are the devices, widgets, and
				other gear I use on a regular basis to get my day job, hobbies,
				passions, and daily life activities completed from start to finish.
			</Section.Description>
			{groupedData.map((items, i) => (
				<Animated.FadeIn duration={5} key={i}>
					<GearGroup items={items} />
				</Animated.FadeIn>
			))}
		</Section>
	);
};

export default Gear;
