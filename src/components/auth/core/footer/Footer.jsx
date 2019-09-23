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
							<Link to='../terms' onClick={this.openTerms} className='space'>Terms & Conditions</Link>
							<Link to='../privacy' onClick={this.openPrivacy} className='space'>Privacy</Link>
							<Link to='/' onClick={this.openPrivacy} className='space'>About Us</Link>
							<Link to='/' onClick={this.openPrivacy}>Contact Us</Link>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='text-small'>
							<Link to='/' onClick={this.openPrivacy} className='space'>English</Link>
							<Link to='/' onClick={this.openPrivacy} className='space'>Spanish</Link>
							<Link to='/' onClick={this.openPrivacy} className='space'>Portuguese</Link>
							<Link to='/' onClick={this.openPrivacy} className='space'>Italian</Link>
							<Link to='/' onClick={this.openPrivacy} className='space'>Germany</Link>
							<Link to='/' onClick={this.openPrivacy} className='space'>French</Link>
							<Link to='/' onClick={this.openPrivacy} className='space'>Chinese</Link>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='text-small'>
							Share Smart TV LTD. Ch. De Prévenoge 2, 1024 Ecublens (Lausanne), Switzerland
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Footer;
