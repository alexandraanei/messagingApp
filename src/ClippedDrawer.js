import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import contactList from './contactList';
import * as constants from './constants';
import Container from './Container';
import TopBar from './TopBar';
import Contact from './Contact';
import BottomBar from './BottomBar';
import './index.css';

const styles = theme => ({
  root: {
    display: 'flex',
    background: '#f2f2f2 !important'
  },
  drawer: {
    width: constants.drawerWidth,
    marginBottom: 60
  },
  drawerPaper: {
    width: constants.drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    background: '#f2f2f2',
    marginBottom: 60
  },
  addButton: {
    marginRight: -15,
    height:40,
    width:40,
    background:'#1ba261',
    boxShadow: '0px 0px',
    '&:hover': {
      background:'#1ba261'
    }
  },
  toolbar: theme.mixins.toolbar
});

class ClippedDrawer extends React.Component {
  state = {
    key: 1,
    contact: contactList[0],
    name: contactList[0].name,
    myMessages: [
      {id: 1, messages:[''], messagesDate:['']},
      {id: 2, messages:[''], messagesDate:['']},
      {id: 3, messages:[''], messagesDate:['']},
      {id: 4, messages:[''], messagesDate:['']},
      {id: 5, messages:[''], messagesDate:['']},
      {id: 6, messages:[''], messagesDate:['']},
    ],
    currentMessage:[''],
    sortedKeys:['1','2','3','4','5','6']
  };

  handleClick = contact => () => {
    this.setState({
      key: contact.id,
      contact: contact,
      name: contact.name,
      currentMessage:['']
    });
  };

  reorderContacts = () => {
    let array = [...this.state.sortedKeys];
    array = this.state.sortedKeys.filter(key => key != this.state.key);
    array.unshift(this.state.key);
    this.setState({sortedKeys: array});
  };

  handleMessageSubmitted = (message) => {
    this.handleMessageSaveProcess(this.state.key, message);
    this.reorderContacts();
  };

  handleMessageSaveProcess(id, newMessage) {
    this.setState(prevState => ({
      ...prevState,
      myMessages: prevState.myMessages.map(myMessage => ({
        ...myMessage,
        messages: myMessage.id === id
          ?  myMessage.messages.concat(newMessage)
          : myMessage.messages,
        messagesDate:  myMessage.id === id
          ? myMessage.messagesDate.concat(new Date())
          : myMessage.messagesDate
     }))
   }));
  };

  render() {
   const { classes } = this.props;
   return (
     <div className={classes.root}>
       <CssBaseline />
       <TopBar contactName={this.state.name} />
       <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}} >
         <div className={classes.toolbar} />
         <List>
           <ListItem button >
             <ListItemIcon>
               <Fab size="medium" color="secondary" aria-label="Add" className={classes.addButton} >
                 <AddIcon />
               </Fab>
             </ListItemIcon>
             <ListItemText primary="New conversation" />
           </ListItem>
           {
             this.state.sortedKeys.map(currentKey => (
               <Contact
                 key={currentKey}
                 onClick={this.handleClick(contactList[currentKey-1])}
                 avatarSRC={contactList[currentKey-1].avatar}
                 contactName={contactList[currentKey-1].name}
                 lastMessage={
                   this.state.myMessages[contactList[currentKey-1].id - 1].messages[this.state.myMessages[contactList[currentKey-1].id - 1].messages.length - 1]
                    ? ("You: " +  this.state.myMessages[contactList[currentKey-1].id - 1].messages[this.state.myMessages[contactList[currentKey-1].id - 1].messages.length - 1])
                    : (contactList[currentKey-1].text[contactList[currentKey-1].text.length - 1][0] === "1"
                        ? contactList[currentKey-1].text[contactList[currentKey-1].text.length - 1][1]
                        : "You: " +  contactList[currentKey-1].text[contactList[currentKey-1].text.length - 1][1]
                      )
                 }
                 date={
                   this.state.myMessages[contactList[currentKey-1].id - 1].messages[this.state.myMessages[contactList[currentKey-1].id - 1].messages.length - 1]
                    ? this.state.myMessages[contactList[currentKey-1].id - 1].messagesDate[this.state.myMessages[contactList[currentKey-1].id - 1].messagesDate.length - 1]
                    : new Date(contactList[currentKey-1].text[contactList[currentKey-1].text.length - 1][2])
                 }
                 />
             ))
           }
         </List>
       </Drawer>
       <main className={classes.content} >
         <div className={classes.toolbar} />
         <Container
           convo={this.state.contact}
           newMessage={this.state.myMessages[this.state.key - 1].messages}
           newMessageDates={this.state.myMessages[this.state.key - 1].messagesDate}
         />
         <BottomBar onMessageSubmitted={this.handleMessageSubmitted} />
       </main>
     </div>
    );
  };
};

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
