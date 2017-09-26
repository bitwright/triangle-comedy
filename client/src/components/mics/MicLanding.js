import React from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MicList from "./MicList";

class MicLanding extends React.Component {
  render() {
    return (
      <Container>
        <h1>Mics</h1>
        <MicList />
        <Button
          as={Link}
          to="/mics/new"
          circular
          icon="plus"
          color="black"
          floated="right"
          size="large"
        />
      </Container>
    );
  }
}

export default MicLanding;
