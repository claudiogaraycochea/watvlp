import React from 'react';

import PropTypes from 'prop-types';

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

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updated: false,
			email: '',
			password: '',
			errorMessage: null,
			boxTiles: [],
		};
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
				text: 'Ofrece un sistema de micropago rápido similar a SMS pero online.',
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

		this.setState({boxTiles});
	}

	componentWillReceiveProps(prevProps) {
		if ((prevProps.errorMessage !== this.props.errorMessage)
		&& (this.props.errorMessage !== null)) {
			this.setState({
				errorMessage: this.props.errorMessage,
			});
		}
	}

	boxTile = (boxTileItem) => {
		const { icon, text, bgColor } = boxTileItem;
		return (
			<Col xs={12} md={4}>
				<div className='box purple box-tile'>
					<div className='box-tile-content'>
						<div className='image'><i className={`${icon} large`}></i></div>
						<div>
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

	render() {
		const { boxTiles } = this.state;
		return (
			<div className='login-wrapper'>
				<header>
					<div className='logo-webandtv'></div>
				</header>
				<div className='hero-wrapper bg-trianglify-purple'>

					<div className='hero-title'>
						<div class=''>
							<h1 class='mega montserrat bold'>
								Impulsa el <span class='color-emphasis-1'>consumo </span>
								instantáneo <span class='color-emphasis-1'>de tus televidentes.</span>
							</h1>
						</div>
					</div>

					<div className='hero-image-wrapper'>
						<div className='hero-image' />
					</div>
				</div>
				<div className='single'>
					<div className='main-container'>
						<Row className='section none-bottom'>
							<Col>
								<div className='intro'>WebAnd.TV es la plataforma web creada para que tu canal de TV reciba más ingresos económicos y brinde más entretenimiento a tus televidentes.</div>
							</Col>
						</Row>
						<Row className='section'>
							{ boxTiles.map((boxTileItem) => this.boxTile(boxTileItem)) }
						</Row>
						<div className='bg-dark'>
							<Row className='section text-white'>
								<Col>
									<h3>Nuevos Ingresos</h3>
									<p>
										{`No pierdas la posibilidad de formar parte de `}
										<span className='color-emphasis-1'>la red más importante de televidentes con un unico sistema de micropagos y pagos.
										</span> Donde con un simple click se destinan nuevos ingresos a tu canal y anunciantes.
									</p>
								</Col>
							</Row>							
						</div>
						<div className='bg-trianglify-purple'>
							<Row className='section text-white'>
								<Col>
									<h2>¿Cómo funciona?</h2>
									<h3 className='hight-light'>
										Es muy simple, comparte el link WebAnd.TV de tu canal
										y se cargaran microwebsites sincronizados con tu contenido.
									</h3>
									<p>
										WebAnd.TV tiene un proposito diferente la App de tu canal o tu pagina web. 
										Se trata de la red de televidentes formada por canales de TV
										con un unico sistema de pagos y entretenimiento.
									</p>
									<p>
										Nuestra plataforma incremente el numero de descargas de la App de tu canal y anunciantes, 
										mas participacion en tus redes sociales, mas ingresos y entretenimiento. 
										Sin dudas un cambio positivo para que descubras.
									</p>
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
						<Row className='section'>
							<Col>
								<h2>
									Gratis!	<span className='hight-light'>para tu canal o programa de TV</span>
								</h2>
								<p>
									WebAnd.TV genera ingresos economicos adicionales a tu canal o programa de TV, de estos, obtienes el 95% y el 5% restante es para el mantenimiento de nuestra plataforma. No tienes que invertir nada.
								</p>
							</Col>
						</Row>
						<div className='bg-trianglify-blue'>
							<Row className='section text-white'>
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
							</Row>
						</div>
					</div>
				</div>
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
