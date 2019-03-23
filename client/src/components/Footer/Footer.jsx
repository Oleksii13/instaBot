import React from "react";

// import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md="3">
              <h1 className="title">Insta-Bot•</h1>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink >
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink >
                    Landing
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink >
                    Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink >
                    Profile
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink href="/">
                    Contact Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">
                    License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <h3 className="title">Follow us:</h3>
              <div className="btn-wrapper profile">
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="/"
                  id="tooltip622135962"

                >
                  <i className="fab fa-twitter" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip622135962">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="/"
                  id="tooltip230450801"

                >
                  <i className="fab fa-facebook-square" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip230450801">
                  Like us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="/"
                  id="tooltip318450378"

                >
                  <i className="fab fa-dribbble" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip318450378">
                  Follow us
                </UncontrolledTooltip>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
