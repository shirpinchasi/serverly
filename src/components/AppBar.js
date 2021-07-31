import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Servers from './getServer';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card } from '@material-ui/core';
import PostServers from './postServers';
import "./AppBar.scss"
import GetServers from './getServer';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';


  export default function ButtonAppBar() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Serverly
            </Typography>
          </Toolbar>
        </AppBar>
        <GetServers/>
            <PostServers/>
      </div>
    );
  }




  
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      justifyItems:"center"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        
      },
    
  }));