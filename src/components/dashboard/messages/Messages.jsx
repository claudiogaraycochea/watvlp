import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Col, Row, InputGroup, FormControl, Button, Nav, Tab,
} from 'react-bootstrap';

import Messagebox from '../core/messagebox/Messagebox';
import Contacts from '../core/contacts/Contacts';
import './messages.css';

// mocks
import ContactsList from '../../../mocks/contacts.mock';

class Message extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		const headerTitle = 'Messages';
		this.props.setHeaderTitle(headerTitle);
	}

	render() {
		return (
			<div className='message-container'>
				<Row>
					<Col xs={12}>
						<div className='box margin-bottom border-box mb-0 p-0 h-100'>
							<Row className='mb-0' noGutters>
								<Col xs={12} lg={4}>
									<Tab.Container defaultActiveKey='contacts'>
										<div className='d-flex flex-column justify-content-end h-100'>
											<Tab.Content className='h-100'>
												<Tab.Pane eventKey='contacts'>
													<div className='user-box'>
														<div className='user-project py-3'>
															<InputGroup>
																<FormControl
																	placeholder='Search Contact'
																	aria-label='Send Contact'
																	aria-describedby='send-contact'
																	className='search-contact-input'
																/>
																<InputGroup.Append>
																	<InputGroup.Text id='send-btn' className='send-btn-wrapper'>
																		<Button className='send-button'>
																			<div className='icon-search-sec' />
																		</Button>
																	</InputGroup.Text>
																</InputGroup.Append>
															</InputGroup>
														</div>
													</div>
													<div className='contact-list contact-board'>
														<div className='user-box'>
															{(ContactsList.length > 0)
																? ContactsList.map((contact) => (
																	<Contacts
																		image={contact.image}
																		fullname={contact.fullname}
																		key={contact.id}
																	/>
																)) : null}
														</div>
													</div>
												</Tab.Pane>
												<Tab.Pane eventKey='messages'>
													<div className='user-box'>
														<div className='user-project py-3'>
															<InputGroup>
																<FormControl
																	placeholder='Search Message'
																	aria-label='Send Message'
																	aria-describedby='send-message'
																	className='search-contact-input'
																/>
																<InputGroup.Append>
																	<InputGroup.Text id='send-btn' className='send-btn-wrapper'>
																		<Button className='send-button'>
																			<div className='icon-search-sec' />
																		</Button>
																	</InputGroup.Text>
																</InputGroup.Append>
															</InputGroup>
														</div>
													</div>
													<div className='contact-list contact-board'>
														<div className='user-box'>
															{(ContactsList.length > 0)
																? ContactsList.map((contact) => (
																	<Contacts
																		image={contact.image}
																		fullname={contact.fullname}
																		key={contact.id}
																	/>
																)) : null}
														</div>
													</div>
												</Tab.Pane>
											</Tab.Content>
											<Nav variant='pills' className='contacts-footer'>
												<Nav.Item className='d-flex align-items-center h-100'>
													<Nav.Link
														eventKey='contacts'
														className='h-100 no-border-radius px-4 py-3 text-center'
													>
														<div className='icon-contacts-sec' />
														<span className='px-2'>Contacts</span>
													</Nav.Link>
												</Nav.Item>
												<Nav.Item className='d-flex align-items-center h-100'>
													<Nav.Link
														eventKey='messages'
														className='h-100 no-border-radius px-4 py-3 text-center'
													>
														<div className='icon-messages-sec' />
														<span className='px-2'>Messages</span>
													</Nav.Link>
												</Nav.Item>
											</Nav>
										</div>
									</Tab.Container>
								</Col>
								<Col xs={12} lg={8}>
									<div>
										<div className='user-box'>
											<div className='user-project py-4'>
												<div className='image'>
													<i className='icon-user-sec' />
												</div>
												<div className='description d-flex align-items-center'>
													<div className='fullname'>John Doe</div>
												</div>
												<div>
													<i className='icon-menu-sec' />
												</div>
											</div>
										</div>
										<div className='d-flex flex-column left-border-box'>
											{/* message board */}
											<div className='message-board'>
												<div className='d-flex align-items-end h-100'>
													<div className='h-100'>
														<div className='thread px-3 px-lg-4'>
															<Messagebox type='receiver' />
														</div>
														<div className='thread px-3 px-lg-4'>
															<Messagebox type='sender' />
														</div>
													</div>
												</div>
											</div>
											<div className='message-box'>
												<div className='px-3'>
													<InputGroup className='mb-3'>
														<FormControl
															placeholder='Send Message'
															aria-label='Send Message'
															aria-describedby='send-message'
															className='send-message-input'
														/>
														<InputGroup.Append>
															<InputGroup.Text id='send-btn' className='send-btn-wrapper'>
																<Button className='send-button'>
																	<div className='icon-messages-send' />
																</Button>
															</InputGroup.Text>
														</InputGroup.Append>
													</InputGroup>
												</div>
											</div>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

Message.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
};

export default Message;
