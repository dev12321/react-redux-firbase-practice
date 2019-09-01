import * as actionTypes from "../actions/actionTypes";
import * as firebase from "./../../util/util";

const initialState = {
  posts: []
};

const addPost = (state, action) => {
  const posts = [...state.posts, { ...action.post }];
  return { posts };
};

export const fetchAllPosts = (state, action) => {
  return {
    posts: action.posts
  };
};

export const removePost = (state, action) => {
  const posts = state.posts.filter(el => el.key !== action.key);
  return {
    posts
  };
};

export const updatePost = (state, action) => {
  if (firebase.updatePost(action.post) === true) {
    const posts = state.posts.map(el => {
      if (el.key === action.key) {
        return action.post;
      } else {
        return el;
      }
    });
    return {
      posts,
      numberOfPosts: posts.length()
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST:
      return addPost(state, action);
    case actionTypes.REMOVE_POST:
      return removePost(state, action);
    case actionTypes.UPDATE_POST:
      return updatePost(state, action);
    case actionTypes.FETCH_POST:
      return fetchAllPosts(state, action);
    default:
      return state;
  }
};

export default reducer;
