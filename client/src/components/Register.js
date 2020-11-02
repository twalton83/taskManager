import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({ 

    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "1rem",
        margin: "0 auto",
        top : "50%",
        width: "50%",
        height: "90vh"
      },

      formContainer : {
          height: "auto",
          width: "60%",
          padding: "1rem"
      },
      formHeader : {
        borderBottom: 1,
       
      },
      form : {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch'
      }
    }




}));

export default function Register() {
    // create method that on submit of form, checks for returned token

    // if token is valid, move to the next view - the Tasks component 
    const classes = useStyles()
    return (
        <section className = {classes.root}>
            <Paper elevation = {3} className={classes.formContainer} >
                <Typography variant = "h2" align="center" 
                className={classes.formHeader}>
                    <Box borderBottom = {2} borderColor ='primary.dark'>
                     Register
                    </Box>
                  
                    </Typography>
                <form className = {classes.form} noValidate autoComplete="off">
                    <TextField required type = "text" label="username" variant="filled"/>
                    <TextField required type = "password" label="password" variant="filled"/>
                    <Button variant = "contained">
                            Submit
                    </Button>
                </form>
            </Paper>
        </section>
    )
}
