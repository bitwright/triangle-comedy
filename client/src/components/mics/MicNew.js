import React from 'react';
import { Container } from 'semantic-ui-react';
import MicForm from './MicForm';

export default () => {
  return (
    <Container>
      <h1>Add a Mic</h1>
      <MicForm />
    </Container>
  );
}