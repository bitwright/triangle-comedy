import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Datetime from 'react-datetime';

export const renderField = ({ input, type, meta: { touched, error } }) => (
  <div>
    <input {...input} type={type} />
    <div>
      {touched && error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  </div>
);

export const FileInput = field => {
  delete field.input.value;
  return (
    <input
      type='file'
      accept='image/gif, image/png, image/jpeg'
      {...field.input}
    />
  );
}

export const DropdownInput = ({ input, meta: { touched, error }, venues }) => {
  const venueOptions = [
    venues.map(venue => {
      return { text: venue.name, value: venue.id };
    })
  ];

  return (
    <div>
      <Dropdown 
        placeholder='Select a venue' 
        selection 
        options={venueOptions[0]} 
        {...input}
        value={input.value}
        onChange={(param, data) => input.onChange(data.value)}
      />
      <div>
        {touched && error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    </div>
  );
}

export const DatetimeInput = ({ input, meta: { touched, error } }) => {
  return (
    <div>
      <Datetime {...input} />
      <div>
        {touched && error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    </div>
  );
}