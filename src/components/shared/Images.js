import { css } from 'styled-components';

const CssBackgroundImageSet = (imgSrcSet) => {
	// if we get just a string, build a src set
	if (typeof imgSrcSet === 'string') {
		imgSrcSet = {
			src: imgSrcSet
		};
	}

	const images = { src: imgSrcSet.src };
	if (imgSrcSet.srcSet) {
		const srcSet = imgSrcSet.srcSet
			.split(',')
			.map((image, i) => {
				const parts = image.split(' ');
				return `url('${parts[0]}') ${i + 1}x`;
			})
			.join(',');
		images.srcSet = srcSet;
	} else {
		images.srcSet = `url('${images.src}') 1x`;
	}

	return css`
		background-image: url('${images.src}');
		background-image: image-set(${images.srcSet});
	`;
};

const requireAssociation = require.context(
	'images/associations?original',
	false,
	/\.(svg)$/
);

const requireExperience = (relativeImagePath) => {
	const isSvg = relativeImagePath.includes('.svg');
	return isSvg
		? requireExperienceSvg(relativeImagePath)
		: requireExperienceRaster(relativeImagePath).src;
};

const requireExperienceRaster = require.context(
	'images/experiences??size=150',
	false,
	/\.(jpg|png)$/
);

const requireExperienceSvg = require.context(
	'images/experiences?original',
	false,
	/\.(svg)$/
);

const requireGear = require.context(
	'images/gear?resize&sizes[]=150&sizes[]=300&sizes[]=600&sizes[]=1200&sizes[]=2000',
	false,
	/\.(jpg)$/
);

const requireMasthead = require.context(
	'images?resize&sizes[]=1000&sizes[]=2000',
	true,
	/\.jpg$/
);

const requireSite = require.context(
	'images/site?resize&sizes[]=150&sizes[]=300&sizes[]=600&sizes[]=1200&sizes[]=2000',
	false,
	/\.(jpg|png)$/
);

const requireSiteOriginal = require.context(
	'images/site?original',
	false,
	/\.(jpg|png)$/
);

const requireSocial = require.context(
	'images/social?original',
	false,
	/\.(svg)$/
);

export default {
	cssBackgroundImageSet: CssBackgroundImageSet,
	requireAssociation,
	requireExperience,
	requireExperienceRaster,
	requireExperienceSvg,
	requireGear,
	requireMasthead,
	requireSite,
	requireSiteOriginal,
	requireSocial
};
