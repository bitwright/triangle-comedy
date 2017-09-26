import React from "react";
import { Container } from "semantic-ui-react";
import VenueForm from "./VenueForm";

export default () => {
  return (
    <Container>
      <h1>Add a Venue</h1>
      <VenueForm />
    </Container>
  );
};
