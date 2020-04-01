// Custom Components
import Animated from '../shared/Animated';
import Masthead from '../shared/Masthead';

const Header = ({ backgroundImage, title, subtitle, heightPercentage }) => {
	if (!backgroundImage) {
		const coverPhotoNumber = Math.floor(Math.random() * 6) + 1;
		backgroundImage = `/images/cover-${coverPhotoNumber}.jpg`;
	}

	return (
		<Masthead
			backgroundImage={backgroundImage}
			heightPercentage={heightPercentage}
		>
			<Animated.FromLeft duration={4}>
				<Masthead.Heading>{title}</Masthead.Heading>
			</Animated.FromLeft>
			<Animated.FromRight duration={4}>
				<Masthead.Subheading>{subtitle}</Masthead.Subheading>
			</Animated.FromRight>
		</Masthead>
	);
};

export default Header;
