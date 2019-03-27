import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import './index.css';
import * as constants from './constants';
import { distanceInWordsToNow } from 'date-fns';

class MyChatBubble extends React.Component {
  state = {
    time: distanceInWordsToNow(this.props.chatDate),
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: distanceInWordsToNow(this.props.chatDate),
      });
    }, 1000);
  }

  render() {
    return (
      <Grid container wrap="nowrap" justify="flex-end" spacing={16}>
        <Grid item>
          <Typography className={"myChatBubble"}>{this.props.chatLine}</Typography>
          <div className={this.props.dateClass}>{this.state.time} ago</div>
        </Grid>
        <Grid item>
          <Avatar alt="alt" src={constants.myAvatar} />
        </Grid>
      </Grid>
    );
  }
}

MyChatBubble.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MyChatBubble;
