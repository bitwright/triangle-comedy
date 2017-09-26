import { FETCH_SHOWS, FETCH_MICS, FETCH_CLASSES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SHOWS:
      return action.payload;
    case FETCH_MICS:
      return action.payload;
    case FETCH_CLASSES:
      return action.payload;
    default:
      return state;
  }
}
