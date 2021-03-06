import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Link } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
import {
  Paper,
  Toolbar,
  Typography,
  useScrollTrigger,
  Button,
  IconButton,
  Snackbar,
  SnackbarContent
} from "@material-ui/core";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import WarningIcon from "@material-ui/icons/Warning";
import * as actions from "./../store/actions/post";
import * as firebase from "./../util/util";
import { connect } from "react-redux";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};
function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  paper: {
    width: "75%",
    padding: theme.spacing(3, 2),
    margin: "auto",
    marginBottom: "10px",
    boxSizing: "border-box",
    border: "1px solid grey",
    boxShadow: "1px 2px grey"
  },
  typography: {
    margin: "5px",
    whiteSpace: "pre-wrap"
  },
  center: {
    margin: "auto"
  }
}));

function PostList(props) {
  const classes = useStyles2();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "Dummmy",
    varient: "error"
  });

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({ ...snackbarState, open: false });
  }

  const getPosts = () => {
    firebase.fetchAllPost().then(posts => {
      props.getPosts(posts);
      setSnackbarState({
        open: true,
        message: "Successfully fetched the Posts",
        varient: "success"
      });
    });
  };

  return (
    <React.Fragment>
      <Toolbar id="back-to-top-anchor" />
      <Toolbar>
        <div className={classes.center}>
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/post`,
              state: { isEdit: false }
            }}
          >
            <Button>ADD NEW POST</Button>
          </Link>

          <Button
            onClick={() => {
              getPosts();
            }}
          >
            REFRESH
          </Button>
        </div>
      </Toolbar>

      <Grid container direction={"column"}>
        {props.posts
          ? props.posts.map(post => {
              return (
                <Grid item key={post.key}>
                  <Paper className={classes.paper}>
                    <Grid container>
                      <Grid item>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={{
                            pathname: `/post`,
                            state: { post, isEdit: true }
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="h3"
                            className={classes.typography}
                          >
                            {post.title}
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item style={{ marginLeft: "auto" }}>
                        <Button
                          style={{ marginLeft: "auto" }}
                          onClick={() => {
                            firebase.removePost(post.key).then(key => {
                              props.deletePost(post.key);
                              setSnackbarState({
                                open: true,
                                message: "Successfully deleted the Post",
                                varient: "success"
                              });
                            });
                          }}
                        >
                          <DeleteIcon></DeleteIcon>
                        </Button>
                      </Grid>
                    </Grid>

                    <Typography className={classes.typography} component="p">
                      {post.post}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })
          : null}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={snackbarState.varient}
          message={snackbarState.message}
        />
      </Snackbar>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: handleSnackbar => dispatch(actions.fetchAllPosts(handleSnackbar)),
    deletePost: key => dispatch(actions.removePost(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
