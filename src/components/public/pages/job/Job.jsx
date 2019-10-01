import React, { Component } from 'react';
import {
  Container,
	Row,
  Col,
  Form,
  Button,
  Alert,
  Accordion,
  Card,
} from 'react-bootstrap';

import { request } from '../../../../lib/https';

const jobList = [
  {
    id: 1,
    title: 'Senior Software Engineer, Frontend',
    date: '10/27/2019',
    description: `WebAnd.tv is growing rapidly and is seeking 2 senior frontend engineers to join our team. You will collaborate closely with Product, Design and Marketing to spec, build, test, deploy and iterate new features.

      Our ideal candidate is passionate about gaming, problem solving, and personal growth. You are a team player who is not afraid to collaborate with others and you love a challenge.
      
      What you'll be doing:
      * Working effectively with a high degree of autonomy in collaboration with other members of the team.
      * Building new product features in a modern technology stack.
      * Participating in stand-ups, code reviews and retrospectives with our on-site and remote teams.
      * Working closely with frontend/backend teams to make architecture and design decisions.
      * Implementing UI design iterations for our mobile and web products.
      * Reviewing, maintaining and improving code.
      * Helping to make sure everything runs smoothly and safely in production.
      
      Requirements:
      * Proficiency with Angular/Ionic and experience with other web frameworks/libraries.
      * 5-7 years work or equivalent experience.
      * Experience using a version control system such as Git, understanding of deployment pipelines.
      * Ability to write reliable, well-tested code.
      * You're interested in mentoring - as our teams grow, you'll help nurture and guide incoming developers.
      * Strong knowledge of SaaS, LESS, CSS3/4, Typescript, ES6
      
      Bonuses (nice to have, but not required):
      * You describe yourself as an avid gamer
      * You have experience in engineering leadership positions
      * You've worked in the gaming/e-sports space before
      
      No contractors, agencies, or recruiters please. You must have legal entitlement to work in Canada or the United States.
      
      Technologies we use:
      - Ionic4 (Angular, Vue & REACT).
      - PHP-Symfony2
      - Javascript, Typescript
      - AWS (CI, EC2, LB, EB, CloudFunctions, etc...)
      - Blockchain (we've built our own proprietary blockchain protocol called Guardian)
      - Sketch, InVision, Photoshop
      - Slack, Jira, BitBucket`,
  }, 
  {
    id: 2,
    title: 'Full stack developer',
    date: '10/12/2019',
    description: `The position will require the successful candidate to work inter-departmentally across Marketing, Product Management, Design, News, Finance, and Developer teams.

      Responsibilities:
      
      - Work alongside Product & Engineering to build a world-class gaming experience
      - Build Casino gaming and non-casino style games
      
      Requirements
      
      - 3+ yrs Javascript
      - 3+ yrs Java & Python
      - Must be using Java 8, Python 3, Javascript ES5 or greater
      - Basic understanding of cryptocurrency terminology (TX, BTC, BCH, etc.)
      - Able to work to tight deadlines
      - Communicates well in both written and verbal English
      
      Nice To Have:
      
      - Working in a blockchain, cryptocurrency or digital assets environment
      - Cryptocurrency development a big plus
      - Experience working within an Agile framework
      - Biggest plus if was involved in a gaming business
      - Has worked with JIRA
      
      Bitcoin.com is a leader in Cryptocurrency gaming, come join us in building the next generation of gaming products.
      
      Benefits
      
      HR can't wait to share what makes us special.`,
  },
  {
    id: 3,
    title: 'Mobile (React Native) Software Engineer',
    date: '09/04/2019',
    description: `
      You’ll have ownership over the VanGo mobile apps and work with a small team of outsourced developers to ship new features and improvements regularly. As a member of an early stage start-up, you'll be wearing many hats, but these are the responsibilities that would be under your purview.

      What you’ll be working on:
      - Work collaboratively with design/product and other engineers to build new features, fix issues, and continually make improvements to the mobile apps
      - Translate and break down product requirements into actionable items and tasks
      - Implement and enforce best practices for the mobile code base and architecture

      What we’re really looking for:
      - 2+ years of hands-on engineering experience
      - 1+ years of React Native experience
      - Strong attention to detail, quality and effective communication
      - A good mobile UI/UX sense

      Nice-to-haves :):
      - Experience working with remote or outsourced teams
      - Experience with native iOS and/or Android mobile development
    `,
  },
  {
    id: 4,
    title: 'Full-Stack Software Engineer (Tech Lead)',
    date: '10/1/2019',
    description: `
      You will be leading technical development of the WebAnd.tv product and will manage a small, fast-moving team of developers. As a member of an early stage start-up, you'd be wearing many hats, but these are the responsibilities that would be under your purview.

      What you’d be working on:
      - Lead an outsourced team of developers to ensure features are shipped in a high-quality, timely way
      - Distill fast-moving product requirements into tangible engineering tasks and designs
      - Make improvements to existing backend services to make them more reliable, secure, testable and maintainable
      - Perform code reviews and set a high standard of excellence in the code stack
      - Prioritize architectural initiatives and tech debt
      - Assist in recruiting top talent as we start to bring roles in-house

      What we’re really looking for:
      - 3+ years of hands-on engineering experience
      - Technical command of Javascript, Node.js, React / React Native, Object Oriented Programming
      - Clear communication of design and process ideas to both technical and non-technical peers
      - Command of relational databases, web / mobile app architectures, and design patterns
      - An ability to manage a small team of developers and ship high fidelity software products quickly
      - Smart technical generalist with a strong understanding of data structures and algorithms

      Nice-to-haves :):
      - Experience working at a Series A - D startup
      - Experience working with remote or outsourced teams
    `,
  }

];

class Job extends Component {
	constructor(props) {
		super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
      validated: false,
      sendResult: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
				firstname,
				lastname,
				email,
				message,
			} = this.state;

			const user = {
				firstname,
				lastname,
				email,
        message,
			};
			this.handleSignUp(user);
		}
		return true;
	}

	async handleSignUp(user) {
		const data = `firstname=${user.firstname}&lastname=${user.lastname}&email=${user.email}&message=Job:${user.message}`;
		try {
			const resp = await request('POST', '/sendMessage/', data, {});
			this.setState({sendResult: resp.data.result});
		} catch (err) {
			console.error(err);
		}
  }

  render () {
    const { 
      firstname,
      lastname,
      email,
      message,
      validated,
      sendResult,
    } = this.state;

    return (
      <Container className='align-center'>
        <Row>
          <Col>
            <Row>
              <Col>
                <h2 className='animate-pop-in delay-2'>Job</h2>
              </Col>								
            </Row>
            <Row>
              <Col>
                <Accordion defaultActiveKey="0">
                  {jobList.map((job)=>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey={job.id}>
                        {job.title}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={job.id}>
                        <Card.Body>
                          <div className='text-format'>{job.description}</div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )}
                </Accordion>
              </Col>
            </Row>
            <Row>
              <Col className='animate-pop-in delay-4'>
                {(sendResult) ? <Alert variant='success'>Su mensaje se ha enviado correctamente, nos pondremos en contacto a la brevedad.</Alert> : 
                <Form
                  className='call-to-action'
                  noValidate
                  validated={validated}
                  onSubmit={(event) => this.handleSubmit(event)}
                >
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
                      type='email'
                      placeholder='Email'
                      name='email'
                      value={email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      as='textarea'
                      placeholder='Mensaje'
                      name='message'
                      value={message}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                  <div className='d-flex justify-content-end'>
                    <Button
                      type='submit'
                      variant='primary'
                    >
                      Enviar
                    </Button>
                  </div>
                </Form>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Job;