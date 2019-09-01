import * as actionTypes from "../actions/actionTypes";
import * as firebase from "./../../util/util";

const initialState = {
  posts: [
    // {
    //   title: "Herz das verschwand faßt.",
    //   post:
    //     "Sea vero dolor aliquyam amet accusam at ipsum, amet lorem at sadipscing ipsum, justo takimata sit tempor et vero rebum no, voluptua invidunt et lorem sed ut. Tempor sadipscing est accusam lorem est eos. Tempor at est lorem eos nonumy eirmod elitr, rebum ipsum accusam amet est, eirmod ut justo et justo. Lorem eirmod sit et ipsum diam ut, no amet sit sadipscing dolores et. No clita takimata invidunt est sea, dolore gubergren ut amet dolor clita et sanctus stet, ea justo et sanctus magna gubergren et. Tempor erat at lorem kasd gubergren, diam est justo stet gubergren. Takimata ipsum."
    // }
  ]
};

const addPost = (state, action) => {
  const key = firebase.addPost(action.post);
  const posts = [...state.posts, { ...action.post, key: key }];
  return { posts };
};

export const fetchAllPosts = (state, action) => {
  return {
    posts: action.posts
  };
};

export const removePost = (state, action) => {
  if (firebase.removePost(action.key) === true) {
    const posts = state.posts.filter(el => el.key !== action.key);
    return {
      posts,
      numberOfPosts: posts.length()
    };
  }
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
