import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import UserDetail from './components/users/UserDetail'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'

import GithubState from './context/github/GithubState'

const App = () => {
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  // load first list of users
  // useEffect(() => {
  //   setLoading(true)
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       `https://api.github.com/users?client_id=${
  //         process.env.REACT_APP_GITHUB_CLIENT_ID
  //       }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     )
  //     setUsers(res.data)
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])

  // load individual user details
  const userDetails = async usename => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${usename}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    setUser(res.data)
    setLoading(false)
  }

  // load user repos
  const userRepos = async usename => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${usename}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    setRepos(res.data)
    setLoading(false)
  }

  // display an alert to the user
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <GithubState>
      <Router>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search setAlert={showAlert} />
                  <Users />
                </Fragment>
              )}
            />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <UserDetail
                  {...props}
                  userDetails={userDetails}
                  userRepos={userRepos}
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
    </GithubState>
  )
}

export default App
