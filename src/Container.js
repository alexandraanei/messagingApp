import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import ChatBubble from './ChatBubble';
import MyChatBubble from './MyChatBubble';
import { format } from 'date-fns';

const styles = theme => ({
  date: {
    fontFamily: "Roboto",
    fontSize: 12,
    color:'#999',
    padding:5,
  },
});

class Container extends React.Component {
  state = {
    message: '',
  };

  handleNewMessage = () => {
    if( this.props.newMessage !== this.state.message ) {
      this.setState({message: this.props.newMessage});
    }
  }

  render() {
    const { classes } = this.props;
    const newMessages = this.props.newMessage.map((text,index) =>
      text ?
      <MyChatBubble
        chatLine={text}
        dateClass={classes.date}
        chatDate={this.props.newMessageDates[index]}
      />
    :''
    )
    const chatLog = this.props.convo.text.map((text,index) =>
    (
      this.props.convo.text[index][0] === "1" ?
        (
          <ChatBubble
            avatarSRC={this.props.convo.avatar}
            chatLine={text[1]}
            dateClass={classes.date}
            chatDate={new Date(text[2])}
          />
        ) :
        (
          <MyChatBubble
            chatLine={text[1]}
            dateClass={classes.date}
            chatDate={new Date(text[2])}
          />
        )
    )
  );

    return(
      <React.Fragment>
        <CssBaseline />
        {chatLog}
        {newMessages}
      </React.Fragment>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Container);
