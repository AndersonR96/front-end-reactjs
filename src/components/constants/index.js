import axios from 'axios';

const URL = 'https://back-end-laravel.herokuapp.com/api/departaments';

export const getDepartaments =async () =>{
    return await axios.get(URL)
    .then(res => {
        return res.data
    })
}