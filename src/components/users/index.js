import React, {useEffect, useState} from 'react';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, MenuItem} from '@material-ui/core';
import {Edit, Delete} from'@material-ui/icons';
import axios from 'axios';
import {getDepartaments} from '../constants';
import {URL_POST_GET_USERS, URL_PUT_DELETE_USERS, useStyles} from '../constants';

function User(){

const styles= useStyles();

const [data, setData] = useState([]);
const [departaments, setDepartaments] = useState([]);

const [insertModal, setinsertModal] = useState (false);
const [editModal, seteditModal] = useState (false);
const [deleteModal, setdeleteModal] = useState (false);

const [userSelect, setuserSelect] = useState({
    name: '',
    departament_id: '',
    last_name: '',
    identification_number: '',
    email: ''
})

const handleChange=e=>{
    
    const {name, value}=e.target;
    setuserSelect(prevState=>({
      ...prevState,
      [name]: value
    }))
    
  }
  
const getData=async() => {
    await axios.get(URL_POST_GET_USERS)
    .then(res =>{
        setData(res.data);
    })
    
}

const postData=async()=>{
    await axios.post(URL_POST_GET_USERS, userSelect)
    .then(res=>{
      setData(res.data)
      openCloseInsertModal()
    })
    .catch(error =>{
        console.log(error.data)
    })
  }

const putData=async()=>{
    await axios.put(URL_PUT_DELETE_USERS+userSelect.user_id, userSelect)
    .then(res=>{
      var newData=data;
      newData.forEach(user=>{
        if(userSelect.user_id===user.user_id){
            user.name=userSelect.name;
            user.last_name=userSelect.last_name;
            user.identification_number=userSelect.identification_number;
            user.email=userSelect.email;
        }
      })
      setData(newData);
      openCloseEditModal();
    })
    .catch(error => {
        console.log(error.data)
    })
}

const deleteData=async()=>{
    await axios.delete(URL_PUT_DELETE_USERS+userSelect.user_id)
    .then(res => {
        setData(data.filter(user=>user.user_id!==userSelect.user_id))
        openCloseDeleteModal();
    })
    .catch(error => {
        console.log(error.data)
    })
}

const openCloseInsertModal = () =>{
    setinsertModal(!insertModal);
}

const openCloseEditModal = () =>{
    seteditModal(!editModal);
}

const openCloseDeleteModal = () =>{
    setdeleteModal(!deleteModal);
}

const selectUser = (user, caso)=>{
    setuserSelect(user);
    (caso==='Editar')?openCloseEditModal():openCloseDeleteModal()
}

const insertBody = (
    <div className={styles.modal}>
        <div className="bodyModal">
            <h3>Agregar Usuario</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
            <TextField name="last_name" className={styles.inputMaterial} label="Apellido" onChange={handleChange}/>

            <TextField name="departament_id" label="Departamento" className={styles.inputMaterial} onChange={handleChange} select>
            <MenuItem value="1">Seleccionar</MenuItem>
                {departaments.map(departament => (<MenuItem key={departament.departament_id} value={departament.departament_id}>{departament.departament}</MenuItem>))}
            </TextField>

            <TextField name="identification_number" className={styles.inputMaterial} label="No. Identificacion" onChange={handleChange}/>
            <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange}/>
            
            <div className="modalButtons">
                <Button variant="contained" color="primary" onClick={()=>postData()}>Insertar</Button>
                <Button variant="contained" onClick={()=>openCloseInsertModal()}>Cancelar</Button>
            </div>
        </div> 
    </div>
)

const editBody = (
    <div className={styles.modal}>
        <div className="bodyModal">
            <h3>Editar Usuario</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={userSelect && userSelect.name}/>
            <TextField name="last_name" className={styles.inputMaterial} label="Apellido" onChange={handleChange} value={userSelect && userSelect.last_name}/>
            <TextField name="identification_number" className={styles.inputMaterial} label="No. Identificacion" onChange={handleChange} value={userSelect && userSelect.identification_number}/>
            <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} value={userSelect && userSelect.email}/>
            <div className="modalButtons">
                <Button variant="contained" color="primary" onClick={()=>putData()}>Editar</Button>
                <Button variant="contained" onClick={()=>openCloseEditModal()}>Cancelar</Button>
            </div>
        </div>
    </div>
)

const deleteBody = (
    <div className={styles.modal}>
        <div className="bodyModal">
            <p>Seguro que desea eliminar el usuario {userSelect && userSelect.name} ?</p>
            <div className="modalButtons">
                <Button variant="contained" color="secondary" onClick={()=>deleteData()}>Si</Button>
                <Button variant="contained"onClick={()=>openCloseDeleteModal()}>No</Button>
            </div>
        </div>
    </div>
)

useEffect(()=>{
    getData();
    getDepartaments()
    .then(data => setDepartaments(data));
},[])
    return(
        <div className="User">
            <div className="insertButton">
                <Button variant="contained" color="primary" onClick={()=>openCloseInsertModal()}>Ingresar Usuario</Button>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>No. Identificacion</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map(user=>(
                            <TableRow key={user.user_id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.identification_number}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Edit className={styles.iconos} onClick={()=>selectUser(user, 'Editar')} />
                                    &nbsp;&nbsp;&nbsp;
                                    <Delete className={styles.iconos} onClick={()=>selectUser(user, 'Eliminar')} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
            open={insertModal}
            onClose={openCloseInsertModal}>
            {insertBody}    
            </Modal>

            <Modal
            open={editModal}
            onClose={openCloseEditModal}>
            {editBody}    
            </Modal>

            <Modal
            open={deleteModal}
            onClose={openCloseDeleteModal}>
            {deleteBody}    
            </Modal>
        </div>
    );
}

export default User;