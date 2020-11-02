import {useEffect} from 'react'
import Header from './components/Header'  
import './components/styles/App.css';
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Tasks from './components/Tasks'

function App() {
  

  // const callApi = () => {
  //   fetch('http://localhost:5500/')
  //   .then(res => res.text())
  //   .then(res => alert(res))
  // }

  // useEffect(()=>{
  //   callApi()
  // })

  return (
    <div className="App">
     <Header/>
     <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} className='page' timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path='/'
                  render={routeProps => (
                      <Welcome/>
                  )}
                />
                <Route
                  exact
                  path='/tasks'
                  render={routeProps => (
                   <Tasks/>
                  )}
                />
                <Route
                  exact
                  path='/login'
                  render={routeProps => (
                   <Login/>
                  )}
                />
                 <Route
                  exact
                  path='/register'
                  render={routeProps => (
                   <Register/>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
}

export default App;
