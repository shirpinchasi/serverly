import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import "./getServers.scss"
import BtnComponent from './buttonTime';
import { Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input,ButtonGroup } from '@material-ui/core';
import DisplayComponent from './displayTime';

const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function GetServers() {
  const [servers, setServers] = useState([])
  const [getObject, setObject] = useState({})
  const [time, setTime] = useState({ms:0,s:0,m:0,h:0})
  var updatedMs =  updatedS =time.ms,updatedS = time.s, updatedM = time.m, updatedH = time.h;
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const classes = useStyles();
  
  

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };
  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };
  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };
  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };
  const resume = () => start();
  
  async function fetchItems() {
    try {
      const res = await fetch("/handler/", {
        method: "GET"
      })
      const fetchServers = await res.json();
      setServers(fetchServers)
      setObject(fetchServers)
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteServer(id) {
    try {
      const res = await fetch(`/handler/deleteServer/${id}`, {
        method: "DELETE"
      })
      refreshPage()
    } catch (err) {
      console.log(err);
    }
    
  }
  function refreshPage() {
    window.location.reload(false);
  }

  const handleIdChange = id => {
    const clickedOption = servers.find(item => item.id === id);
    const value = `${clickedOption.id}, ${clickedOption.server.x}`;
    console.log(value);
  };

  
  

  useEffect(() => {
    fetchItems()
  }, [])



  return (
    <div className="Servers">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Server Ip</TableCell>
              <TableCell align="right">Server Name</TableCell>
              <TableCell align="right">Time Running</TableCell>
              <TableCell align="right">Toggle</TableCell>
              <TableCell align="right">Server Type</TableCell>
              <TableCell align="right">Server Price</TableCell>
              <TableCell align="right">Delete Server</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servers.map((server) => (
              <TableRow key={server._id}>
                <TableCell component="th" scope="row">
                  {server.serverIp}
                </TableCell>
                <TableCell align="right">{server.serverName}</TableCell>
                <TableCell align="right">Time : <DisplayComponent time={time}/></TableCell>
                <TableCell align="right">
                <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
                {/* <BtnComponent value={server._id} status={status} resume={resume} reset={reset} stop={stop} start={start}/> */}

                </TableCell>
                
                {Object.entries(server.serverType).map(([key,value])=>(
                  
                  <TableCell>
               <div key={key}>{console.log(value)} &euro;</div>
               </TableCell>
                
                ))}
                
                {/* <TableCell align="right">
                  
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-native-select"></InputLabel>
                    <Select native defaultValue="" id="grouped-native-select">
                      
                      <optgroup>
                      <option aria-label="None" value="" />
                        <option  value={server.serverTypePrice}></option>
                        <option value={2}>Option 2</option>
                      </optgroup>
                    </Select>
                  </FormControl>
                </TableCell> */}

                <TableCell align="right">
                  <Button onClick={() => deleteServer(server._id)}>Delete Server</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
                
               <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
      </TableContainer>
    </div>
  );
};