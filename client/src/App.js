import React, { Component } from 'react';
import { Button, Form, } from "react-bootstrap";
import API from './utils/API'
// require('./dotenv').config();
// const { USERNAME_L, PASSWORD } = process.env
// eslint-disable-next-line




class App extends Component {

  state = {
    username: "ivan.molotov.13",
    password: "baraban13",
    likeQuant: 3,
    likeTag: "webdeveloper",
    followQuant: 3,
    unfollowQuant: 3
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  Start = async () => {
    const res = API.start()
    console.log(res);

  }

  Login = async () => {
    const res = await API.login(this.state.username, this.state.password);
    console.log(res)
  }


  Like = async () => {
    const res = await API.like(this.state.likeTag, this.state.likeQuant);
    console.log(res)
  }

  Follow = async () => {
    const res = await API.follow(this.state.followQuant);
    console.log(res);
  }

  Unfollow = async () => {
    const res = await API.unfollow(this.state.unfollowQuant);
    console.log(res)
  }



  render() {
    return (
      <div >

        <Form.Group controlId="Start">
          <Form.Label>Start App</Form.Label>
          <Button variant="danger" size="lg" block onClick={() => { this.Start() }}>
            Start
          </Button>
        </Form.Group>

        <Form.Group controlId="Login">
          <Form.Label>Username</Form.Label>
          <Form.Control size="lg" type="text" placeholder="username" name="username" onChange={(this.handleChange)} />
          <Form.Label>Password</Form.Label>
          <Form.Control size="lg" type="text" placeholder="password" name="password" onChange={(this.handleChange)} />
          <Button variant="primary" size="lg" block onClick={() => { this.Login() }}>
            Login
          </Button>
        </Form.Group>

        <Form.Group controlId="Likes">
          <Form.Label>Like's quantity</Form.Label>
          <Form.Control size="lg" type="text" placeholder="number of likes" name="likeQuant" onChange={(this.handleChange)} />
          <Form.Label>Liked tag</Form.Label>
          <Form.Control size="lg" type="text" placeholder="liked tag" name="likeTag" onChange={(this.handleChange)} />
          <Button variant="secondary" size="lg" block onClick={() => { this.Like() }}>
            Like
       </Button>
        </Form.Group>

        <Form.Group controlId="Follow">
          <Form.Label>Follower's quantity</Form.Label>
          <Form.Control size="lg" type="text" placeholder="follow" name="followQuant" onChange={(this.handleChange)} />
          <Button variant="primary" size="lg" block onClick={() => { this.Follow() }}>
            Follow
       </Button>
        </Form.Group>

        <Form.Group controlId="Unfollow">
          <Form.Label>Unfollower's quantity</Form.Label>
          <Form.Control size="lg" type="text" placeholder="unfollow" name="unfollowQuant" onChange={(this.handleChange)} />
          <Button variant="secondary" size="lg" block onClick={() => { this.Unfollow() }}>
            Unfollow
       </Button>
        </Form.Group >

      </div>
    );
  }
}

export default App;
