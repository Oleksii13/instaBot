import React, { Component } from 'react';
import { Link } from "react-router-dom"
import 'whatwg-fetch';
import { Redirect } from 'react-router';


import classnames from "classnames";
import {
    setInStorage,
    getFromStorage,
} from '../utils/storage';
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


class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
            signed: false,
            squares1to6: "",
            squares7and8: ""
        };

        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);


        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);

        this.followCursor = this.followCursor.bind(this);
    }


    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: '',
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", this.followCursor);
    }

    componentWillUnmount() {
        document.body.classList.toggle("register-page");
        document.documentElement.removeEventListener(
            "mousemove",
            this.followCursor
        );
    }

    followCursor(event) {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        this.setState({
            squares1to6:
                "perspective(500px) rotateY(" +
                posX * 0.05 +
                "deg) rotateX(" +
                posY * -0.05 +
                "deg)",
            squares7and8:
                "perspective(500px) rotateY(" +
                posX * 0.02 +
                "deg) rotateX(" +
                posY * -0.02 +
                "deg)"
        });
    };

    onTextboxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        });
    }

    onTextboxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        });
    }

    onSignUp(e) {

    }

    onSignIn() {
        // Grab state
        const { signInEmail, signInPassword } = this.state;
        this.setState({ isLoading: true });
        // Post request to backend
        fetch('/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    setInStorage('the_main_app', { token: json.token });
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInPassword: '',
                        signInEmail: '',
                        token: json.token,
                    });
                } else {
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                    });
                }
            });
    }


    render() {
        const {
            isLoading,
            token,
            signInError,
            signInEmail,
            signInPassword,

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
        if (!token) {
            return (
                <div>
                    <Navbar />
                    <div>
                        {
                            (signInError) ? (
                                <p>{signInError}</p>
                            ) : (null)
                        }
                        {/* <p>Sign In</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={signInEmail}
                            onChange={this.onTextboxChangeSignInEmail}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={signInPassword}
                            onChange={this.onTextboxChangeSignInPassword}
                        />
                        <br /> */}
                        {/* <button onClick={this.onSignIn}>Sign In</button>
                        <button> <a href="/signup" onClick={this.onSignUp}>Sign Up</a></button> */}

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
                                                        <CardTitle tag="h4">`Log In</CardTitle>
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
                                                                    value={signInEmail}
                                                                    onChange={this.onTextboxChangeSignInEmail}
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
                                                                    value={signInPassword}
                                                                    onChange={this.onTextboxChangeSignInPassword}
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
                                                        (signInError) ? (
                                                            <Alert color="info">{signInError} </Alert>
                                                        ) : (null)
                                                    }
                                                    <CardFooter>
                                                        <Button onClick={this.onSignIn} className="btn-round" color="primary" size="lg">
                                                            Log In
                                                        </Button>
                                                        <Link to="/signup">
                                                            <Button className="btn-round" color="primary" size="lg">

                                                                Sign Up
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
        }
        return (
            <div>
                <Redirect from="/" to="/main" />
            </div>
        );

    }


    // end
}

export default Signin