import React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import PostList from "./PostList";
import PostForm from "./PostForm";
import ErrorPage from "./ErrorPage";

function Home(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Link to={`/`}>
            <Button color="inherit">Home</Button>
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
export default connect(matchStateToProps)(Home);
