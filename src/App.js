import { useEffect, useState } from 'react';
import config from "./config/development"
import './App.css';

function App() {
  const [users,setUsers] = useState([])

  useEffect(()=>{
    async function getUsers(){
      try{
        const res = await fetch(config.apiUrl ,{
          credentials : "include",
        })
        const fetchUsers = await res.json()
        setUsers(fetchUsers);
      }catch(err){
        console.log(users);
      }
    }
    getUsers()
  },[])
  return (
    <div className="App">
      {users.map(user => console.log(user))}
    </div>
  );
}

export default App;
