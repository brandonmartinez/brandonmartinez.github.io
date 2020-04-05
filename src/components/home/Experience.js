import { DateTime } from 'luxon';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ReactMarkdown from 'react-markdown';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

// Custom Components
import Animated from '../shared/Animated';
import Images from 'components/shared/Images';
import Section from './Section';

const ExperienceTimelineEntry = ({ experience, inverted, className }) => {
	const icon = Images.requireExperience('./' + experience.icon);

	return (
		<Animated.Pulse duration={2}>
			<li
				className={
					className + ' ' + (inverted ? 'timeline-inverted' : 'timeline-entry')
				}
			>
				<div className='timeline-badge'>
					<div className='timeline-badge-wrapper'>
						<img src={icon} alt={`${experience.tile} icon`} />
					</div>
				</div>
				<div className='timeline-panel'>
					<div className='timeline-heading'>
						<h4 className='timeline-title'>{experience.title}</h4>
						<h5>{experience.company}</h5>
						<p>
							<small className='text-muted'>
								{DateTime.fromISO(experience.startDate).toFormat('LLLL yyyy')}{' '}
								&ndash;{' '}
								{experience.endDate
									? DateTime.fromISO(experience.endDate).toFormat('LLLL yyyy')
									: 'Present'}
							</small>
						</p>
					</div>
					<div className='timeline-body'>
						<ReactMarkdown source={experience.content} />
					</div>
				</div>
			</li>
		</Animated.Pulse>
	);
};
const StyledExperienceTimelineEntry = styled(ExperienceTimelineEntry)`
	margin-bottom: 3rem;
	position: relative;
	&:before,
	&:after {
		content: ' ';
		display: table;
	}
	&:after {
		clear: both;
	}
	> .timeline-panel {
		width: 44.5%;
		float: left;
		border: 0.05rem solid ${(props) => props.theme.gray};
		border-radius: ${(props) => props.theme.borderRadius};
		padding: 1rem;
		position: relative;
		box-shadow: ${(props) => props.theme.boxShadowLight};
		@media only screen and (max-width: ${(props) =>
				props.theme.breakpointMedium}) {
			width: calc(100% - 6.5rem);
			float: right;
		}
		&:before {
			position: absolute;
			top: 1.35rem;
			right: -0.76rem;
			display: inline-block;
			border-top: 0.75rem solid transparent;
			border-left: 0.75rem solid ${(props) => props.theme.gray};
			border-right: 0 solid ${(props) => props.theme.gray};
			border-bottom: 0.75rem solid transparent;
			content: ' ';
		}
		&:after {
			position: absolute;
			top: 1.35rem;
			right: -0.68rem;
			display: inline-block;
			border-top: 0.7rem solid transparent;
			border-left: 0.7rem solid ${(props) => props.theme.white};
			border-right: 0 solid ${(props) => props.theme.white};
			border-bottom: 0.7rem solid transparent;
			content: ' ';
		}
		@media only screen and (max-width: ${(props) =>
				props.theme.breakpointMedium}) {
			&:before,
			&:after {
				border-left-width: 0;
				border-right-width: 0.75rem;
				left: -0.75rem;
				right: auto;
			}
		}
		.timeline-heading .timeline-title {
			margin-top: 0;
			color: inherit;
		}
		.timeline-body {
			> p,
			> ul {
				margin-bottom: 0;
			}
			> p + p {
				margin-top: 0.25rem;
			}
		}
	}
	&.timeline-inverted > .timeline-panel {
		float: right;
		&:before {
			border-left-width: 0;
			border-right-width: 0.75rem;
			left: -0.76rem;
			right: auto;
		}
		&:after {
			border-left-width: 0;
			border-right-width: 0.7rem;
			left: -0.68rem;
			right: auto;
		}
		@media only screen and (max-width: ${(props) =>
				props.theme.breakpointMedium}) {
			&:before,
			&:after {
				border-left-width: 0;
				border-right-width: 0.75rem;
				left: -0.75rem;
				right: auto;
			}
		}
	}
	.timeline-badge {
		background: ${(props) =>
			props.experience.iconBackground || props.theme.white};
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		border-top-left-radius: 50%;
		border-top-right-radius: 50%;
		border: solid ${(props) => props.theme.gray} 0.05rem;
		box-shadow: ${(props) => props.theme.boxShadowLight};
		color: ${(props) => props.theme.white};
		height: 5.5rem;
		left: 50%;
		line-height: 5.5rem;
		margin-left: -2.75rem;
		position: absolute;
		overflow: hidden;
		top: -0.5rem;
		width: 5.5rem;
		z-index: 100;

		@media only screen and (max-width: ${(props) =>
				props.theme.breakpointMedium}) {
			left: 0;
			margin-left: 0;
		}

		.timeline-badge-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: center;
			img {
				max-width: 75%;
				height: auto;
			}
		}
	}
`;
const ExperienceTimeline = ({ experiences, className }) => (
	<ul className={className}>
		{experiences.map((experience, i) => (
			<StyledExperienceTimelineEntry
				experience={experience}
				inverted={i % 2 !== 0}
				key={i}
			/>
		))}
	</ul>
);
const StyledExperienceTimeline = styled(ExperienceTimeline)`
	list-style: none;
	padding: 1rem 0;
	position: relative;

	&:before {
		top: 0;
		bottom: 0;
		position: absolute;
		content: ' ';
		width: 0.2rem;
		background-color: ${(props) => props.theme.grayLight};
		left: 50%;
		margin-left: -0.1rem;
		@media only screen and (max-width: ${(props) =>
				props.theme.breakpointMedium}) {
			left: 2.75rem;
		}
	}
`;
const Experience = ({ data, ...rest }) => (
	<Section {...rest}>
		<Section.Title {...rest}>
			<span>My</span> Experience
		</Section.Title>
		<Section.Description>
			Our experiences are a major influence in who we are. These are my
			experiences, both professional and personal, within organizations.
		</Section.Description>
		<Container>
			<StyledExperienceTimeline experiences={data} />
		</Container>
	</Section>
);
export default Experience;
