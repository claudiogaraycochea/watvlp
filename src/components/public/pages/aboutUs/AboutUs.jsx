import React, { Component } from 'react';
import {
  Container,
	Row,
	Col,
} from 'react-bootstrap';

import LogoFacebook from '../../../../assets/images/logo-facebook.png';
import LogoGlobalLogic from '../../../../assets/images/logo-globallogic.png';
import LogoDeloitte from '../../../../assets/images/logo-deloitte.png';

class AboutUs extends Component {
	constructor(props) {
		super(props);
    this.state = {};
  }
  render () {
    return (
      <Container className='align-center'>
        <Row>
          <Col>
            <Row>
              <Col>
                <h2 className='animate-pop-in delay-2'>Acerca de Nosotros</h2>
                <p className='animate-pop-in delay-3'>
                  Si bien WebAnd.tv es una startup joven, cuenta con un equipo de profesionales con mas 
                  de 16 anos de experiencia trabajando para startups de Silicon Valley, Suiza y Espana.
                  Entre ellas hemos desarrollado aplicaciones para la companias como Facebook, Globallogic y Deloitte.
                  Esta experiencia es volcada al desarrollo de herramientas disponibles para tu canal de TV.
                </p>
              </Col>
            </Row>
            <Row>
              <Col className='animate-pop-in delay-4'>
                <img src={LogoFacebook} alt='Facebook'/>
              </Col>
              <Col className='animate-pop-in delay-5'>
                <img src={LogoGlobalLogic} alt='GlobalLogic'/>
              </Col>
              <Col className='animate-pop-in delay-6'>
                <img src={LogoDeloitte} alt='Deloitte' />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AboutUs;