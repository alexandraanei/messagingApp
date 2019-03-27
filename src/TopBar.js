import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#1ba261'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  username: {
    paddingRight:'6em'
  },
  contactName: {
    padding:'0px',
    flexGrow: 1
  },
});

function TopBar(props)
{
  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <Toolbar>

        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" color="inherit" noWrap className={classes.username}>
          Alexandra Anei
        </Typography>

        <Typography variant="h6" color="inherit" noWrap className={classes.contactName}>
          {props.contactName}
        </Typography>

        <IconButton color="inherit">
          <VideocamIcon />
        </IconButton>

        <IconButton color="inherit">
          <MoreVertIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  )
};

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
