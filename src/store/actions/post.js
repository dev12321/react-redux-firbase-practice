import { database } from "./../../util/util";
import * as actionTypes from "./actionTypes";

export const fetchAllPosts = posts => {
  return {
    type: actionTypes.FETCH_POST,
    posts: posts
  };
};

export const removePost = key => {
  return {
    type: actionTypes.REMOVE_POST,
    key: key
  };
};

export const updatePost = (post, key) => {
  return {
    type: actionTypes.UPDATE_POST,
    post: post,
    key: key
  };
};

export const addPost = post => {
  return {
    type: actionTypes.ADD_POST,
    post: post
  };
};


