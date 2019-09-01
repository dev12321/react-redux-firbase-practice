import { initializeApp, database } from "firebase";

var config = {
  apiKey: "AIzaSyDbwNI5FhYkPtY4LXFMyMoRCruGDQKDnLQ",
  // authDomain: "projectId.firebaseapp.com",
  databaseURL: "https://my-app-a3576.firebaseio.com/"
  // storageBucket: "bucket.appspot.com"
};
initializeApp(config);

// Get a reference to the database service

export const firebaseDatabase = database();

export const fetchAllPost = async () => {
  const posts = [];

  await firebaseDatabase.ref("posts").once("value", snapshot => {
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
  const key = await firebaseDatabase.ref("posts").push(post).key;
  return key;
};

export const removePost = async key => {
  await firebaseDatabase.ref("posts/" + key).remove();
};

export const updatePost = async (key, post) => {
  await firebaseDatabase.ref("posts/" + key).set(post);
};
