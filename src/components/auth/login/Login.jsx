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

import heroSmartphone from '../../../assets/images/hero-image-smartphone.svg';
import heroSmartTV from '../../../assets/images/smarttv-bg.png';
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
import LogoFacebook from '../../../assets/images/logo-facebook.png';
import LogoGlobalLogic from '../../../assets/images/logo-globallogic.png';
import LogoDeloitte from '../../../assets/images/logo-deloitte.png';

import Footer from '../core/footer/Footer';

import LoginModal from './modals/LoginModal';

import { Modal } from '../../ui/Theme';

import './Login.css';
import Slider from "react-slick";

import { withTranslation } from 'react-i18next';

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
		this.updateBoxTiles();
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
		const { icon, text, bgColor, id } = boxTileItem;
		return (
			<Col xs={12} md={4} key={id}>
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

		if (prevProps.t !== this.props.t) {
			this.updateBoxTiles();
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

	updateBoxTiles() {
		const { t } = this.props;
		const boxTiles =[
			{
				id: 1,
				icon: 'icon-hashtag',
				text: t('home.adapt.hashtag'),
				bgColor: 'white',
			},
			{
				id: 2,
				icon: 'icon-sale',
				text: t('home.adapt.sale'),
				bgColor: 'white',
			},
			{
				id: 3,
				icon: 'icon-increase-revenue',
				text: t('home.adapt.increase'),
				bgColor: 'white',
			},
			{
				id: 4,
				icon: 'icon-micro-payment',
				text: t('home.adapt.micropayment'),
				bgColor: 'white',
			},
			{
				id: 5,
				icon: 'icon-realtime',
				text: t('home.adapt.realtime'),
				bgColor: 'white',
			},
			{
				id: 6,
				icon: 'icon-idea',
				text: t('home.adapt.idea'),
				bgColor: 'white',
			},
		];
		this.setState({boxTiles});
	}

	render() {
		
    const { t } = this.props;

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

		const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
		};

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

					<div className='hero-center'>
						<div className='hero-title'>
							<h1 className='mega montserrat bold animate-pop-in delay-1'>
								{t('home.title')}
							</h1>							
						</div>
						<div className='hero-container'>
							<img src={heroSmartphone} alt='WebAndTV Buy' className='hero-image-smartphone'/>
							<img src={heroSmartTV} alt='WebAndTV Buy' className='hero-image-smarttv'/>
						</div>
					</div>

				</div>

				<div className='single'>
					<div className='main-container'>
						
							<Row className='section'>
								<Col>
									<div className='intro animate-pop-in delay-1'>
										{t('home.intro')}
									</div>
								</Col>
							</Row>
							<div className='arrow-div'></div>
							<Row className='section none-bottom'>
								<Col>
									<ScrollOverPack>
										<div className='animate-pop-in delay-2'>
											<h2>{t('home.adapt.title')}</h2>
											<h3 className='text-muted'>
												{t('home.adapt.description')}
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
												{t('home.network.description1')}
												<span className='hight-light'>{t('home.network.description2')}</span>
												{t('home.network.description3')}
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
										<Row>
											<Col>
												<h2 className='animate-pop-in delay-3'>{t('home.how_work.title')}</h2>
												<h3 className='text-muted'>
													{t('home.how_work.subtitle')}
												</h3>
												<p className='animate-pop-in delay-5'>
													{t('home.how_work.description')}
												</p>										
											</Col>
										</Row>
										<Row>
											<Col>
												<div className='image-slider-wrapper'>
													<Slider {...settings}>
														<div>
															<img src={imageBuy} alt='WebAndTV Buy' className='image-slider'/>
														</div>
														<div>
															<img src={imageVote} alt='WebAndTV Vote' className='image-slider'/>
														</div>
														<div>
															<img src={imageDownloadApp} alt='WebAndTV Download App' className='image-slider'/>
														</div>
														<div>
															<img src={imageChatNow} alt='WebAndTV Chat' className='image-slider'/>
														</div>
														<div>
															<img src={imageTVBuy} alt='WebAndTV TV Buy' className='image-slider'/>
														</div>
														<div>
															<img src={imageVoteMovies} alt='WebAndTV Vote Movies' className='image-slider'/>
														</div>
														<div>
															<img src={imageMore} alt='WebAndTV More' className='image-slider'/>
														</div>
														<div>
															<img src={imageBuyCinema} alt='WebAndTV Buy Cinema' className='image-slider'/>
														</div>
														<div>
															<img src={imageVoteOppinion} alt='WebAndTV Oppinion' className='image-slider'/>
														</div>
														<div>
															<img src={imageReaction} alt='WebAndTV Reaction' className='image-slider'/>
														</div>
													</Slider>
												</div>
											</Col>
										</Row>
										<Row>
											<Col>
												<div className='notification-mark'>
													{t('home.how_work.legal')}
												</div>		
											</Col>
										</Row>
									</Col>
								</Row>
							</div>

							<div className='arrow-div'></div>

							<Row className='section animate-pop-in delay-1'>
								<Col>
									<h2 className='animate-pop-in delay-2'>
										{t('home.free.title')}
									</h2>
									<ScrollOverPack always='true'>
									<div className='animate-pop-in delay-3'>
										{t('home.free.description')}
									</div>
									</ScrollOverPack>
								</Col>
							</Row>

							<div className='arrow-div'></div>
						
							<Row className='section animate-pop-in delay-1'>
								<Col>
									<Row>
										<Col>
											<h2 className='animate-pop-in delay-2'>{t('about.title')}</h2>
											<p className='animate-pop-in delay-3'>
												{t('about.description')}
											</p>
										</Col>
									</Row>
									<Row>
										<Col className='animate-pop-in delay-4'>
											<img src={LogoFacebook} alt='Facebook' className='logo-image'/>
										</Col>
										<Col className='animate-pop-in delay-6'>
											<img src={LogoDeloitte} alt='Deloitte' className='logo-image'/>
										</Col>
										<Col className='animate-pop-in delay-5'>
											<img src={LogoGlobalLogic} alt='GlobalLogic' className='logo-image'/>
										</Col>
									</Row>
								</Col>
							</Row>

							<div className='bg-waves-purple animate-pop-in delay-1'>
								<Row className='section text-white '>
									<Col>
										<Row>
											<Col>
												<ScrollOverPack>
												<h2 className='animate-pop-in delay-2'>{t('home.contact.title')}</h2>
												<p className='animate-pop-in delay-3'>
													{t('home.contact.description')}
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
													<Form.Group controlId='validationCustomUsername'>
														<InputGroup>
															<InputGroup.Prepend>
																<InputGroup.Text id='inputGroupPrepend'>weband.tv/</InputGroup.Text>
															</InputGroup.Prepend>
															<Form.Control
																type='text'
																placeholder={t('general.linkname')}
																aria-describedby='inputGroupPrepend'
																name='linkname'
																value={linkname}
																onChange={this.handleInputChange}
																required
															/>
														</InputGroup>
													</Form.Group>
													<Form.Row>
														<Form.Group as={Col} xs={12} md={6}>
															<Form.Control
																type='text'
																placeholder={t('general.firstname')}
																name='firstname'
																value={firstname}
																onChange={this.handleInputChange}
																required
															/>
														</Form.Group>
														<Form.Group as={Col} xs={12} md={6}>
															<Form.Control
																type='text'
																placeholder={t('general.lastname')}
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
															placeholder={t('general.telephone')}
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
														<Form.Group as={Col} xs={12} md={6}>
															<Form.Control
																type='password'
																placeholder='Password'
																name='password'
																value={password}
																onChange={this.handleInputChange}
																required
															/>
														</Form.Group>
														<Form.Group as={Col} xs={12} md={6}>
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
															<span>{t('general.terms.text1')}</span>
															<Link to='////weband.tv/terms' target='_blank'>
																&nbsp;{t('footer.terms')}
															</Link>
															<span> {t('general.terms.text2')} </span>
															<Link to='////weband.tv/privacy' target='_blank'>
																{t('footer.privacy')}
															</Link>
														</div>
													</Form.Group>
													<div className='d-flex justify-content-end'>
														<Button
															type='submit'
															variant='success'
															className='btn-large'
														>
															{t('general.signIn')}
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

export default withTranslation()(Login);
