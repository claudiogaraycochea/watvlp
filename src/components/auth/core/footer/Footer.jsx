import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container>
				<Row>
					<Col>
						<div className='text-center text-small py-2'>
							<Link to='/' onClick={this.openTerms}>
								&nbsp;
								{'Terms & Conditions'}
							</Link>
							<Link to='/' onClick={this.openPrivacy}>
								&nbsp;
								{'Privacy'}
							</Link>
							<span className='label-text'>
								{' '}
								Copyright ©
								{new Date().getFullYear()}
								{'Public Bloc'}
							</span>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Footer;
