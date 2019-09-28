import React from 'react';

import PropTypes from 'prop-types';
import ScrollAnim from 'rc-scroll-anim';
import { Link } from 'react-router-dom';

import { request } from '../../../lib/https';

import {
	Row,
	Col,
	Form,
	Button,
	InputGroup,
	Alert,
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
			errorMessage: null,
			boxTiles: [],
			isTop: true,
			modalShow: false,
			children: <div />,
			terms: false,
			validated: false,
			linkname: '',
			firstname: '',
			lastname: '',
			telephone: '',
			email: '',
			password: '',
			confirmPassword: '',
			signUpResult: false,
		};
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	UNSAFE_componentWillMount() {
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
				linkname,
				firstname,
				lastname,
				telephone,
				email,
				password,
			} = this.state;

			// eslint-disable-next-line
			/*const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
			if (!passwordRegex.test(password)) {
				this.setState({ errorMessage: 'Password must contain at least one lowercase character, one uppercase character, one number and one special character' });
				return false;
			}

			if (password !== confirmPassword) {
				this.setState({ errorMessage: 'Passwords have to be the same' });
				return false;
			}*/

			const user = {
				linkname,
				firstname,
				lastname,
				telephone,
				email,
				password,
			};
			this.handleSignUp(user);
		}
		return true;
	}

	async handleSignUp(user) {
		const data = `linkname=${user.linkname}&firstname=${user.firstname}&lastname=${user.lastname}&telephone=${user.telephone}&email=${user.email}&password=${user.password}`;
		try {
			const resp = await request('POST', '/signUpLP/', data, {});
			this.setState({signUpResult: resp.data.result});
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		const { 
			boxTiles,
			isTop,
			modalShow,
			children,
			terms,
			validated,
			linkname,
			firstname,
			lastname,
			telephone,
			email,
			password,
			confirmPassword,
			signUpResult,
		} = this.state;

		console.log('isTop: ', isTop);
		return (
			<div id='login-wrapper' className='login-wrapper animate-pop-in delay-1'>
				<header className={(!isTop) ? 'animate-pop-in delay-1' : 'header-bg-remove'}>
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
										Creamos la plataforma WebAnd.tv con el fin de generar a tu canal de TV más 
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
										<div className='content-half-half right'>
											<ScrollOverPack always='true'>
											<h3 className='animate-pop-in delay-3'>
												Forma parte de <span className='hight-light'>la unica red de canales con un sistema de micropagos y pagos online.
												</span> Donde con un simple click se destinan nuevos ingresos a tu canal y anunciantes.
											</h3>
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
											Comparte el link WebAnd.tv de tu canal y automáticamente 
											se cargarán microwebsites sincronizados con tu contenido
										</h3>
										<p className='animate-pop-in delay-5'>
											A través de un sencillo panel de control puedes agregar 
											microwebsites creados por tí, tu equipo de desarrollo o marketing.  
											Los mismos se mostrarán coordinados con el 
											contenido de tu transmisión, brindando una nueva
											 manera de interactuar con cada uno de tus televidentes.
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
										Gratis para tu canal de TV
									</h2>
									<ScrollOverPack always='true'>
									<div className='animate-pop-in delay-3'>
										WebAnd.tv no tiene ningún costo para tu canal de TV. 
										Nos sustentamos con el 5% de los ingresos que generes gracias 
										a nuestra plataforma y el 95% restante es totalmente para tu 
										canal de TV.
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
													Registra tu canal de TV en WebAnd.tv y accede al panel de control.
												</p>
												</ScrollOverPack>
											</Col>								
										</Row>
										<Row>
											<Col className='animate-pop-in delay-4'>
												{(signUpResult) ? <Alert variant='success'>Tu solicitud se ha enviado correctamente, un representante estara contactando para brindarte el acceso a tu cuenta y asesoramiento personalisado.</Alert> : 
												<Form
													className='call-to-action'
													noValidate
													validated={validated}
													onSubmit={(event) => this.handleSubmit(event)}
												>
													<Form.Group controlId="validationCustomUsername">
														<InputGroup>
															<InputGroup.Prepend>
																<InputGroup.Text id="inputGroupPrepend">https://weband.tv/</InputGroup.Text>
															</InputGroup.Prepend>
															<Form.Control
																type="text"
																placeholder="Nombre de Link"
																aria-describedby="inputGroupPrepend"
																name='linkname'
																value={linkname}
																onChange={this.handleInputChange}
																required
															/>
														</InputGroup>
													</Form.Group>
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
															type='text'
															placeholder='Telefono/Interno'
															name='telephone'
															value={telephone}
															onChange={this.handleInputChange}
															required
														/>
													</Form.Group>
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
													<Form.Row>
														<Form.Group as={Col}>
															<Form.Control
																type='password'
																placeholder='Password'
																name='password'
																value={password}
																onChange={this.handleInputChange}
																required
															/>
														</Form.Group>
														<Form.Group as={Col}>
															<Form.Control
																type='password'
																placeholder='Repetir Password'
																name='confirmPassword'
																value={confirmPassword}
																onChange={this.handleInputChange}
																required
															/>
														</Form.Group>
													</Form.Row>
													<Form.Group
														controlId='termsAndCondition'
														className='d-flex'
													>
														<Form.Check
															type='checkbox'
															checked={!!(terms)}
															name='terms'
															value={terms}
															onChange={this.handleInputChange}
															required
														/>
														<div className='terms-wrapper'>
															<span>Acepta los </span>
															<Link to='////weband.tv/terms' target='_blank'>
																&nbsp;Términos & Condiciones
															</Link>
															<span> y </span>
															<Link to='////weband.tv/privacy' target='_blank'>
																Privacidad
															</Link>
														</div>
													</Form.Group>
													<div className='d-flex justify-content-end'>
														<Button
															type='submit'
															variant='success'
															className='btn-large'
														>
															Crear cuenta
														</Button>
													</div>
												</Form>
											}
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
