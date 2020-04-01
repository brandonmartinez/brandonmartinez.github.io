import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

// Custom Components
import Section from './Section';
import Animated from '../shared/Animated';

const StyledAvatarImage = styled.img`
	max-width: 100%;
	height: auto;
`;
const avatarImgSrc = require('../../../public/images/avatar.jpg?resize&sizes[]=300&sizes[]=600&sizes[]=1000');
const Avatar = () => (
	<Animated.FromLeft>
		<StyledAvatarImage
			srcSet={avatarImgSrc.srcSet}
			src={avatarImgSrc.src}
			alt='Brandon Martinez Avatar'
			className='mb-3 d-none d-md-block'
		/>
	</Animated.FromLeft>
);

const socialAccounts = [
	'Twitter',
	'Instagram',
	'LinkedIn',
	'Facebook',
	'StackOverflow',
	'GitHub',
	'SoundCloud',
	'YouTube'
];

const SocialAccount = ({ social, className }) => (
	<div className={className}>
		<a
			href={`http://${social.toLowerCase()}.brandonmartinez.com/`}
			className='social-account-link'
			target='_blank'
			rel='noreferrer'
		>
			<img
				src={require(`../../../public/images/social-${social.toLowerCase()}.svg`)}
				className='social-account-image'
				alt={`${social} icon`}
				title={`Find me on ${social}.`}
			/>
		</a>
	</div>
);

const StyledSocialAccount = styled(SocialAccount)`
	width: 20%;
	margin: 0 5% 5% 0;
	float: left;
	@media only screen and (max-width: ${props => props.theme.breakpointMedium}) {
		margin: 0 2.5% 2.5% 0;
		width: 10%;
	}

	.social-account-link {
	}

	.social-account-image {
		width: 100%;
		height: auto;
	}
`;

const SocialAccounts = () => (
	<>
		{socialAccounts.map((social, i) => (
			<Animated.FadeIn key={i}>
				<StyledSocialAccount social={social} />
			</Animated.FadeIn>
		))}
	</>
);

const About = ({ data, ...rest }) => (
	<Section {...rest}>
		<Section.Title {...rest}>
			About <span>Me</span>
		</Section.Title>
		<Row>
			<Col lg='2' className='d-none d-lg-block'>
				<Avatar />
			</Col>
			<Col md='12' lg='6'>
				<ReactMarkdown source={data.content} />
			</Col>
			<Col lg='2' className='d-none d-lg-block'>
				<h3 className='mb-4'>Where To Find Me</h3>
				<SocialAccounts />
			</Col>
		</Row>
	</Section>
);

About.Avatar = Avatar;
About.SocialAccounts = SocialAccounts;

export default About;
