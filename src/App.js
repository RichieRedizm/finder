import React, { Fragment, Component } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import axios from 'axios'

class App extends Component {
  state = {
    users: [],
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

  // display an alert to the user
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Alert alert={this.state.alert} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </Fragment>
    )
  }
}

export default App
