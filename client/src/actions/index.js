import axios from "axios";
import {
  FETCH_USER,
  FETCH_VENUES,
  FETCH_SHOWS,
  FETCH_MICS,
  FETCH_CLASSES
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchVenues = () => async dispatch => {
  const res = await axios.get("/api/venues");

  dispatch({ type: FETCH_VENUES, payload: res.data });
};

export const fetchShows = () => async dispatch => {
  const res = await axios.get("/api/events/shows");

  dispatch({ type: FETCH_SHOWS, payload: res.data });
};

export const fetchMics = () => async dispatch => {
  const res = await axios.get("/api/events/mics");

  dispatch({ type: FETCH_MICS, payload: res.data });
};

export const fetchClasses = () => async dispatch => {
  const res = await axios.get("/api/events/classes");

  dispatch({ type: FETCH_CLASSES, payload: res.data });
};
