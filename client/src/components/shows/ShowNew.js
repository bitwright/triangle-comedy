import React from "react";
import { Container } from "semantic-ui-react";
import ShowForm from "./ShowForm";

export default () => {
  return (
    <Container>
      <h1>Add a Show</h1>
      <ShowForm />
    </Container>
  );
};
