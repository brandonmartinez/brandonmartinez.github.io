import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';
import NextApp from 'next/app';
import React from 'react';

// Site Styling
import Images from 'components/shared/Images';
import ThemeProviderTheme from 'components/layout/ThemeProviderTheme';

export default class App extends NextApp {
	render() {
		const { Component, pageProps } = this.props;
		const openGraphImage = Images.requireSiteOriginal('./opengraph-large.png');
		return (
			<ThemeProvider theme={ThemeProviderTheme}>
				<DefaultSeo
					openGraph={{
						type: 'website',
						locale: 'en_US',
						url: 'https://www.brandonmartinez.com/',
						site_name: 'brandon martinez',
						images: [
							{
								url: openGraphImage,
								width: 1200,
								height: 630,
								alt: 'brandon martinez'
							}
						]
					}}
					twitter={{
						handle: '@brandonmartinez',
						site: '@brandonmartinez',
						cardType: 'summary_large_image'
					}}
					titleTemplate='%s | brandon martinez'
				/>
				<Component {...pageProps} />
			</ThemeProvider>
		);
	}
}
