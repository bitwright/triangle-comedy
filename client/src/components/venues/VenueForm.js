import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class VenueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.onChange = (address) => this.setState({ address });
  }

  render() {
    const { handleSubmit } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

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
            component={PlacesAutocomplete}
            type='text'
            inputProps={inputProps}
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