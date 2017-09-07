import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import * as actions from '../../actions';
import axios from 'axios';

const AutcompleteItem = field => {
  const inputProps = {
    value: field.input.value,
    onChange: field.input.onChange
  };

  return (
    <PlacesAutocomplete inputProps={inputProps} />
  );
};

const FileInput = field => {
  delete field.input.value;
  return <input type='file' {...field.input} />;
};

class VenueForm extends React.Component {
  async _onFormSubmit(values) {
    const geocoded = await geocodeByAddress(values.location);
    const latLng = await getLatLng(geocoded[0]);
    
    values = {
      ...values, 
      location: {
        address:  geocoded[0].formatted_address,
        coordinates: [ latLng.lat, latLng.lng ]
      }
    };

    await axios.post('/api/venues', values);
  }

  render() {
    console.log(actions);
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this._onFormSubmit)} encType='multipart/form-data'>
        <Form.Field>
          <label>Name</label>
          <Field
            name='name'
            component='input'
            type='text'
            placeholder='Goodnights'
          />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <Field 
            name='location'
            component={AutcompleteItem}
            type='text'
          />     
        </Form.Field>
        <Form.Field>
          <label>Photo</label>
          <Field
            name='photo'
            component={FileInput}
            accept='image/gif, image/png, image/jpeg' 
          />
        </Form.Field>
        <Button type='submit' color='blue'>Create</Button>
      </Form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) errors.name = 'Please enter a name';
  if (!values.location) errors.location = 'Please enter a location';

  return errors; 
}

export default reduxForm({
  validate,
  form: 'venue',
  destroyOnUnmount: true
}, null, actions)(withRouter(VenueForm));