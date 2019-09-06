import React from 'react';

import PropTypes from 'prop-types';
import ScrollAnim from 'rc-scroll-anim';

import {
	Row,
	Col,
	Form,
	Button,
} from 'react-bootstrap';

import imageDownloadApp from '../../../assets/images/image-download-app.png';
import imageVote from '../../../assets/images/image-vote.png';
import imageBuy from '../../../assets/images/image-buy.png';

import './Login.css';
import Carousel from 'nuka-carousel';

const ScrollOverPack = ScrollAnim.OverPack;
ScrollAnim.scrollScreen.init({ loop: true });

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updated: false,
			email: '',
			password: '',
			errorMessage: null,
			boxTiles: [],
			loginWrapper: 0,
		};
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentWillMount() {
		const boxTiles =[
			{
				icon: 'icon-hashtag',
				text: 'Haz que tus televidentes participen con tus #hashtags a través de un simple click.',
				bgColor: 'purple',
			},
			{
				icon: 'icon-sale',
				text: 'Impulsa la venta productos de tus anunciantes con botones de compra intantanea.',
				bgColor: 'blue',
			},
			{
				icon: 'icon-increase-revenue',
				text: 'Recibe importantes ingresos economicos a traves de un nuevo sistema de anuncios online.',
				bgColor: 'red',
			},
			{
				icon: 'icon-micro-payment',
				text: 'Ofrece un sistema de micropago mucho más rápido que por SMS.',
				bgColor: 'orange',
			},
			{
				icon: 'icon-realtime',
				text: 'Adapta tu canal al televidente de hoy con contenido interactivo.',
				bgColor: 'green',
			},
			{
				icon: 'icon-idea',
				text: 'Crea nuevas oportunidades economicas y de entretenimiento.',
				bgColor: 'yellow',
			},
		];
		this.updateDimensions();
		this.setState({boxTiles});
	}

	componentDidMount() {
		const loginWrapper = document.getElementById('main-container').clientHeight+500;
		window.addEventListener("resize", this.updateDimensions);
		this.setState({loginWrapper: loginWrapper});
	}

	componentWillReceiveProps(prevProps) {
		if ((prevProps.errorMessage !== this.props.errorMessage)
		&& (this.props.errorMessage !== null)) {
			this.setState({
				errorMessage: this.props.errorMessage,
			});
		}
	}

	updateDimensions() {
		const loginWrapper = 0;
		this.setThisDimensions(loginWrapper);
	}

	setThisDimensions(loginWrapper) {
		this.setState({loginWrapper});
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	boxTile = (boxTileItem) => {
		const { icon, text, bgColor } = boxTileItem;
		return (
			<Col xs={12} md={4}>
				<div className='box box-tile animate-pop-in delay-1'>
					<div className='box-tile-content'>
						<div className='image animate-pop-in delay-1'><i className={`${icon} large`}></i></div>
						<div className='animate-pop-in delay-2'>
							{text}
						</div>
					</div>
					<div className={`box-tile-layout ${bgColor}`}></div>
					<div className='box-tile-bg'></div>
				</div>
			</Col>
		);
	}

	componentDidUpdate(prevProps) {
		if(this.state.loginWrapper === 0) {
			const loginWrapper = document.getElementById('main-container').clientHeight+500;
			this.setState({loginWrapper: loginWrapper});
		}

		if (
			(prevProps.user !== this.props.user)
			&& (this.props.errorMessage === null)
			&& (this.state.updated)) {
			const { firstname, uid, id } = this.props.user.data;
			const { token } = this.props.user;
			localStorage.setItem('firstname', firstname);
			localStorage.setItem('token', token);
			localStorage.setItem('id', id);
			localStorage.setItem('uid', uid);
			this.props.history.push('/dashboard/');
		}
	}

	onHandleSubmit = (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		if (email !== '' && password !== '') {
			this.setState({ updated: true });
			this.props.userLogin(email, password);
		}
	};

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
	};

	preLoadLogin = () => {
		const { boxTiles } = this.state;
		return (
			<div className='single'>
				<div id='main-container' className='main-container'>
					<div className='scroll-anim'>
						<Row className='section none-bottom'>
							<Col>
								<div className='intro animate-pop-in delay-1'>WebAnd.TV es la plataforma web creada para que tu canal de TV reciba más ingresos económicos y brinde más entretenimiento a tus televidentes.</div>
								<div className='animate-pop-in delay-2'>
									<p>
										Ofrecemos la herramienta que tu canal necesita para generar los estimulos a 
										los televidentes de hoy, que van desde mas participacion en tus redes sociales,
										mas descargas de la App de tu canal, mas ingresos para ti y tus anunciantes.
									</p>
								</div>
							</Col>
						</Row>
					</div>
					<div className='scroll-anim'>
						<Row className='section'>
							{ boxTiles.map((boxTileItem) => this.boxTile(boxTileItem)) }
						</Row>
					</div>
					<div className='scroll-anim'>
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
					</div>
					<div className='scroll-anim'>
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
					</div>
					<div className='scroll-anim'>
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
					</div>
					<div className='scroll-anim'>
					
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
											<Form.Group>
												<Form.Label>Canal de TV</Form.Label>
												<Form.Control type='text' placeholder='name@example.com' />
											</Form.Group>
											<Form.Group>
												<Form.Label>Country</Form.Label>
												<Form.Control type='text' placeholder='name@example.com' />
											</Form.Group>
											<Form.Group>
												<Form.Label>Estado/Provincia</Form.Label>
												<Form.Control type='text' placeholder='' />
											</Form.Group>
											<Form.Group>
												<Form.Label>City</Form.Label>
												<Form.Control type='text' placeholder='Ciudad' />
											</Form.Group>
											<Form.Group>
												<Form.Label>Nombre</Form.Label>
												<Form.Control type='text' placeholder='Nombre' />
											</Form.Group>
											<Form.Group>
												<Form.Label>Apellido</Form.Label>
												<Form.Control type='text' placeholder='Apellido' />
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
												<Form.Label>Password</Form.Label>
												<Form.Control type='password' placeholder='Mayor a 8 caracteres' />
											</Form.Group>
											<Form.Group>
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
						</div>
					</div>
	
				</div>
			</div>
		);
	}

	render() {
		const { boxTiles, loginWrapper } = this.state;
		return (
			<div id='login-wrapper' className='login-wrapper' style={{height: `${loginWrapper}px`}}>
				<header>
					<div className='logo-webandtv animate-pop-in delay-1'></div>
				</header>
				
				<div className='hero-wrapper bg-waves-purple'>

					<div className='hero-title'>
						<ScrollOverPack always='true'>
							<h1 class='mega montserrat bold animate-pop-in delay-1'>
								Impulsa el <span class='color-emphasis-1'>consumo </span>
								instantáneo <span class='color-emphasis-1'>de tus televidentes.</span>
							</h1>
						</ScrollOverPack>
					</div>

					<div className='hero-image-wrapper'>
						<div className='hero-image aimante-pop-in delay-1'>
							<div className='hero-image-smartphone animate-pop-in delay-2'></div>
						</div>
					</div>
				</div>

				{(loginWrapper === 0) ? (this.preLoadLogin()) : (
				<div className='single'>
					<div className='main-container'>
						<ScrollOverPack>
							<Row className='section none-bottom'>
								<Col>
									<div className='intro animate-pop-in delay-1'>WebAnd.TV es la plataforma web creada para que tu canal de TV reciba más ingresos económicos y brinde más entretenimiento a tus televidentes.</div>
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
								<Row className='section'>
									<Col>
										<div>
											<div className='animate-pop-in delay-1'>
												<h3>Nuevos Ingresos</h3>
											</div>
											<div className='animate-pop-in delay-2'>
												Forma parte de <span className='color-emphasis-1'>la red más importante de televidentes con un único sistema de micropagos y pagos.
												</span> Donde con un simple click se destinan nuevos ingresos a tu canal y anunciantes.
											</div>
										</div>
									</Col>
								</Row>
							</div>
						</ScrollOverPack>
						<ScrollOverPack always='true'>
							<div className='bg-trianglify-purple animate-pop-in delay-1'>
								<Row className='section text-white'>
									<Col>
										<h2 className='animate-pop-in delay-3'>¿Cómo funciona?</h2>
										
										<h3 className='hight-light animate-pop-in delay-4'>
											Es muy simple, comparte el link WebAnd.TV de tu canal
											y se cargaran microwebsites sincronizados con tu contenido.
										</h3>
										<p className='animate-pop-in delay-5'>
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
									<h2 className='animate-pop-in delay-2'>
										Gratis!	<span className='hight-light'>para tu canal o programa de TV</span>
									</h2>
									<div className='animate-pop-in delay-2'>
										WebAnd.TV genera ingresos economicos adicionales a tu canal o programa de TV, de estos, obtienes el 95% y el 5% restante es para el mantenimiento de nuestra plataforma. No tienes que invertir nada.
									</div>
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
												<Form.Group>
													<Form.Label>Canal de TV</Form.Label>
													<Form.Control type='text' placeholder='name@example.com' />
												</Form.Group>
												<Form.Group>
													<Form.Label>Country</Form.Label>
													<Form.Control type='text' placeholder='name@example.com' />
												</Form.Group>
												<Form.Group>
													<Form.Label>Estado/Provincia</Form.Label>
													<Form.Control type='text' placeholder='' />
												</Form.Group>
												<Form.Group>
													<Form.Label>City</Form.Label>
													<Form.Control type='text' placeholder='Ciudad' />
												</Form.Group>
												<Form.Group>
													<Form.Label>Nombre</Form.Label>
													<Form.Control type='text' placeholder='Nombre' />
												</Form.Group>
												<Form.Group>
													<Form.Label>Apellido</Form.Label>
													<Form.Control type='text' placeholder='Apellido' />
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
													<Form.Label>Password</Form.Label>
													<Form.Control type='password' placeholder='Mayor a 8 caracteres' />
												</Form.Group>
												<Form.Group>
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
					  	</div>
						</ScrollOverPack>
						

					</div>

				</div>
				)
			}
			</div>
		);
	}
}

Login.propTypes = {
	user: PropTypes.object,
	errorMessage: PropTypes.string,
	userLogin: PropTypes.func,
	history: PropTypes.object.isRequired,
};

Login.defaultProps = {
	user: {},
	errorMessage: '',
	userLogin: () => null,
};

export default Login;
