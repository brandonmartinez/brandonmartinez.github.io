import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

// Custom Components
import About from '../home/About';

const StyledFooterContainer = styled.footer.attrs((props) => ({
	className: 'pt-4 mt-5'
}))`
	background-color: ${(props) => props.theme.grayDark};
	border-top: 2rem solid ${(props) => props.theme.grayExtraDark};
	color: ${(props) => props.theme.white};

	a {
		color: ${(props) => props.theme.white};
		font-weight: bold;
	}
`;

const Footer = () => (
	<StyledFooterContainer>
		<Container>
			<Row>
				<Col md='4' className='mt-md-0 mt-3'>
					<h5 className='text-uppercase mb-3'>brandon martinez</h5>
					<About.Avatar />
					<p className='d-sm-block d-md-none'>tech guru and media geek</p>
				</Col>

				<Col md='4' className='mt-md-0 mt-3'>
					<h5 className='text-uppercase mb-3'>Social</h5>

					<About.SocialAccounts />
				</Col>

				<Col md='4' className='mt-md-0 mt-3'>
					<h5 className='text-uppercase mb-3'>Disclaimer</h5>
					<p>
						All views expressed on this site are my own and do not represent any
						organization, employer, or person other than me. Content belongs to
						me unless otherwise noted or shared from another content creator.
					</p>
					<p>
						Copyright &copy; 2006 - {new Date().getFullYear()},{' '}
						<a href='https://www.brandonmartinez.com/'>Brandon Martinez</a>. All
						Rights Reserved where applicable.
					</p>
					<p>Version: {process.env.buildId}</p>
				</Col>
			</Row>
		</Container>
	</StyledFooterContainer>
);

export default Footer;
