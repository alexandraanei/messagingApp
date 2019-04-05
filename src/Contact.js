import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import './index.css';
import { distanceInWordsToNow } from 'date-fns';

const styles = theme => ({
  date: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: '#999',
    width: 75,
    textAlign: 'right'
  },
  text: {
    width: 150,
    height: 45,
    overflow: 'hidden',
    textOverflow:'ellipsis',
    whiteSpace: 'nowrap'
  }
});

class Contact extends React.Component {
  state = {
    time: distanceInWordsToNow(this.props.date)
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: distanceInWordsToNow(this.props.date),
      });
    }, 1000);
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem key={this.props.key} button onClick={this.props.onClick}>
        <ListItemAvatar>
          <Avatar alt="alt" src={this.props.avatarSRC} />
        </ListItemAvatar>
        <ListItemText
          className={classes.text}
          primary={this.props.contactName}
          secondary={this.props.lastMessage} />
        <div className={classes.date}>{this.state.time} ago</div>
      </ListItem>
    )
  }
};

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
