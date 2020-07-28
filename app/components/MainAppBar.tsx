import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import routes from '../paths/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
);

export default function MainAppBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => history.push(routes.HOME)}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          <Link color="inherit" to={routes.HOME}>
            Development Environment
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
