import React, {useEffect, useState} from 'react';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Edit, Delete} from'@material-ui/icons';
import axios from 'axios';

const URL = 'https://back-end-laravel.herokuapp.com/api/departaments/';

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
    console.log(name, value)
    setdepartamentSelect(prevState=>({
      ...prevState,
      [name]: value
    }))
    
  }
  
const getData=async() => {
    await axios.get(URL)
    .then(res =>{
        setData(res.data);
    })
    
}

const postData=async()=>{
    await axios.post(URL, departamentSelect)
    .then(res=>{
      setData(res.data)
      openCloseInsertModal()
    })
    .catch(error =>{
        console.log(error.data)
    })
  }

const putData=async()=>{
    await axios.put(URL+departamentSelect.departament_id, departamentSelect)
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
    await axios.delete(URL+departamentSelect.departament_id)
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
        <h3>Agregar Departamento</h3>
        <TextField name="departament" className={styles.inputMaterial} label="Nombre del departamento" onChange={handleChange}/>
        
        <div>
            <Button color="primary" onClick={()=>postData()}>Insertar</Button>
            <Button onClick={()=>openCloseInsertModal()}>Cancelar</Button>
        </div>
    </div>
)

const editBody = (
    <div className={styles.modal}>
        <h3>Editar Departamento</h3>
        <TextField 
        name="departament" 
        className={styles.inputMaterial}
         label="Nombre del departamento" 
         onChange={handleChange} 
         value={departamentSelect && departamentSelect.departament}/>
        <div>
            <Button color="primary" onClick={()=>putData()}>Editar</Button>
            <Button onClick={()=>openCloseEditModal()}>Cancelar</Button>
        </div>
    </div>
)

const deleteBody = (
    <div className={styles.modal}>
        <p>Seguro que desea eliminar el usuario {departamentSelect && departamentSelect.departament} ?</p>
        <div>
            <Button color="secondary" onClick={()=>deleteData()}>Si</Button>
            <Button onClick={()=>openCloseDeleteModal()}>No</Button>
        </div>
    </div>
)

useEffect(()=>{
     getData();
},[])
    return(
        <div className="User">
            
            <Button variant="contained" color="sucess" onClick={()=>openCloseInsertModal()}>Ingresar Departamento</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Departamento</TableCell>
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