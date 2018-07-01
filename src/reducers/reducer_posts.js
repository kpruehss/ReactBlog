import { FETCH_POSTS, FETCH_POST } from '../actions';
import _ from 'lodash';


export default function(state = {}, action) {
  
  switch (action.type) {
  case FETCH_POSTS:
    // mapKeys() takes array as argument, and a key value to map into object
    return _.mapKeys(post, 'id');

  case FETCH_POST:
    // const post = action.payload.data;
    // const newState = { ...state, };
    // newState[post.id] = post;
    // return newState;
    return { ...state, [action.payload.data.id]: action.payload.data };

  default:
    return state;
  }
}