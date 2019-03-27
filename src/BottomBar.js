import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PhotoIcon from '@material-ui/icons/Photo';
import * as constants from './constants';

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    background: '#fff',
    height:60,
    padding:0,
    left: constants.drawerWidth,
    width:'auto'
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    margin: theme.spacing.unit,
    width:'60em',
    '&:after': {
      borderBottom: "2px solid #1ba261",
   },
  },
});

class BottomBar extends React.Component {
  state = {
    text: ''
  };

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  }

  handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      this.props.onMessageSubmitted(this.state.text);
      this.setState({ text: '' });
    }
  }

  render() {
    const { classes } = this.props;
      console.log(this.state.text);
    return (

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>

          <IconButton color="default">
            <InsertEmoticonIcon />
          </IconButton>

          <Input
            placeholder="Send a message"
            className={classes.input}
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPressed}
          />

          <IconButton color="default">
            <PhotoIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    )
  }
}

BottomBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomBar);
