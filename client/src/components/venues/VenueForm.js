import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AutcompleteItem = field => {
  const inputProps = {
    value: field.input.value,
    onChange: field.input.onChange
  };

  return (
    <PlacesAutocomplete inputProps={inputProps} />
  );
};

class VenueForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={ handleSubmit }>
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
        <Button type='submit' color='blue'>Next</Button>
      </Form>
    );
  }
}

function validate(values) {
  const errors = {};

  return errors; 
}

export default reduxForm({
  validate,
  form: 'venue',
  destroyOnUnmount: true
})(VenueForm);