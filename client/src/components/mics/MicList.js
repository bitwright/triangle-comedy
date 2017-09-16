import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import * as actions from '../../actions';
import moment from 'moment';

class MicList extends React.Component {
  componentDidMount() {
  	this.props.fetchMics();
    this.props.fetchVenues();
  }

  renderMics() {

  	return (
  	  this.props.events.map(mic => {
    		return (
          <Table.Row key={mic.name}>
            <Table.Cell collapsing>
              {mic.name}
            </Table.Cell>
            <Table.Cell collapsing>
              {mic.description}
            </Table.Cell>
            <Table.Cell>
              {mic.venue}
            </Table.Cell>
            <Table.Cell>
              {moment(mic.time).format('hA - dddd, MMMM Do YYYY')}
            </Table.Cell>
          </Table.Row>
    		) 
  	  })
  	);
  }

  render() {
    console.log(this.props);
  	return (
  	  <div>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>Upcoming Mics</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Description</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Venue</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderMics()}
          </Table.Body>
        </Table>
  	  </div>
  	);
  }
}

function mapStateToProps({ events, venues }) {
  return { events, venues };
}

export default connect(mapStateToProps, actions)(MicList);