import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import './index.css';
import { distanceInWordsToNow } from 'date-fns';

function ChatBubble(props) {
  return (
    <Grid container wrap="nowrap" spacing={16}>
        <Grid item>
          <Avatar alt="alt" src={props.avatarSRC} />
        </Grid>
        <Grid item>
          <Typography className={"chatBubble"}>{props.chatLine}</Typography>
          <div className={props.dateClass}>{distanceInWordsToNow(new Date(props.chatDate))} ago</div>
        </Grid>
      </Grid>
  );
}

ChatBubble.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ChatBubble;
