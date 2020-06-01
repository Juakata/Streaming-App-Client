import history from '../history';
import {
  SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS,
  FETCH_STREAM, EDIT_STREAM, DELETE_STREAM,
} from './types';
import streams from '../apis/streams';

export const signIn = userId => ({
  type: SIGN_IN,
  payload: userId,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const createStream = values => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const { data } = await streams.post('/streams', { ...values, userId });
  dispatch({ type: CREATE_STREAM, payload: data });
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const { data } = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: data });
};

export const fetchStream = id => async dispatch => {
  const { data } = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: data });
};

export const editStream = (id, values) => async dispatch => {
  const { data } = await streams.put(`/streams/${id}`, values);
  dispatch({ type: EDIT_STREAM, payload: data });
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/stremas/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};
