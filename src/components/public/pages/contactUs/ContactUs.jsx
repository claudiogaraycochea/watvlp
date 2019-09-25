import React, { Component } from 'react';
import {
  Container,
	Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

class ContactUs extends Component {
	constructor(props) {
		super(props);
    this.state = {};
  }
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <h2 className='animate-pop-in delay-2'>COMIENZA AHORA!</h2>
                <p className='animate-pop-in delay-3'>
                  Registra tu canal de TV en WebAnd.tv y accede al panel de control.
                </p>
              </Col>								
            </Row>
            <Row>
              <Col className='animate-pop-in delay-4'>
                <Form className='call-to-action'>
                  <Form.Group>
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control type='text' placeholder='Nombre' />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type='text' placeholder='ej: +1 000000000' />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='name@example.com' />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control as='textarea' placeholder='Mayor a 8 caracteres' />
                  </Form.Group>
                  <div className='d-flex justify-content-end'>
                    <Button 
                      variant='success'
                      className='btn-large'
                    >
                      Crear cuenta
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ContactUs;