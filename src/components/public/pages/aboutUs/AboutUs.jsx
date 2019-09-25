import React, { Component } from 'react';
import {
  Container,
	Row,
	Col,
} from 'react-bootstrap';

class AboutUs extends Component {
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
                <h2 className='animate-pop-in delay-2'>Acerca de Nosotros</h2>
                <p className='animate-pop-in delay-3'>
                  WebAnd.tv es una startup joven con experiencia a nivel de grandes companias, 
                  el equipo ha desarrollado aplicaciones para la compania Facebook, Globallogic y Deloitte.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                Logo Facebook / Logo Globallogic / Logo Deloitter
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AboutUs;