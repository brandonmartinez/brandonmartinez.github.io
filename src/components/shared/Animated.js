import { useState, useRef, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
	fadeIn,
	fadeInDown,
	fadeInLeft,
	fadeInRight,
	fadeInUp
} from 'react-animations';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

// Custom Components
import useWindowDimensions from '../../hooks/useWindowDimensions';
import log from './Logger';
const logger = log.getLogger('Animated');

// Animations that are available
const fadeInDownKeyframes = keyframes`${fadeInDown}`;
const fadeInKeyframes = keyframes`${fadeIn}`;
const fadeInLeftKeyframes = keyframes`${fadeInLeft}`;
const fadeInRightKeyframes = keyframes`${fadeInRight}`;
const fadeInUpKeyframes = keyframes`${fadeInUp}`;

// Animation Helpers
const visibleAnimation = css`
	${props => (props.isVisible ? props.keyframeAnimation : '')};
`;
const AnimatedDiv = styled.div`
	animation: ${props => props.duration}s ${visibleAnimation};
	visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
`;

// Main animation logic
const Animated = ({ animation, duration, children }) => {
	const divRef = useRef(null);
	const { height } = useWindowDimensions();
	const [viewportBoundaryLine, setViewportBoundaryLine] = useState(height);
	const [isVisible, setIsVisible] = useState(false);

	if(!duration){
		duration = 2;
	}

	// Position of the Viewport
	useScrollPosition(
		({ currPos }) => {
			// If we're already visible, we're done here
			if (isVisible) {
				return;
			}

			const y = currPos.y;
			const viewportBuffer = height * 0.2;
			const boundaryCheckLine = y + height - viewportBuffer;

			setViewportBoundaryLine(boundaryCheckLine);
		},
		[isVisible, viewportBoundaryLine],
		null,
		true,
		600
	);

	// Position of this element
	useScrollPosition(
		({ currPos }) => {
			// If we're already visible, we're done here
			if (isVisible) {
				return;
			}

			const y = currPos.y;

			if (y < height || y <= viewportBoundaryLine) {
				logger.debug(`Now visible, showing animation for ${duration} seconds.`, y, currPos, divRef)
				setIsVisible(true);
			}
		},
		[isVisible, viewportBoundaryLine],
		divRef,
		false,
		600
	);

	// This is to fire after the first render for anything that is already in view
	useEffect(() => {
		if (!divRef || !divRef.current) {
			return;
		}

		// we need to set a small timeout here to allow for any dom mutations to complete before checking if we're in view
		setTimeout(() => {
			// Get the y position on the page
			const y = divRef.current.getBoundingClientRect().y;
			const isVisible = y < height;

			if (isVisible) {
				setIsVisible(true);
			}
		}, 600);
	}, []);

	return useMemo(
		() => (
			<AnimatedDiv
				keyframeAnimation={animation}
				isVisible={isVisible}
				duration={duration}
				ref={divRef}
			>
				{children}
			</AnimatedDiv>
		),
		[isVisible]
	);
};

Animated.FromLeft = ({ ...props }) => (
	Animated({ animation: fadeInLeftKeyframes, ...props })
);

Animated.FadeIn = ({ ...props }) => (
	Animated({ animation: fadeInKeyframes, ...props })
);

Animated.FromRight = ({ ...props }) =>
	Animated({ animation: fadeInRightKeyframes, ...props });

Animated.FromBottom = ({ ...props }) =>
	Animated({ animation: fadeInUpKeyframes, ...props });

Animated.FromTop = ({ ...props }) =>
	Animated({ animation: fadeInDownKeyframes, ...props });

export default Animated;
