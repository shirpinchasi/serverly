import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import "./getServers.scss"
import { Button, Select,MenuItem,FormControl,InputLabel,FormHelperText, Table,TableBody,TableCell, TableContainer,TableHead, TableRow,Paper, Input } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


export default function GetServers() {
  const [servers,setServers] = useState([])
  const classes = useStyles();
  const [isRunning, setIsRunning]= useState("false")
  const [change, setChange] = useState("")
  const [inEditMode, setEditMode] = useState({
      status : false,
      rowKey : null
  });
  const [unitPrice,setUnitPrice] = useState(null)

  const onEdit = ({id, currentUnitPrice})=>{
      setEditMode({
          status:true,
          rowKey:id
      })
      setUnitPrice(currentUnitPrice)
  }
  const updateServer = ({id,newUnitPrice})=>{
      fetch(`/handler/updateServer/${id}`,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body:JSON.stringify({serverName :newUnitPrice})
      })
      .then(res => res.json())
      .then(res =>{
        
          console.log(res);
          oncancel();
          fetchItems();
      })
  }
  function refreshPage() {
    window.location.reload(false);
}
  const onSave =({id, newUnitPrice})=>{
      updateServer({id, newUnitPrice})
      refreshPage();
      console.log("savedd");
      
  }

  const onCancel =()=>{
      console.log("canceldd");
      setEditMode({
          status:false,
          rowKey:null
      })
      setUnitPrice(null)
  }

  
  async function fetchItems() {
    try{
        const res = await fetch("/handler/",{
            method:"GET"
        })
        const fetchServers = await res.json();
        setServers(fetchServers)
    }catch(err){
        console.log(err);
    }   
}
async function deleteServer(id) {
    try{
        const res = await fetch(`/handler/deleteServer/${id}`,{
            method:"DELETE"
        })
        refreshPage(true)
    }catch(err){
        console.log(err);
    }   
    
}
function refreshPage() {
    window.location.reload(false);
}
const handleRunningChange=(e)=>{
    setIsRunning(e.target.value)
}

  useEffect(()=>{
    
  fetchItems()
  },[])


  
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
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Delete Server</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servers.map((server) => (
            <TableRow key={server._id}>
              <TableCell component="th" scope="row">
                {server.serverIp}
              </TableCell>
              <TableCell align="right">{inEditMode.status&& inEditMode.rowKey === server._id?(
                  <input value={unitPrice} onChange={(e)=> setUnitPrice(e.target.value)}/>
                  
              ):(
                  server.serverName
              )
              }</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">
              <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-required-label"></InputLabel>
                                            <Select native 
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={isRunning}
                                                onChange={handleRunningChange}
                                                className={classes.selectEmpty}
                                                
                                            >
                                                <MenuItem value="">
                                                    <em>NONE</em>
                                                </MenuItem>
                                                <MenuItem value="true" onChange={handleRunningChange}>True</MenuItem>
                                                <MenuItem value="False"onChange={handleRunningChange}>False</MenuItem>
                                                
                                           </Select>
                                            
                                        </FormControl>
                  
              </TableCell>
              <TableCell align="right" >{server.serverType}</TableCell>
              <TableCell align="right">
              <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-required-label"></InputLabel>
                                            <Select native 
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={change}
                                                onChange={handleRunningChange}
                                                className={classes.selectEmpty}
                                                
                                            >
                                                <MenuItem value="">
                                                    <em>NONE</em>
                                                </MenuItem>
                                                <MenuItem value="true" onChange={handleRunningChange}>EUR</MenuItem>
                                                <MenuItem value="False"onChange={handleRunningChange}>ILS</MenuItem>
                                                
                                           </Select>
                                            
                                        </FormControl>
              </TableCell>
              
              <TableCell align="right">
                  {inEditMode.status && inEditMode.rowKey=== server._id?(
                      <React.Fragment>
                      <Button className={"btn-success"}
                      onClick={()=> onSave({id:server._id, newUnitPrice:unitPrice})}
                      >
                          Save
                      </Button>
                      <Button className={"btn-secondery"}
                      style={{marginLeft:8}}
                      onClick={()=>onCancel()}
                      >
                        cancel
                      </Button>
                      </React.Fragment>
                  ):(
                      <Button className={"btn-primary"}
                      onClick={()=>onEdit({id:server._id, currentUnitPrice:server.serverName})}
                      >
                        <EditIcon fontSize="small"/>
                      </Button>
                  )}
                  <Button onClick={()=>deleteServer(server._id)}>Delete Server</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}


