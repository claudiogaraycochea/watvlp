import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { t, i18n } = this.props;
		return (
			<Container>
				<Row>
					<Col>
						<div className='text-center text-small py-2'>
							<span className='label-text space'>
								{` Copyright © ${new Date().getFullYear()} WebAnd.TV`}
							</span>
							<a href='https://weband.tv/terms' target='_blank'>{t('footer.terms')}</a>
							<a href='https://weband.tv/privacy' target='_blank'>{t('footer.privacy')}</a>
							<Link to='/job' className='space'>{t('footer.job')}</Link>
							<Link to='/contactUs'>{t('footer.contactUs')}</Link>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='text-center text-small py-2'>
							<Button
								className='btn-link'
								onClick={()=>i18n.changeLanguage('en')}
							>
								English
							</Button>
							<Button
								className='btn-link'
								onClick={()=>i18n.changeLanguage('es')}
							>
								Spanish
							</Button>
							<Button
								className='btn-link'
								onClick={()=>i18n.changeLanguage('de')}
							>
								German
							</Button>
							<Button
								className='btn-link'
								onClick={()=>i18n.changeLanguage('fr')}
							>
								French
							</Button>
							<Button
								className='btn-link'
								onClick={()=>i18n.changeLanguage('pt')}
							>
								Portuguese
							</Button>
							<Button
								className='btn-link'
								onClick={()=>i18n.changeLanguage('cn')}
							>
								Chinese
							</Button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='text-small'>
							Share Smart TV LTD. Ch. De Prévenoge 2, 1024 Ecublens (Lausanne), Switzerland
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default withTranslation()(Footer);
