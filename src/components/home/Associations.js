import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import React from 'react';
import styled from 'styled-components';

// Custom Components
import Images from 'components/shared/Images';
import Section from './Section';

const AssociationImage = ({ className, src }) => (
	<Card.Img
		variant='top'
		src={Images.requireAssociation(src)}
		className={className}
	/>
);

const StyledAssociationImage = styled(AssociationImage)`
	padding: 1rem;
	max-width: 100%;
	margin: 0 auto;
	max-height: 10rem;
`;

const Association = ({ title, imgSrc, className, href, children }) => (
	<Card>
		<StyledAssociationImage src={imgSrc} alt={`${title} icon`} />
		<Card.Body className={className}>
			<Card.Title>{title}</Card.Title>
			<Card.Text>{children}</Card.Text>
		</Card.Body>
		<Card.Footer>
			<Button
				href={href}
				target='_blank'
				variant='outline-secondary'
				rel='noreferrer'
			>
				Learn More
			</Button>
		</Card.Footer>
	</Card>
);

const AssociationGroup = ({ children }) => (
	<CardGroup className='mb-md-4 mb-sm-2'>{children}</CardGroup>
);

const Associations = ({ data, ...rest }) => (
	<Section {...rest}>
		<Section.Title {...rest}>
			<span>My</span> Associations
		</Section.Title>
		<Section.Description>
			These are my current organizational associations that I work with on a
			daily or weekly basis.
		</Section.Description>
		<AssociationGroup>
			<Association
				title='Skyline Technologies, Inc.'
				imgSrc='./skyline.svg'
				href='https://www.skylinetechnologies.com/'
			>
				My primary employer. I'm a senior software engineer (and shareholder),
				specializing in cloud development utilizing the Microsoft .NET Core and
				Node.js web stacks running on Azure and AWS.
			</Association>
			<Association
				title='Martinez Media, LLC'
				imgSrc='./martinezmedia.svg'
				href='http://www.martinezmedia.net/'
			>
				My side media consulting business. Specializing in photography, social
				media management, and small website design and development.
			</Association>
		</AssociationGroup>
		<AssociationGroup>
			<Association
				title='The Average Enthusiasts'
				imgSrc='./theaverageenthusiasts.svg'
				href='http://www.theaverageenthusiasts.com/'
			>
				A bi-weekly podcast that I host with my best friend, Kenny.
			</Association>
			<Association
				title='THAT Conference, NFP'
				imgSrc='./thatconference.svg'
				href='https://www.thatconference.com/'
			>
				The biggest tech conference in the Midwest. I'm a core contributor to
				the conference, focusing on social media, graphic management, and
				photography.
			</Association>
			<Association
				title='Radiant Coast'
				imgSrc='./radiantcoast.svg'
				href='http://www.radiantcoast.org/'
			>
				The local church I attend where I serve in the worship, production, and
				creative ministries as a volunteer.
			</Association>
		</AssociationGroup>
	</Section>
);

export default Associations;
