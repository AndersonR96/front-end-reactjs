import React, {useEffect, useState} from 'react';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from'@material-ui/icons';
import axios from 'axios';
import {URL_POST_GET_DEPARTAMENTS, URL_PUT_DELETE_DEPARTAMENTS, useStyles} from '../constants'


function Departament(){

const styles= useStyles();

const [data, setData] = useState([]);

const [insertModal, setinsertModal] = useState (false);
const [editModal, seteditModal] = useState (false);
const [deleteModal, setdeleteModal] = useState (false);

const [departamentSelect, setdepartamentSelect] = useState({
    departament: '',
})

const handleChange=e=>{
    
    const {name, value}=e.target;
    setdepartamentSelect(prevState=>({
      ...prevState,
      [name]: value
    }))
    
  }
  
const getData=async() => {
    await axios.get(URL_POST_GET_DEPARTAMENTS)
    .then(res =>{
        setData(res.data);
    })
    
}

const postData=async()=>{
    await axios.post(URL_POST_GET_DEPARTAMENTS, departamentSelect)
    .then(res=>{
      setData(res.data)
      openCloseInsertModal()
    })
    .catch(error =>{
        console.log(error.data)
    })
  }

const putData=async()=>{
    await axios.put(URL_PUT_DELETE_DEPARTAMENTS+departamentSelect.departament_id, departamentSelect)
    .then(res=>{
      var newData=data;
      newData.forEach(departament=>{
        if(departamentSelect.departament_id===departament.departament_id){
            departament.departament=departamentSelect.departament;
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
    await axios.delete(URL_PUT_DELETE_DEPARTAMENTS+departamentSelect.departament_id)
    .then(res => {
        setData(data.filter(departament=>departament.departament_id!==departamentSelect.departament_id))
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

const selectDepartament = (departament, caso)=>{
    setdepartamentSelect(departament);
    (caso==='Editar')?openCloseEditModal():openCloseDeleteModal()
}

const insertBody = (
    <div className={styles.modal}>
        <div className="bodyModal">
            <h3>Agregar Departamento</h3>
            <TextField name="departament" className={styles.inputMaterial} label="Nombre del departamento" onChange={handleChange}/>
            
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
            <h3>Editar Departamento</h3>
            <TextField 
            name="departament" 
            className={styles.inputMaterial}
            label="Nombre del departamento" 
            onChange={handleChange} 
            value={departamentSelect && departamentSelect.departament}/>
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
            <p>Seguro que desea eliminar el usuario {departamentSelect && departamentSelect.departament} ?</p>
            <div className="modalButtons">
                <Button variant="contained" color="secondary" onClick={()=>deleteData()}>Si</Button>
                <Button variant="contained" onClick={()=>openCloseDeleteModal()}>No</Button>
            </div>
        </div>
    </div>
)

useEffect(()=>{
     getData();
},[])
    return(
        <div className="Departament">
            <div className="insertButton">
                <Button variant="contained" color="primary" onClick={()=>openCloseInsertModal()}>Ingresar Departamento</Button>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Departamento</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map(departament=>(
                            <TableRow key={departament.departament_id}>
                                <TableCell>{departament.departament_id}</TableCell>
                                <TableCell>{departament.departament}</TableCell>
                                <TableCell>
                                    <Edit className={styles.iconos} onClick={()=>selectDepartament(departament, 'Editar')} />
                                    &nbsp;&nbsp;&nbsp;
                                    <Delete className={styles.iconos} onClick={()=>selectDepartament(departament, 'Eliminar')} />
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

export default Departament;