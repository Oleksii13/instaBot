import React, { Component } from 'react';


import {
    FormGroup,
    Label,
    Input,
    Button,
    Container,
    Row,
    Col,
    Alert
} from "reactstrap";

import API from '../utils/API'
import 'whatwg-fetch';
import { Redirect } from 'react-router';
import {
    getFromStorage,
} from '../utils/storage';
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbars/ExamplesNavbar";
import PageHeader from "../components/PageHeader/PageHeader"


class Main extends Component {

    state = {
        username: "ivan.molotov.13",
        password: "baraban13",
        likeQuant: 3,
        likeTag: "webdeveloper",
        followQuant: 3,
        unfollowQuant: 3,
        isLoading: true,
        token: '',
        launchMessage: '',
        logInMessage: '',
        likeMessage: '',
        followMessage: '',
        unfollowMessage: '',
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
                            token,
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
        document.body.classList.toggle("index-page");
    }

    componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    logout = () => {
        this.setState({
            isLoading: true,
        });
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/account/logout?token=' + token)
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
    }

    Start = async () => {
        const res = await API.start()
        await console.log(res);
        if (res.status === 200) {
            this.setState({
                launchMessage: "Your Bot has been launched",
                logInMessage: '',
                likeMessage: '',
                followMessage: '',
                unfollowMessage: '',
            })

        }

    }

    Login = async () => {
        const res = await API.login(this.state.username, this.state.password);
        await console.log(res)
        if (res.status === 200) {
            this.setState({
                logInMessage: "You've logged in",
                launchMessage: '',
                likeMessage: '',
                followMessage: '',
                unfollowMessage: '',
            })
        }
    }


    Like = async () => {
        const res = await API.like(this.state.likeTag, this.state.likeQuant);
        await console.log(res)
        if (res.status === 200) {
            this.setState({
                likeMessage: "You Liked people",
                launchMessage: '',
                logInMessage: '',
                followMessage: '',
                unfollowMessage: '',
            })
        }
    }

    Follow = async () => {
        const res = await API.follow(this.state.followQuant);
        await console.log(res)
        if (res.status === 200) {
            this.setState({
                followMessage: "You've done with following people",
                launchMessage: '',
                logInMessage: '',
                likeMessage: '',
                unfollowMessage: '',
            })
        }
    }

    Unfollow = async () => {
        const res = await API.unfollow(this.state.unfollowQuant);
        await console.log(res)
        if (res.status === 200) {
            this.setState({
                unfollowMessage: "So sad to unfollow those people",
                launchMessage: '',
                logInMessage: '',
                likeMessage: '',
                followMessage: '',
            })
        }
    }



    render() {
        const { token,
            isLoading,
            launchMessage,
            logInMessage,
            likeMessage,
            followMessage,
            unfollowMessage,
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

        if (token) {
            return (
                <div>

                    <Navbar />

                    <div className="wrapper">

                        <PageHeader />

                        <div className="main">

                            <Container>

                                <Row>

                                    <Col>


                                        <FormGroup>
                                            <p className="h2">Launch The Bot</p>
                                            {
                                                (launchMessage) ? (
                                                    <Alert color="info">{launchMessage} </Alert>
                                                ) : (null)
                                            }
                                            <Button onClick={() => { this.Start() }} className="btn-round" color="primary">
                                                Launch The Bot
                                                    </Button>
                                        </FormGroup>
                                    </Col>


                                </Row>
                                <br>
                                </br>
                                <br>
                                </br>
                                <Row>
                                    <Col>

                                        <FormGroup className="col-md-3">
                                            <h2>Log in to instagram page first</h2>
                                            <Label for="inputEmail4">Username</Label>
                                            <Input id="inputEmail4" type="text" placeholder="username" name="username" onChange={(this.handleChange)} />
                                            <Label for="some1">Password</Label>
                                            <Input type="password" placeholder="password" name="password" onChange={(this.handleChange)} id="some1" autoComplete="off" />
                                            {
                                                (logInMessage) ? (
                                                    <Alert color="info">{logInMessage} </Alert>
                                                ) : (null)
                                            }
                                            <Button onClick={() => { this.Login() }} className="btn-round" color="primary">
                                                Bot Log in
                                                    </Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup >
                                            <Label for="inputEmail1">How many likes do you want to make?</Label>
                                            <Input id="inputEmail1" type="number" placeholder="number of likes" name="likeQuant" onChange={(this.handleChange)} />
                                            <Label for="some2">What the Hashtag do you want to search?</Label>
                                            <Input type="text" placeholder="liked tag" name="likeTag" onChange={(this.handleChange)} id="some2" autoComplete="off" />
                                            {
                                                (likeMessage) ? (
                                                    <Alert color="info">{likeMessage} </Alert>
                                                ) : (null)
                                            }
                                            <Button onClick={() => { this.Like() }} className="btn-round" color="primary">
                                                Like
                                                    </Button>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup >

                                            <Label for="some3">How many people do you want to follow?</Label>
                                            <Input type="number" placeholder="follow" name="followQuant" onChange={(this.handleChange)} id="some3" autoComplete="off" />
                                            {
                                                (followMessage) ? (
                                                    <Alert color="info">{followMessage} </Alert>
                                                ) : (null)
                                            }
                                            <Button onClick={() => { this.Follow() }} className="btn-round" color="primary">
                                                Follow
                                                    </Button>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup >

                                            <Label for="some5">Tell me amout of people I should Unfollow!</Label>
                                            <Input type="number" placeholder="unfollow" name="unfollowQuant" onChange={(this.handleChange)} id="some5" autoComplete="off" />
                                            {
                                                (unfollowMessage) ? (
                                                    <Alert color="info">{unfollowMessage} </Alert>
                                                ) : (null)
                                            }
                                            <Button onClick={() => { this.Unfollow() }} className="btn-round" color="primary">
                                                Unfollow
                                                    </Button>
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                        <Footer />
                    </div >
                </div >
            );
        } else {
            return (
                <div>
                    <Redirect from="/main" to="/" />
                </div>
            )
        }
    }
}

export default Main