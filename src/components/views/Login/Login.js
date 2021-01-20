import React from 'react';
//import PropTypes from 'prop-types';
import styles from './Login.module.scss';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

const Login = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Typography component='h1' variant='h5'>
           Sign in
      </Typography>

      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        href='/panel/panel/'
        
      >
                 Sign In
      </Button>


    </Container>
  );
};
Login.propTypes = {

};

export default Login;
