import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import * as actions from "./../store/actions/post";
import * as firebase from "./../util/util";

import PostList from "./PostList";
import PostForm from "./PostForm";
import ErrorPage from "./ErrorPage";

function Home(props) {
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  const getPosts = () => {
    firebase.fetchAllPost().then(posts => {
      props.getPosts(posts);
    });
  };
  if (!isPostLoaded) {
    getPosts();
    setIsPostLoaded(true);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <Button color="inherit">
              <Typography
                variant="h6"
                style={{
                  color: "white"
                }}
              >
                {"Home"}
              </Typography>
            </Button>
          </Link>
          <Typography
            variant="h6"
            style={{ marginLeft: "auto" }}
          >{`Number of Posts: ${props.posts.length}`}</Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route path="/post" component={PostForm} />
        <Route path="/" component={ErrorPage} />
      </Switch>
    </React.Fragment>
  );
}
const matchStateToProps = state => {
  return {
    posts: state.postReducer.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: handleSnackbar => dispatch(actions.fetchAllPosts(handleSnackbar))
  };
};

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(Home);
