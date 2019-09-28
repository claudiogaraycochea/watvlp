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
							<span className='label-text space'>
								{` Copyright © ${new Date().getFullYear()} WebAnd.TV`}
							</span>
							<Link to='../terms' onClick={this.openTerms} className='space'>Términos y Condiciones</Link>
							<Link to='../privacy' className='space'>Privacidad</Link>
							<Link to='/aboutUs' className='space'>Acerca de</Link>
							<Link to='/job' className='space'>Empleo</Link>
							<Link to='/contactUs'>Contáctenos</Link>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Footer;
