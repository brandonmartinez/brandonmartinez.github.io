import styled from 'styled-components';

// Custom Components
import NoSsr from './NoSsr';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const StyledHeader = styled.header`
	margin-bottom: ${(props) => props.theme.gutterLarge};
	position: relative;
	height: ${(props) => props.windowHeight * props.heightPercentage}px;
`;
const StyledBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: no-repeat center center;
	background-color: ${(props) => props.theme.gray};
    background-attachment: scroll;
    background-size: cover;
	background-image: url('${(props) => props.backgroundImage}');
	filter: blur(${(props) => props.theme.blurRadius});
	z-index: -2;
`;
const StyledOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: ${(props) => props.theme.black};
	opacity: 0.5;
	z-index: -1;
`;
const StyledHeadingContainer = styled.div`
	height: 100%;
	color: white;
	text-align: center;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
`;
const StyledHeading = styled.h1`
	font-size: 3rem;
	margin-top: 0;
	text-shadow: ${(props) => props.theme.textShadow};

	@media only screen and (min-width: ${(props) =>
			props.theme.breakpointMedium}) {
		font-size: 6rem;
	}
`;
const StyledSubheading = styled.span`
	font-size: 1.2rem;
	line-height: 1.6;
	display: block;
	opacity: 0.7;
	margin: ${(props) => props.theme.gutter} 0 0;
	text-shadow: ${(props) => props.theme.textShadow};

	@media only screen and (min-width: ${(props) =>
			props.theme.breakpointMedium}) {
		font-size: 1.6rem;
	}
`;

const Masthead = ({
	backgroundImage,
	heightPercentage,
	className,
	children
}) => {
	const { height } = useWindowDimensions();
	if (!heightPercentage) {
		heightPercentage = 0.5;
	}

	return (
		<NoSsr>
			<StyledHeader
				heightPercentage={heightPercentage}
				windowHeight={height}
				className={className}
			>
				<StyledBackground backgroundImage={backgroundImage} />
				<StyledOverlay />
				<StyledHeadingContainer>{children}</StyledHeadingContainer>
			</StyledHeader>
		</NoSsr>
	);
};

Masthead.Heading = StyledHeading;
Masthead.Subheading = StyledSubheading;

export default Masthead;
