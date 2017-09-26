import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import Datetime from "react-datetime";
import {
  renderField,
  FileInput,
  DropdownInput,
  DatetimeInput
} from "../FormFields";
import "../react-datetime.css";
import * as actions from "../../actions";
import axios from "axios";
import moment from "moment";

class MicForm extends React.Component {
  componentDidMount() {
    this.props.fetchVenues();
  }

  async onFormSubmit(values) {
    this.props.history.push("/mics");
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append(
      "time",
      new Date(moment(values.time._d).format("MM/DD/YYYY hh:mm A"))
    );
    data.append("venue", values.venue);
    if (values.photo) {
      data.append("photo", values.photo[0]);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    await axios.post("/api/events/mics", data, config);
  }

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Form.Field>
          <label>Name</label>
          <Field name="name" component={renderField} type="text" />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <Field name="description" component={renderField} type="text" />
        </Form.Field>
        <Form.Field>
          <label>Time</label>
          <Field name="time" component={DatetimeInput} />
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <Field
            name="venue"
            component={DropdownInput}
            venues={this.props.venues}
          />
        </Form.Field>
        <Form.Field>
          <label>Photo</label>
          <Field name="photo" id="photo" component={FileInput} />
        </Form.Field>
        {error && <strong>{error}</strong>}
        <Button type="submit" color="blue" disabled={submitting}>
          Create
        </Button>
      </Form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) errors.name = "You must enter a name!";
  if (!values.description) errors.description = "You must enter a description!";
  if (!values.time) errors.time = "You must enter a time!";
  if (!values.venue) errors.venue = "You must enter a venue!";

  return errors;
}

function mapStateToProps({ venues }) {
  return { venues };
}

export default reduxForm({
  validate,
  form: "mics"
})(connect(mapStateToProps, actions)(withRouter(MicForm)));
