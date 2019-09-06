export const preLoadLogin = () => {
  return (
    <div className='single'>
      <div className='main-container'>
        <ScrollOverPack>
          <Row className='section none-bottom'>
            <Col>
              <div className='intro animate-pop-in delay-1'>eeeeeeeWebAnd.TV es la plataforma web creada para que tu canal de TV reciba más ingresos económicos y brinde más entretenimiento a tus televidentes.</div>
              <div className='animate-pop-in delay-2'>
                <p>
                  Ofrecemos la herramienta que tu canal necesita para generar los estimulos a 
                  los televidentes de hoy, que van desde mas participacion en tus redes sociales,
                  mas descargas de la App de tu canal, mas ingresos para ti y tus anunciantes.
                </p>
              </div>
            </Col>
          </Row>
        </ScrollOverPack>
        <ScrollOverPack always='true'>
          <Row className='section'>
            { boxTiles.map((boxTileItem) => this.boxTile(boxTileItem)) }
          </Row>
        </ScrollOverPack>
        <ScrollOverPack always='true'>
          <div>		
            <Row className='section animate-pop-in delay-1'>
              <Col>
              
                <div>
                  <h3>Nuevos Ingresos</h3>
                  
                    <p>
                      Forma parte de <span className='color-emphasis-1'>la red más importante de televidentes con un único sistema de micropagos y pagos.
                      </span> Donde con un simple click se destinan nuevos ingresos a tu canal y anunciantes.
                    </p>
                  
                </div>
              
              </Col>
            </Row>
          </div>
        </ScrollOverPack>
        <ScrollOverPack always='true'>
          <div className='bg-trianglify-purple animate-pop-in delay-1'>
            <Row className='section text-white'>
              <Col>
                <h2>¿Cómo funciona?</h2>
                
                <h3 className='hight-light'>
                  Es muy simple, comparte el link WebAnd.TV de tu canal
                  y se cargaran microwebsites sincronizados con tu contenido.
                </h3>
                <p>
                  A traves de un sencillo panel de control puedes agregar 
                  microwebsites creados por ti, tu equipo de desarrollo, marketing o comercial. 
                  Estos se muestran a tus televidentes coordinados con tu 
                  contenido estimulando a compras instantaneas y mas entretenimiento.
                </p>
                <Carousel>
                  <img src={imageBuy} alt='WebAndTV Buy'/>
                  <img src={imageVote} alt='WebAndTV Vote'/>
                  <img src={imageDownloadApp} alt='WebAndTV Download App'/>
                </Carousel>
                
                <p>
                  * Logos, imagenes y marcas son de caracter ilustrativo. No tienen ningun tipo de relacion con WebAnd.TV.
                </p>
              </Col>
            </Row>
          </div>
        </ScrollOverPack>
        <ScrollOverPack always='true'>
          <Row className='section animate-pop-in delay-1'>
            <Col>
                <h2>
                  Gratis!	<span className='hight-light'>para tu canal o programa de TV</span>
                </h2>
                
                  <p>
                    WebAnd.TV genera ingresos economicos adicionales a tu canal o programa de TV, de estos, obtienes el 95% y el 5% restante es para el mantenimiento de nuestra plataforma. No tienes que invertir nada.
                  </p>											
                
            </Col>
          </Row>
        </ScrollOverPack>
        <ScrollOverPack>
        
          <div className='bg-waves-purple animate-pop-in delay-1'>
            <Row className='section text-white '>
              <Col>
              <Row>
                <Col>
                  <h2>COMIENZA AHORA!</h2>
                  <p>
                    Registra tu canal de TV en WebAnd.TV y accede al panel de control. Es facil, rapido y totalmente gratis para tu canal de TV.
                  </p>
                </Col>								
              </Row>
              <Row>
                <Col>
                  <Form>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Canal de TV</Form.Label>
                      <Form.Control type='text' placeholder='name@example.com' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Country</Form.Label>
                      <Form.Control type='text' placeholder='name@example.com' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Estado/Provincia</Form.Label>
                      <Form.Control type='text' placeholder='' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>City</Form.Label>
                      <Form.Control type='text' placeholder='Ciudad' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type='text' placeholder='Nombre' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control type='text' placeholder='Apellido' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Telefono</Form.Label>
                      <Form.Control type='text' placeholder='ej: +1 000000000' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' placeholder='name@example.com' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' placeholder='Mayor a 8 caracteres' />
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>Repetir Password</Form.Label>
                      <Form.Control type='password' placeholder='Repite tu password' />
                    </Form.Group>
                    <div>
                      <Button variant='secondary'>Crear perfil de mi canal</Button>
                    </div>
                  </Form>
                </Col>								
              </Row>
              </Col>
            </Row>
            {()=>this.isBottomPage()}
          </div>
        </ScrollOverPack>
        
        <div style={{height: '800px'}}>
        </div>

      </div>
    </div>
  );
}