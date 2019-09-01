import * as firebase from "firebase";
import * as actions from "./../store/actions/post";

var config = {
  apiKey: "AIzaSyDbwNI5FhYkPtY4LXFMyMoRCruGDQKDnLQ",
  // authDomain: "projectId.firebaseapp.com",
  databaseURL: "https://my-app-a3576.firebaseio.com/"
  // storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service

export const database = firebase.database();

export const fetchAllPost = async () => {
  const posts = [];

 await database.ref("posts").once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      const key = childSnapshot.key;
      const childData = childSnapshot.val();
      posts.push({
        key: key,
        title: childData.title,
        post: childData.post
      });
    });
  });

  return posts;
};

export const addPost = async post => {
  const key =await database.ref("posts").push(post).key;
  return key;
};

export const removePost = async key => {
  await database.ref("posts/" + key).remove(() => true);
};

export const updatePost = (key, post) => {
  database.ref("posts/" + key).set(post, () => true);
};
