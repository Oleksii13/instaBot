import React from "react";



import { Container } from "reactstrap";

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">boyz2men• Insta-Bot</h1>
            <h3 className="d-none d-sm-block">
              This bot uses the targets that you've set to follow the other Instagram accounts and to leave comments and likes on their posts, and view their stories on behalf of your Instagram account.
            </h3>
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;
