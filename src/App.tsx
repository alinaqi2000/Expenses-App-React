import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import { ItemProvider } from './context/ItemProvider'
import ItemContext from './context/ItemContext';
import { SnackbarProvider } from "notistack";
import Layout from './components/Layout';
import { Router } from "@reach/router"
import ItemsMain from './components/items/ItemsMain';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import EditProfile from './components/profile/EditProfile';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  list: {
    textAlign: 'center',
    marginTop: '20px',
    width: '100%',
  },
  addModal: {
    position: 'initial',
    margin: '50px auto',
    outline: '0',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  return (
    <ItemProvider>
      <ItemContext.Consumer>
        {context => (

          <SnackbarProvider maxSnack={4}>
            <Layout>
              <Router>
                <ItemsMain classes={classes} path="/" />
                <Register classes={classes} path="/register" />
                <Login classes={classes} path="/login" />
                <EditProfile classes={classes} path="/edit-profile" />
              </Router>
            </Layout>
          </SnackbarProvider>

        )}

      </ItemContext.Consumer>
    </ItemProvider>

  );
}

export default App;