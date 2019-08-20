import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
  SEARCH_USERS,
  GET_USER_DETAILS,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING
} from '../types'

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // load users based on text input from Search component
  const searchUsers = async text => {
    setLoading()
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  }

  // load individual user details
  const userDetails = async usename => {
    setLoading()
    const res = await axios.get(
      `https://api.github.com/users/${usename}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    dispatch({
      type: GET_USER_DETAILS,
      payload: res.data
    })
  }

  // load user repos
  const userRepos = async usename => {
    setLoading()
    const res = await axios.get(
      `https://api.github.com/users/${usename}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }

  // display an alert to the user

  // clear all users
  const clearUsers = () =>
    dispatch({
      type: CLEAR_USERS,
      payload: []
    })

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        userDetails,
        userRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
