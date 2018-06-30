import { FETCH_POSTS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_POSTS:
    // mapKeys() takes array as argument, and a key value to map into object
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}