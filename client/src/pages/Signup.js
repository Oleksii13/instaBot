import React, { Component } from 'react';



import { Link } from "react-router-dom"
import 'whatwg-fetch';
import { Redirect } from 'react-router';
import classnames from "classnames";

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbars/IndexNavbar";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Alert
} from "reactstrap";

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            signUpError: '',
            signUpEmail: '',
            signUpPassword: '',
            signed: false,
        };

        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);


        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
    }

    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
    }

    componentDidMount() {
        this.setState({
            isLoading: false,
            signed: false
        });
    }

    onSignIn(e) {

    }

    onSignUp() {
        // Grab state
        const { signUpEmail, signUpPassword, } = this.state;
        this.setState({
            isLoading: true,
        });
        // Post request to backend
        fetch('/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signUpEmail,
                password: signUpPassword,
            }),
        }).then(res => {
            return res.json();
        })
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                        signUpEmail: '',
                        signUpPassword: '',
                        signed: true
                    });

                } else {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    render() {
        const {
            isLoading,
            signUpEmail,
            signUpPassword,
            signUpError,
            signed
        } = this.state;
        if (isLoading) {
            return (
                <div>
                    <Navbar />
                    <p>Loading...</p>
                    <Footer />
                </div>
            );
        }

        if (!signed) {
            return (
                <div>
                    <Navbar />
                    <div>
                        {/* {
                            (signUpError) ? (
                                <p>{signUpError}</p>
                            ) : (null)
                        } */}

                        <div className="wrapper">
                            <div className="page-header">
                                <div className="page-header-image" />
                                <div className="content">
                                    <Container>
                                        <Row>
                                            <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                                                <div
                                                    className="square square-7"
                                                    id="square7"
                                                    style={{ transform: this.state.squares7and8 }}
                                                />
                                                <div
                                                    className="square square-8"
                                                    id="square8"
                                                    style={{ transform: this.state.squares7and8 }}
                                                />
                                                <Card className="card-register">
                                                    <CardHeader>
                                                        <CardImg
                                                            alt="..."
                                                            src={require("../assets/img/square-purple-1.png")}
                                                        />
                                                        <CardTitle tag="h4">Sign Up</CardTitle>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <Form className="form">
                                                            <InputGroup
                                                                className={classnames({
                                                                    "input-group-focus": this.state.emailFocus
                                                                })}
                                                            >
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="tim-icons icon-email-85" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="Email"
                                                                    value={signUpEmail}
                                                                    onChange={this.onTextboxChangeSignUpEmail}
                                                                    onFocus={e => this.setState({ emailFocus: true })}
                                                                    onBlur={e => this.setState({ emailFocus: false })}

                                                                />
                                                            </InputGroup>
                                                            <InputGroup
                                                                className={classnames({
                                                                    "input-group-focus": this.state.passwordFocus
                                                                })}
                                                            >
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="tim-icons icon-lock-circle" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="Password"
                                                                    onFocus={e =>
                                                                        this.setState({ passwordFocus: true })
                                                                    }
                                                                    onBlur={e =>
                                                                        this.setState({ passwordFocus: false })
                                                                    }
                                                                    value={signUpPassword}
                                                                    onChange={this.onTextboxChangeSignUpPassword}
                                                                />
                                                            </InputGroup>
                                                            <FormGroup check className="text-left">
                                                                <Label check>
                                                                    <Input type="checkbox" />
                                                                    <span className="form-check-sign" />I agree to the{" "}
                                                                    <a
                                                                        href="/"
                                                                        onClick={e => e.preventDefault()}
                                                                    >
                                                                        terms and conditions
                              </a>
                                                                    .
                            </Label>
                                                            </FormGroup>
                                                        </Form>
                                                    </CardBody>
                                                    {
                                                        (signUpError) ? (
                                                            <Alert color="info">{signUpError} </Alert>
                                                        ) : (null)
                                                    }
                                                    <CardFooter>
                                                        <Button onClick={this.onSignUp} className="btn-round" color="primary" size="lg">
                                                            Sign Up
                                                        </Button>
                                                        <Link to="/">
                                                            <Button className="btn-round" color="primary" size="lg">

                                                                Sign In
                                                            </Button>
                                                        </Link>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <div className="register-bg" />
                                        <div
                                            className="square square-1"
                                            id="square1"
                                            style={{ transform: this.state.squares1to6 }}
                                        />
                                        <div
                                            className="square square-2"
                                            id="square2"
                                            style={{ transform: this.state.squares1to6 }}
                                        />
                                        <div
                                            className="square square-3"
                                            id="square3"
                                            style={{ transform: this.state.squares1to6 }}
                                        />
                                        <div
                                            className="square square-4"
                                            id="square4"
                                            style={{ transform: this.state.squares1to6 }}
                                        />
                                        <div
                                            className="square square-5"
                                            id="square5"
                                            style={{ transform: this.state.squares1to6 }}
                                        />
                                        <div
                                            className="square square-6"
                                            id="square6"
                                            style={{ transform: this.state.squares1to6 }}
                                        />
                                    </Container>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Redirect from="/signup" to="/" />
                </div>
            )
        }


    }
}

export default Signup