import React, {useEffect, useState} from 'react';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Edit, Delete} from'@material-ui/icons';
import axios from 'axios';
import {getDepartaments} from './constants';

const URL_POST_GET = 'https://back-end-laravel.herokuapp.com/api/users';
const URL_PUT_DELETE = 'https://back-end-laravel.herokuapp.com/api/users/';

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

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
    console.log(name, value)
    setuserSelect(prevState=>({
      ...prevState,
      [name]: value
    }))
    
  }
  
const getData=async() => {
    await axios.get(URL_POST_GET)
    .then(res =>{
        setData(res.data);
    })
    
}

const postData=async()=>{
    await axios.post(URL_POST_GET, userSelect)
    .then(res=>{
      setData(res.data)
      openCloseInsertModal()
    })
    .catch(error =>{
        console.log(error.data)
    })
  }

const putData=async()=>{
    await axios.put(URL_PUT_DELETE+userSelect.user_id, userSelect)
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
    await axios.delete(URL_PUT_DELETE+userSelect.user_id)
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
        <h3>Agregar Usuario</h3>
        <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
        <TextField name="last_name" className={styles.inputMaterial} label="Apellido" onChange={handleChange}/>

        <TextField name="departament_id" label="Departamento" className={styles.inputMaterial} onChange={handleChange} select>
        <MenuItem value="1">Seleccionar</MenuItem>
            {departaments.map(departament => (<MenuItem key={departament.departament_id} value={departament.departament_id}>{departament.departament}</MenuItem>))}
        </TextField>

        <TextField name="identification_number" className={styles.inputMaterial} label="No. Identificacion" onChange={handleChange}/>
        <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange}/>
        <div>
            <Button color="primary" onClick={()=>postData()}>Insertar</Button>
            <Button onClick={()=>openCloseInsertModal()}>Cancelar</Button>
        </div>
    </div>
)

const editBody = (
    <div className={styles.modal}>
        <h3>Editar Usuario</h3>
        <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={userSelect && userSelect.name}/>
        <TextField name="last_name" className={styles.inputMaterial} label="Apellido" onChange={handleChange} value={userSelect && userSelect.last_name}/>
        <TextField name="identification_number" className={styles.inputMaterial} label="No. Identificacion" onChange={handleChange} value={userSelect && userSelect.identification_number}/>
        <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} value={userSelect && userSelect.email}/>
        <div>
            <Button color="primary" onClick={()=>putData()}>Editar</Button>
            <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
        </div>
    </div>
)

const deleteBody = (
    <div className={styles.modal}>
        <p>Seguro que desea eliminar el usuario {userSelect && userSelect.name} ?</p>
        <div>
            <Button color="secondary" onClick={()=>deleteData()}>Si</Button>
            <Button onClick={()=>openCloseDeleteModal()}>No</Button>
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
            
            <Button variant="contained" color="sucess" onClick={()=>openCloseInsertModal()}>Ingresar Usuario</Button>
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