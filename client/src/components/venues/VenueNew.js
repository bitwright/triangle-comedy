import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import VenueForm from './VenueForm';
import * as actions from '../../actions';

class VenueNew extends React.Component {
  submit(values) {
    console.log(values);
  }

  render() {
    return (
      <Container>
        <h1>Add a Venue</h1>
        <VenueForm onSubmit={this.submit} />
      </Container>
    );
  }
}

export default connect(null, actions)(VenueNew);