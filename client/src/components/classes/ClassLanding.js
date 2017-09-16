import React from 'react';
import { Container, Button } from 'semantic-ui-react'; 
import { Link } from 'react-router-dom';
import ClassList from './ClassList';

class ClassLanding extends React.Component {
  render() {
    return (
      <Container>
        <h1>Classes</h1>
        <ClassList />
        <Button
          as={Link}
          to='/classes/new'
          circular
          icon='plus'
          color='black'
          floated='right'
          size='large'
        />
      </Container>
    );
  }
}

export default ClassLanding;
