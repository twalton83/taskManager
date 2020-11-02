import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import sittingImage from '../assets/undraw_tasks_av87.svg'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({ 

    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: "90vh",
        padding: "1rem"
      },
    sittingImage : {
        height: "auto",
        width: "35%"
    },
    navLink :{

        textDecoration: "none",
        color : "inherit"
    
}




}));

export default function Welcome() {
    const classes = useStyles();
    return (
      <section className = {classes.root}>
        <div>
        <Typography variant="h1" component="h1" gutterBottom>
            Task.Me
        </Typography>
        <Typography variant ="subtitle1">
            A better way to manage tasks on the go.
        </Typography>
        <Button variant ="contained">
            <Link className = {classes.navLink} to="/register">
            Sign Up
            </Link>
           
        </Button>
        </div>
        
        <img 
        className = {classes.sittingImage}
        alt = "Woman in wheelchair sitting with a task list" 
        src = {sittingImage}
        />

      </section>
    )
}
