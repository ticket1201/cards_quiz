import React from 'react'
import s from './Error404.module.css'
import Grid from '@mui/material/Grid';
import {Container} from '@mui/material';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import url404 from '../../../assets/images/404.png'

function Error404() {
    const navigate = useNavigate()
    return (
       <Grid className={`${s.grid}`}>
           <Container className={s.text}>
                <h2>Ooops!</h2>
                <p>Sorry! Page not found!</p>
                <Button onClick={() => navigate(-1)} variant={'contained'}>Back to home page</Button>
           </Container>
           <Container>
               <img src={url404} alt="404"/>
           </Container>
       </Grid>
    )
}

export default Error404
