import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';

const URL = 'https://back-end-laravel.herokuapp.com/api/departaments';

export const getDepartaments =async () =>{
    return await axios.get(URL)
    .then(res => {
        return res.data
    })
}

export const URL_POST_GET_DEPARTAMENTS = 'https://back-end-laravel.herokuapp.com/api/departaments';
export const URL_PUT_DELETE_DEPARTAMENTS = 'https://back-end-laravel.herokuapp.com/api/departaments/';

export const URL_POST_GET_USERS = 'https://back-end-laravel.herokuapp.com/api/users';
export const URL_PUT_DELETE_USERS = 'https://back-end-laravel.herokuapp.com/api/users/';

export const useStyles = makeStyles((theme) => ({
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