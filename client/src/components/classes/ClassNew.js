import React from 'react';
import { Container } from 'semantic-ui-react';
import ClassForm from './ClassForm';

export default () => {
  return (
    <Container>
      <h1>Add a Class</h1>
      <ClassForm />
    </Container>
  );
}