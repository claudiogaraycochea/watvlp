import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class EmptyDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className='box h-100 d-flex flex-column align-items-center justify-content-center'>
				<Row>
					<Col xs={12} lg={12}>
						<Row>
							<Col>
								<div>
									<Row>
										<Col>
											<div className='d-flex justify-content-center'>
												<div className='project-image' />
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={12}>
											<div className='text-center'>
												<h3>Welcome to Public Bloc!</h3>
												<p className='text-muted'>You can create your first project now...</p>
											</div>
										</Col>
									</Row>
									<Row>
										<Col className='d-flex justify-content-center'>
											<Link to='/dashboard/project/add/'><Button variant='secondary'>Add Project</Button></Link>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default EmptyDashboard;
