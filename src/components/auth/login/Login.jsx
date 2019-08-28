import React from 'react';

import PropTypes from 'prop-types';

import {
	Row,
	Col,
	Form,
	Button,
	Alert,
} from 'react-bootstrap';

import imageDownloadApp from '../../../assets/images/image-download-app.png';
import imageVote from '../../../assets/images/image-vote.png';
import imageBuy from '../../../assets/images/image-buy.png';

import './Login.css';
import Carousel from 'nuka-carousel';
import Footer from '../../core/footer/Footer';

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
				text: 'Haz que participen con tus #hashtags con un simple click',
				bgColor: 'purple',
			},
			{
				icon: 'icon-sale',
				text: 'Vende productos de tus anunciantes con botones de compra intantanea',
				bgColor: 'blue',
			},
			{
				icon: 'icon-increase-revenue',
				text: 'Recibe nuevos ingresos economicos a traves de anuncios online',
				bgColor: 'red',
			},
			{
				icon: 'icon-micro-payment',
				text: 'Ofrece un sistema de micropagos rapidos',
				bgColor: 'orange',
			},
			{
				icon: 'icon-realtime',
				text: 'Haz que participen en tiempo real con tu contenido',
				bgColor: 'green',
			},
			{
				icon: 'icon-idea',
				text: 'Descubre y crea nuevas oportunidades economicas y de entretenminento',
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
						<div className='image'><i className={`${icon} medium`}></i></div>
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
		const { errorMessage, boxTiles } = this.state;
		return (
			<div className='login-wrapper'>
				<header>
					<div className='logo-webandtv'></div>
				</header>
				<div className='hero-wrapper bg-waves-purple'>
					<div className='hero-title'>
						IMPULSA EL CONSUMO INSTANTANEO DE TUS TELEVIDENTES
					</div>
					<div className='hero-image-wrapper'>
						<div className='hero-image' />
					</div>
				</div>
				<div className='single'>
					<div className='main-container'>
						<Row className='section'>
							<Col>
								<div className='intro'>WebAnd.TV es una plataforma web que enfocada a generar mas ingresos economicos y entretenimiento para tu canal o programa de tv</div>
							</Col>
						</Row>
						<Row>
							{ boxTiles.map((boxTileItem) => this.boxTile(boxTileItem)) }
						</Row>
						<div>
							<Row className='section'>
								<Col>
									Y lo mas importante... estamos formando la red mas grande de
									televidentes con un sistema estandar de micropagos donde con 
									un simple click destinan dinero a tu canal.
								</Col>
							</Row>							
						</div>
						<div className='bg-trianglify-purple'>
							<Row className='section text-white'>
								<Col>
									<h2>COMO FUNCIONA?</h2>
									<h3 className='hight-light'>
										Es super simple, compartes el link de tu canal y se cargaran micro-websites sincronizados con tu transimision
									</h3>
									<p>
										Tu o tu equipo de desarrollo puede crear micro-websites especialmente desarrollados para compras directas, obtejer mas interaccion, etc.
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
								<h2>GRATIS!</h2>
								<h3 className='hight-light'>Para tu canal o programa de TV</h3>
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
											Es super simple, compartes el link de tu canal y se cargaran micro-websites sincronizados con tu transimision.
										</p>
									</Col>								
								</Row>
								<Row>
									<Col>
										<Form>
											<Form.Group controlId='exampleForm.ControlInput1'>
												<Form.Label>Email address</Form.Label>
												<Form.Control type='email' placeholder='name@example.com' />
											</Form.Group>
											<Form.Group controlId='exampleForm.ControlInput1'>
												<Form.Label>City</Form.Label>
												<Form.Control type='email' placeholder='name@example.com' />
											</Form.Group>
											<div>
												<Button variant='secondary'>Create</Button>
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
