import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as firebase from "./../util/util";
import * as actions from "./../store/actions/post";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function PostForm(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add New Post
        </Typography>

        <Formik
          initialValues={{
            title: "",
            post: ""
          }}
          onSubmit={values => {
            console.log(values);
            firebase.addPost(values).then(key => {
              props.addPost({
                ...values,
                key: key
              });
              props.history.push("/");
            });
          }}
          render={({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                onChange={handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="post"
                label="Post"
                id="post"
                onChange={handleChange}
                multiline
                rows={8}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Post
              </Button>
            </form>
          )}
        />
      </div>
    </Container>
  );
}

const matchStateToProps = state => {
  return {
    posts: state.postReducer.posts
  };
};

const matchDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(actions.addPost(post)),
    updatePost: (key, post) => dispatch(actions.updatePost(key, post))
  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(withRouter(PostForm));
