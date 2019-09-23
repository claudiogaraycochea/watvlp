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
import imageChatNow from '../../../assets/images/image-chat-now.png';
import imageTVBuy from '../../../assets/images/image-tv-buy.png';
import imageVoteMovies from '../../../assets/images/image-vote-movies.png';
import imageMore from '../../../assets/images/image-more.png';
import imageBuyCinema from '../../../assets/images/image-buy-cinema.png';
import imageVoteOppinion from '../../../assets/images/image-vote-oppinion.png';
import imageReaction from '../../../assets/images/image-reaction.png';

import Footer from '../core/footer/Footer';

import LoginModal from './modals/LoginModal';

import { Modal } from '../../ui/Theme';

import './Login.css';
import Carousel from 'nuka-carousel';

const ScrollOverPack = 'div'; //ScrollAnim.OverPack;
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
			isTop: true,
			modalShow: false,
			children: <div />,
		};
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
	}

	componentWillMount() {
		const boxTiles =[
			{
				icon: 'icon-hashtag',
				text: 'Haz que tus televidentes participen con un simple click a tus #hashtags.',
				bgColor: 'white',
			},
			{
				icon: 'icon-sale',
				text: 'Impulsa la venta productos de tus anunciantes con botones de compra intantanea.',
				bgColor: 'white',
			},
			{
				icon: 'icon-increase-revenue',
				text: 'Recibe nuevos ingresos a traves de nuestro sistema de anuncios online.',
				bgColor: 'white',
			},
			{
				icon: 'icon-micro-payment',
				text: 'Ofrece un sistema de micropago mucho más inmediato que por SMS o llamada.',
				bgColor: 'white',
			},
			{
				icon: 'icon-realtime',
				text: 'Conoce la opinión de tus televidentes en tiempo real.',
				bgColor: 'white',
			},
			{
				icon: 'icon-idea',
				text: 'Crea más entretenimiento y nuevas oportunidades económicas.',
				bgColor: 'white',
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

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop })
      }
    });
  }

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		this.setState({ modalShow: false });
	}

	boxTile = (boxTileItem) => {
		const { icon, text, bgColor } = boxTileItem;
		return (
			<Col xs={12} md={4}>
				<div className='box-tile animate-pop-in delay-1'>
					<div className='box-tile-content'>
						<div className='image animate-pop-in delay-1'><i className={`${icon} large`}></i></div>
						<div className='animate-pop-in delay-2'>
							{text}
						</div>
					</div>
					<div className={`box-tile-layout ${bgColor}`}></div>
					{/*<div className='box-tile-bg'></div>*/}
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


	render() {
		const { boxTiles, isTop, modalShow, children } = this.state;

		console.log('isTop: ', isTop);
		return (
			<div id='login-wrapper' className='login-wrapper animate-pop-in delay-1'>
				<header className={(!isTop) ? 'header-bg animate-pop-in delay-1' : null}>
					<div className='logo-webandtv animate-pop-in delay-1'></div>
					<Button
						className='btn-link'
						onClick={() => this.handleModal(
							<LoginModal
								handleModalClose={this.handleModalClose}
								handleModalAccept={this.handleModalAccept}
							/>,
						)}
					>
						Login
					</Button>
				</header>
				
				<div className='hero-wrapper bg-waves-purple animate-pop-in delay-1'>

					<div className='hero-title'>
						<ScrollOverPack always='true'>
							<h1 class='mega montserrat bold animate-pop-in delay-1'>
								Impulsamos el consumo instantáneo de tus televidentes
							</h1>
						</ScrollOverPack>
					</div>

					<div className='hero-image-wrapper animante-pop-in delay-1'>
						<div className='hero-image animante-pop-in delay-2'>
							<div className='hero-image-smartphone animante-pop-in delay-3'></div>
						</div>
					</div>
				</div>

				<div className='single'>
					<div className='main-container'>
						
							<Row className='section'>
								<Col>
									<div className='intro animate-pop-in delay-1'>
										Creamos la plataforma WebAnd.TV con el fin de generar a tu canal de TV más 
										ingresos económicos y más entretenimiento a tus televidentes.
									</div>
								</Col>
							</Row>
							<div className='arrow-div'></div>
							<Row className='section none-bottom'>
								<Col>
									<ScrollOverPack>
										<div className='animate-pop-in delay-2'>
											<h2>Adapta tu canal al televidente de hoy</h2>
											<h3 className='text-muted'>
												El televidente de hoy necesita estímulos e inmediates para acceder a todo lo que ve.
												Ofrecemos la herramienta que tu canal necesita para generar estos estimulos e
												impulsar el acceso a tus redes sociales, descargas de Apps, interactividad con 
												tu contenido, compras online y micropagos.
											</h3>
										</div>
									</ScrollOverPack>
								</Col>
							</Row>
							<Row className='section'>
								{ boxTiles.map((boxTileItem) => this.boxTile(boxTileItem)) }
							</Row>
							<div className='bg-waves-square animate-pop-in delay-1'>		
								<Row className='section bg-gear-wrapper-container'>
									<Col xs={12} md='6'>
										<div className='profile-channel'>
										</div>
									</Col>
									<Col xs={12} md='6'>
										<div className='content-half-half right text-white'>
											<ScrollOverPack always='true'>
											<p className='animate-pop-in delay-3'>
												Forma parte de <span className='hight-light'>la unica red de canales con un sistema de micropagos y pagos online.
												</span> Donde con un simple click se destinan nuevos ingresos a tu canal y anunciantes.
											</p>
											</ScrollOverPack>
										</div>
									</Col>
								</Row>
								<div className='bg-gear-animated'></div>
							</div>
						
							<div className='animate-pop-in delay-1'>
								<Row className='section'>
									<Col>
									<ScrollOverPack always='true'>
										<h2 className='animate-pop-in delay-3'>¿Cómo funciona?</h2>
										<h3 className='text-muted'>
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
											<img src={imageChatNow} alt='WebAndTV Chat'/>
											<img src={imageTVBuy} alt='WebAndTV TV Buy'/>
											<img src={imageVoteMovies} alt='WebAndTV Vote Movies'/>
											<img src={imageMore} alt='WebAndTV More'/>
											<img src={imageBuyCinema} alt='WebAndTV Buy Cinema'/>
											<img src={imageVoteOppinion} alt='WebAndTV Oppinion'/>
											<img src={imageReaction} alt='WebAndTV Reaction'/>
										</Carousel>
										<div className='notification-mark'>
											* Logos, imagenes y marcas son de caracter ilustrativo. No tienen ningun tipo de relacion con WebAnd.TV.
										</div>
									</ScrollOverPack>
									</Col>
								</Row>
							</div>

							<div className='arrow-div'></div>

							<Row className='section animate-pop-in delay-1'>
								<Col>
									<h2 className='animate-pop-in delay-2'>
										Gratis!	<span className='hight-light'>para tu canal o programa de TV</span>
									</h2>
									<ScrollOverPack always='true'>
									<div className='animate-pop-in delay-3'>
										WebAnd.TV genera ingresos economicos adicionales a tu canal o programa de TV, de estos, obtienes el 95% y el 5% restante es para el mantenimiento de nuestra plataforma. No tienes que invertir nada.
									</div>
									</ScrollOverPack>
								</Col>
							</Row>
						
							<div className='bg-waves-purple animate-pop-in delay-1'>
								<Row className='section text-white '>
									<Col>
										<Row>
											<Col>
												<ScrollOverPack>
												<h2 className='animate-pop-in delay-2'>COMIENZA AHORA!</h2>
												<p className='animate-pop-in delay-3'>
													Registra tu canal de TV en WebAnd.TV y accede al panel de control. Es facil, rapido y totalmente gratis para tu canal de TV.
												</p>
												</ScrollOverPack>
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
														<Form.Label>Password</Form.Label>
														<Form.Control type='password' placeholder='Mayor a 8 caracteres' />
													</Form.Group>
													<Form.Group>
														<Form.Label>Repetir Password</Form.Label>
														<Form.Control type='password' placeholder='Repite tu password' />
													</Form.Group>
													<div className='d-flex justify-content-end'>
														<Button 
															variant='success'
															className='btn-large'
														>
															Crear perfil de mi canal
														</Button>
													</div>
												</Form>
											</Col>
										</Row>
									</Col>
								</Row>
					  	</div>
					</div>

				</div>

				<Footer />

				<Modal
					show={modalShow}
					handleClose={this.handleModalClose}
					handleAccept={this.handleModalAccept}
				>
					{children}
				</Modal>
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
