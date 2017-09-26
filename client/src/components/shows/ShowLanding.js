import React from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ShowList from "./ShowList";

class ShowLanding extends React.Component {
  render() {
    return (
      <Container>
        <h1>Shows</h1>
        <ShowList />
        <Button
          as={Link}
          to="/shows/new"
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

export default ShowLanding;
