import * as actionTypes from "../actions/actionTypes";

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
  const posts = state.posts.map(el => {
    if (el.key !== action.key) {
      return el;
    } else {
      return { ...action.post, key: action.key };
    }
  });
  return {
    posts
  };
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
