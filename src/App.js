import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import UserDetail from './components/users/UserDetail'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'

import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

const App = () => {
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

  return (
    <GithubState>
      <AlertState>
        <Router>
          <Navbar />
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={UserDetail} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App
