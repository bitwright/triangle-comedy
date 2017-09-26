import React from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import * as actions from "../../actions";
import moment from "moment";

class ClassList extends React.Component {
  componentDidMount() {
    this.props.fetchClasses();
  }

  renderClasses() {
    this.props.events.sort((a, b) => {
      return a.time > b.time ? 1 : -1;
    });

    return this.props.events.map(event => {
      return (
        <Table.Row key={event.name}>
          <Table.Cell collapsing>{event.name}</Table.Cell>
          <Table.Cell collapsing>{event.description}</Table.Cell>
          <Table.Cell>{event.venue.name}</Table.Cell>
          <Table.Cell>
            {moment(event.time).format("hA - dddd, MMMM Do YYYY")}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4">Upcoming Classes</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell rowSpan="2">Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Description</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Venue</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderClasses()}</Table.Body>
        </Table>
      </div>
    );
  }
}

function mapStateToProps({ events, venues }) {
  return { events, venues };
}

export default connect(mapStateToProps, actions)(ClassList);
