import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './NotFound.css';

class NotFoundComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container fluid className='my-3 not-found-container'>
				<div className='box h-100 d-flex flex-column align-items-center justify-content-center'>
					<Row>
						<Col xs={12} lg={12}>
							<Row noGutters>
								<Col>
									<div>
										<Row>
											<Col>
												<div className='d-flex justify-content-center'>
													<div className='not-found-image' />
												</div>
											</Col>
										</Row>
										<Row>
											<Col xs={12}>
												<div className='text-center'>
													<h3>Error 404</h3>
													<p className='text-muted'>Sorry this page has not been built</p>
													<Link className='btn btn-primary d-inline-flex align-items-center' to='/dashboard'>Go to Home Page</Link>
												</div>
											</Col>
										</Row>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			</Container>
		);
	}
}

export default NotFoundComponent;
