import axios from 'axios';
import { FETCH_USER, SUBMIT_VENUE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitVenue = (values, history) => async dispatch => {
  const res = await axios.post('/venues', values);

  history.push('/venues');
  dispatch({ type: SUBMIT_VENUE });
}
