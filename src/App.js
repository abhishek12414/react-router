import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route'

const User = (params) => {
  return (<h1>Welcome {params.username}</h1>);
}

class App extends Component {
  state = {
    loggedIn: false
  }

  loginHandle = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    })
  )}

  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><NavLink to="/" exact activeStyle={{ color:'green'}}>Home</NavLink></li>
            <li><NavLink to="/about/" exact activeStyle={{ color:'green'}}>About</NavLink></li>
            <li><NavLink to="/user/john" exact activeStyle={{ color:'green'}}>John</NavLink></li>
            <li><NavLink to="/user/peter" exact activeStyle={{ color:'green'}}>Peter</NavLink></li>
          </ul>

          <Prompt 
            when={!this.state.loggedIn}
            message={(location)=>{
              return location.pathname.startsWith('/user') ? 'Are u sure?' : true
            }}
          />

          <input type="button" value={this.state.loggedIn ? "logout" : "login"} onClick={this.loginHandle.bind(this)} />

          <Route path="/" exact render = {()=>{
            return(<h1>Welcome home</h1>)
          }}/>

          <Route path="/about/" exact strict render = {()=>{
              return(<h1>Welcome About</h1>)
            }}/>

          <Route path="/user/:username" exact strict render={({match})=>(this.state.loggedIn ? (<User username={match.params.username}/>) : <Redirect to="/"/>)}/>
        </div>
      </Router>
    );
  }
}

export default App;
