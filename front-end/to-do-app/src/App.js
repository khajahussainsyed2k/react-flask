import './App.css';
import React from 'react';
import { BrowserRouter as Router,Route,Switch,Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListTask from './components/ListTask';
import CreateTask from './components/CreateTask';
import UpdateTask from './components/UpdateTask';
import Container from '@mui/material/Container';
import AuthInfoOnFrontend from './components/AuthInfoOnFrontend';
function App() {
  return (
    
      <Router>
      <AuthInfoOnFrontend/>
      <Container sx={{ justifyContent: 'center' }}>
       <HeaderComponent/>
      
        <Switch>
        <Route exact path='/' component={ListTask}></Route>
          <Route exact path='/task' component={ListTask}></Route>
          <Route exact path="/add-task/:id" component={CreateTask}></Route>
          <Route exact path="/update-task/:id" component={UpdateTask}></Route>
        </Switch>
        </Container>
      </Router>
    
  );
}

export default App;
