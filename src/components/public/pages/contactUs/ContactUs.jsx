import React, { Component } from 'react';
import {
  Container,
	Row,
  Col,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';

import { request } from '../../../../lib/https';

class ContactUs extends Component {
	constructor(props) {
		super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
      validated: false,
      sendResult: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
  }

	handleInputChange(event) {
		const { target } = event;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({ [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			this.setState({ validated: true });
		} else {
			const {
				firstname,
				lastname,
				email,
				message,
			} = this.state;

			const user = {
				firstname,
				lastname,
				email,
        message,
			};
			this.handleSignUp(user);
		}
		return true;
	}

	async handleSignUp(user) {
		const data = `firstname=${user.firstname}&lastname=${user.lastname}&email=${user.email}&message=${user.message}`;
		try {
			const resp = await request('POST', '/sendMessage/', data, {});
			this.setState({sendResult: resp.data.result});
		} catch (err) {
			console.error(err);
		}
	}

  render () {
    const { 
      firstname,
      lastname,
      email,
      message,
      validated,
      sendResult,
    } = this.state;
    return (
      <Container className='align-center'>
        <Row>
          <Col>
            <Row>
              <Col>
                <h2 className='animate-pop-in delay-2'>Contáctenos</h2>
              </Col>								
            </Row>
            <Row>
              <Col className='animate-pop-in delay-4'>
                {(sendResult) ? <Alert variant='success'>Su mensaje se ha enviado correctamente, nos pondremos en contacto a la brevedad.</Alert> : 
                <Form
                  className='call-to-action'
                  noValidate
                  validated={validated}
                  onSubmit={(event) => this.handleSubmit(event)}
                >
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Control
                        type='text'
                        placeholder='Nombre'
                        name='firstname'
                        value={firstname}
                        onChange={this.handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Control
                        type='text'
                        placeholder='Apellido'
                        name='lastname'
                        value={lastname}
                        onChange={this.handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Group>
                    <Form.Control
                      type='email'
                      placeholder='Email'
                      name='email'
                      value={email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      as='textarea'
                      placeholder='Mensaje'
                      name='message'
                      value={message}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                  <div className='d-flex justify-content-end'>
                    <Button
                      type='submit'
                      variant='primary'
                    >
                      Enviar
                    </Button>
                  </div>
                </Form>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ContactUs;