import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import Datetime from 'react-datetime';
import '../react-datetime.css';
import * as actions from '../../actions';
import axios from 'axios';
import moment from 'moment';

const FileInput = field => {
  delete field.input.value;
  return (
    <input
      type='file'
      accept='image/gif, image/png, image/jpeg'
      {...field.input}
    />
  );
}

class ClassForm extends React.Component {
  componentDidMount() {
    this.props.fetchVenues();
  }

  async onFormSubmit(values) {
    this.props.history.push('/mics');
    const data = new FormData();
    data.append('name', values.name);
    data.append('description', values.description);
    data.append('time', new Date(moment(values.time._d).format('MM/DD/YYYY hh:mm A')));
    data.append('venue', values.venue);
    data.append('photo', values.photo[0]);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    await axios.post('/api/events/mics', data, config);
  }

  render() {
    const { handleSubmit } = this.props;
    const venueOptions = [
      this.props.venues.map(venue => {
        return { text: venue.name, value: venue.id };
      })
    ];

    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Form.Field>
          <label>Name</label>
          <Field
            name='name'
            component='input'
            type='text'
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <Field
            name='description'
            component='textarea'
          />
        </Form.Field>
        <Form.Field>
          <label>Time</label>
          <Field 
            name='time'
            component={props => 
              <Datetime {...props.input} 
            />}
          />
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <Field 
            name='venue'
            component={props => 
              <Dropdown 
                placeholder='Select a venue' 
                selection 
                options={venueOptions[0]} 
                {...props.input}
                value={props.input.value}
                onChange={(param, data) => props.input.onChange(data.value)}
            />}
          />
        </Form.Field>
        <Form.Field>
          <label>Photo</label>
          <Field
            name='photo'
            id='photo'
            component={FileInput}
          />
        </Form.Field>
        <Button type='submit' color='blue'>Create</Button>
      </Form>
    );
  }
}

function validate(values) {
  const errors = {};

  return errors;
}

function mapStateToProps({ venues }) {
  return { venues };
}

export default reduxForm({
  validate,
  form: 'class'
})(connect(mapStateToProps, actions)(withRouter(ClassForm)));