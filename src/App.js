import React, { Fragment, Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import UserDetail from './components/users/UserDetail'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // load first list of users
  async componentDidMount() {
    this.setState({
      loading: true
    })
    const res = await axios.get(
      `https://api.github.com/users?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({
      users: res.data,
      loading: false
    })
  }

  // load users based on text input from Search component
  searchUsers = async text => {
    this.setState({
      loading: true
    })
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({
      users: res.data.items,
      loading: false
    })
  }

  // clear all users
  clearUsers = () => this.setState({ users: [] })

  // load individual user details
  userDetails = async usename => {
    this.setState({
      loading: true
    })
    const res = await axios.get(
      `https://api.github.com/users/${usename}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    this.setState({
      user: res.data,
      loading: false
    })
  }

  // load user repos
  userRepos = async usename => {
    this.setState({
      loading: true
    })
    const res = await axios.get(
      `https://api.github.com/users/${usename}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    console.log('userRepos', res.data)
    this.setState({
      repos: res.data,
      loading: false
    })
  }

  // display an alert to the user
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { user, users, repos, loading } = this.state
    return (
      <Router>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <UserDetail
                  {...props}
                  userDetails={this.userDetails}
                  userRepos={this.userRepos}
                  loading={loading}
                  user={user}
                  repos={repos}
                />
              )}
            />
            <Route exact path='/about' render={About} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
