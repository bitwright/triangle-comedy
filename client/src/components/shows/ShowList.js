import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import * as actions from '../../actions';
import moment from 'moment';

class ShowList extends React.Component {
  componentDidMount() {
  	this.props.fetchShows();
    this.props.fetchVenues();
  }

  renderShows() {

  	return (
  	  this.props.events.map(show => {
    		return (
          <Table.Row key={show.name}>
            <Table.Cell collapsing>
              {show.name}
            </Table.Cell>
            <Table.Cell collapsing>
              {show.description}
            </Table.Cell>
            <Table.Cell>
              {show.venue}
            </Table.Cell>
            <Table.Cell>
              {moment(show.time).format('hA - dddd, MMMM Do YYYY')}
            </Table.Cell>
          </Table.Row>
    		) 
  	  })
  	);
  }

  render() {
  	return (
  	  <div>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>Upcoming Shows</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Description</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Venue</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderShows()}
          </Table.Body>
        </Table>
  	  </div>
  	);
  }
}

function mapStateToProps({ events, venues }) {
  return { events, venues };
}

export default connect(mapStateToProps, actions)(ShowList);