import React from 'react';
import axios from 'axios';

import './App.css';
import UserList from './components/User.js';
import { ProjectList, ProjectDetail } from './components/Project.js';
import ToDoList from './components/ToDo.js';
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/projects/')
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/todos/')
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to='/'>Главная</Link>
              </li>
              <li>
                <Link to='/users'>Пользователи</Link>
              </li>
              <li>
                <Link to='/projects'>Проекты</Link>
              </li>
              <li>
                <Link to='/todos'>ToDos</Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Routes>
            <Route path='/' element={<h2>Главная</h2>} />
            <Route path='/users' element={
              <div>
                <h2>Пользователи</h2>
                <UserList users={this.state.users} />
              </div>} />
            <Route path='/projects' element={
              <div>
                <h2>Проекты</h2>
                <ProjectList projects={this.state.projects} />
              </div>} />
            <Route path='/todos' element={
              <div>
                <h2>ToDos</h2>
                <ToDoList todos={this.state.todos} />
              </div>} />
            <Route path="/project/:id" element={
              <div>
                <h2>Детальная информация о проекте</h2>
                <ProjectDetail projects={this.state.projects} />
              </div>} />
          </Routes>
        </Router>
        <hr />
        <Footer />
      </div>
    )
  }
}

export default App;
