import './App.css';
import { userForm } from './components/forms'

import React, { useEffect, useState} from 'react';

function App() {

  const [data, setData] = useState()

  const getData = async() => {
    fetch("http://localhost:8000/api/users")
    .then(res => res.json())
    .then(data => setData(data))
  }

  useEffect(() => {
    if(!data){
      getData()
    }
  },[data])
  console.log(data) 
  return (
    <div>
      Tabla departaments
      <form method="POST" action="http://localhost:8000/api/departaments">
        <label>Departamento Laboral</label>
        <input type="text" name="departament"></input>
        <button type="submit">Enviar</button>
      </form>
      <div>
        {userForm()}
      </div>
    </div>

    
  );
}

export default App;
