import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';
import * as actions from '../../actions';

class VenueList extends React.Component {
  componentDidMount() {
    this.props.fetchVenues();
  }

  renderVenues() {
    return this.props.venues.map(venue => {
      const meta = (
        <a href={`https://maps.google.com/?q=${venue.location.address}`}>{venue.location.address}</a>
      );
      return (
        <Card 
          raised
          key={venue.id} 
          header={venue.name}
          meta={meta}
          extra={<a><Icon name='calendar' />{venue.events.length} events</a>}      
        /> 
      );
    });
  }

  render() {
    return (
      <Card.Group>
        {this.renderVenues()}
      </Card.Group>
    );
  }
}

function mapStateToProps({ venues }) {
  return { venues };
}

export default connect(mapStateToProps, actions)(VenueList);
