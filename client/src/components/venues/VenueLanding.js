import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import VenueList from './VenueList.js';

class VenueLanding extends React.Component {
  render() {
    return (
      <Container>
        <h1>VenueLanding</h1>
        <Button 
          as={Link}
          to='/venues/new'
          circular 
          icon='plus' 
          color='red' 
          floated='right' 
          size='large' 
        />
      </Container>
    );
  }
}

export default VenueLanding;
