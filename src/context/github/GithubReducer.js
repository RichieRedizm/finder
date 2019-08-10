import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case GET_USER:
    case GET_REPOS:
    case CLEAR_USERS:
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_ALERT:
      return {
        ...state,
        alert: true
      }
    case REMOVE_ALERT:
      return {
        ...state,
        alert: false
      }
    default:
      return state
  }
}
